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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Objects;


@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private MessagePublisher messagePublisher;

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

    @MessageMapping("/send") // 클라이언트에서 /pub/send로 메시지를 보내면
    //@SendTo("/sub/chat/{chatRoomID}")  // /sub/chat로 메시지를 보낸다
    public void sendMessage(ChatMessageDTO message) {
        //메시지를 레디스와 db에 저장
        chatMessageService.saveMessage(message);

        // redis pub/sub으로 메시지 발행
        String channelName = "chatroom:" + message.getChatRoomID();
        messagePublisher.publish(channelName, message);
        //return message;
    }
// chatroom 객체 대신 id 받아오게 수정해야 함
    @GetMapping("/history/{roomId}")
    public List<Message> getChatHistory(@PathVariable("roomId") Integer roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat room not found"));
        //.get();
        return chatMessageService.getChatHistory(chatRoom);
    }
/*
    //sendMessage와 로직 중복되어 제거
    @PostMapping("/save")
    public void saveMessage(@RequestBody ChatMessageDTO messageDTO) {
        chatMessageService.saveMessage(messageDTO);
    }
*/
    @PostMapping("/feedback")
    public ResponseEntity<String> submitFeedback(@RequestParam Integer RoomId, @RequestParam int feedback) {
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

        return ResponseEntity.ok("Feedback submitted successfully. TicketingStatus Changed.");
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

