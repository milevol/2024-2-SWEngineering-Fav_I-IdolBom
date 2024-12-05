package Fav_I.IdolBom.Controller;

import Fav_I.IdolBom.Entity.*;
import Fav_I.IdolBom.Repository.ChatRoomRepository;
import Fav_I.IdolBom.Repository.MatchingRepository;
import Fav_I.IdolBom.Repository.TicketingRepository;
import Fav_I.IdolBom.Websocket.MessagePublisher;
import Fav_I.IdolBom.DTO.ChatMessageDTO;
import Fav_I.IdolBom.DTO.ChatRoomListGetResponse;
import Fav_I.IdolBom.Repository.UserRepository;
import Fav_I.IdolBom.Service.ChatMessageService;
import Fav_I.IdolBom.Service.ChatRoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private MessagePublisher messagePublisher;
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private ChatMessageService chatMessageService;
    @Autowired
    private ChatRoomService chatRoomService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;
    @Autowired
    private MatchingRepository matchingRepository;
    @Autowired
    private TicketingRepository ticketingRepository;

    @MessageMapping("/connect")
    public void validateChatRoomId(@Payload Map<String, String> payload, SimpMessageHeaderAccessor headerAccessor) {
        String chatRoomId = payload.get("chatRoomId");
        if (chatRoomRepository.findById(Integer.parseInt(chatRoomId)).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat room not found");
        }
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("chatRoomId", chatRoomId);
    }

    @MessageMapping("/send")
    public void sendMessage(ChatMessageDTO message) {
        // 메시지를 DB와 Redis에 저장
        chatMessageService.saveMessage(message);

        // Redis에 메시지 발행
        String channelName = "chatroom:" + message.getChatRoomID();
        messagePublisher.publish(channelName, message);

        // 메시지를 동적으로 전송
        String destination = "/sub/chat/" + message.getChatRoomID();
        messagingTemplate.convertAndSend(destination, message);
    }

    // chatroom 객체 대신 id 받아오게 수정해야 함
    @GetMapping("/history/{roomId}")
    public ResponseEntity<?> getChatHistory(@PathVariable("roomId") Integer roomId) {
        Map<String, Object> response = new LinkedHashMap<>();

        try {
            ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat room not found"));
            List<Message> messageList = chatMessageService.getChatHistory(chatRoom);
            response.put("code", "SU");
            response.put("message", messageList.size() + " messages in " + roomId);

            List<Map<String, Object>> messageInfo = new ArrayList<>();
            for (Message message : messageList) {
                Map<String, Object> messageJson = new LinkedHashMap<>();
                messageJson.put("content", message.getContent());
                messageJson.put("sendDate", message.getSendDate());
                messageJson.put("senderID", message.getSenderID().getUserName());
                messageInfo.add(messageJson);
            }
            response.put("messages", messageInfo);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("code", "Error");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }


    }
/*
    //sendMessage와 로직 중복되어 제거
    @PostMapping("/save")
    public void saveMessage(@RequestBody ChatMessageDTO messageDTO) {
        chatMessageService.saveMessage(messageDTO);
    }
*/
    @PostMapping("/feedback")
    public ResponseEntity<?> submitFeedback(@RequestParam Integer RoomId, @RequestParam int feedback) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            Matching matching = chatRoomRepository.findById(RoomId).get().getMatchingID();
            Ticketing ticketing = ticketingRepository.findById(matching.getId()).get();
            User seller = userRepository.findById(matching.getAgentID().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seller not found"));

            // 결제 완료로 상태 변경
            ticketing.setTicketingStatus(2);
            ticketingRepository.save(ticketing);

            // feedback 값이 1이면 trustScore +1, 0이면 trustScore -1
            seller.setTrustScore((feedback == 1) ? seller.getTrustScore() + 1 : seller.getTrustScore() - 1);
            userRepository.save(seller);  // 업데이트된 trustScore를 저장

            response.put("code", "SU");
            response.put("message", "submit feedback, update status Succeed.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("code", "Error");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }

    @PostMapping("/updateApplicantChatRoomList")
    public void updateApplicantChatRoomList(@RequestParam Long userId, @RequestBody List<ChatRoomListGetResponse> applicantList) {
        chatRoomService.updateApplicantChatRoomList(userId, applicantList);
    }

    @PostMapping("/updateAgentChatRoomList")
    public void updateAgentChatRoomList(@RequestParam Long agentId, @RequestBody List<ChatRoomListGetResponse> agentList) {
        chatRoomService.updateAgentChatRoomList(agentId, agentList);
    }

//    @PostMapping("/createTemporaryChatRoom")
//    public ChatRoom createTemporaryChatRoom(@RequestParam Long userId, @RequestParam Long agentId) {
//        return chatRoomService.createTemporaryChatRoom(userId, agentId);
//    }
}

