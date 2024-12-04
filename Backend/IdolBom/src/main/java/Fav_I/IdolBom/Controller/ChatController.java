package Fav_I.IdolBom.Controller;

import Fav_I.IdolBom.Entity.Ticketing;
import Fav_I.IdolBom.Repository.ChatRoomRepository;
import Fav_I.IdolBom.Websocket.MessagePublisher;
import Fav_I.IdolBom.DTO.ChatMessageDTO;
import Fav_I.IdolBom.DTO.ChatRoomListGetResponse;
import Fav_I.IdolBom.Entity.ChatRoom;
import Fav_I.IdolBom.Entity.Message;
import Fav_I.IdolBom.Entity.User;
import Fav_I.IdolBom.Repository.UserRepository;
import Fav_I.IdolBom.Service.ChatMessageService;
import Fav_I.IdolBom.Service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private MessagePublisher messagePublisher;

    @Autowired
    private ChatMessageService chatMessageService;
    @Autowired
    private ChatRoomService chatRoomService;
    //추가
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @MessageMapping("/send") // 클라이언트에서 /pub/send로 메시지를 보내면
    //@SendTo("/sub/chat/{chatRoomID}")  // /sub/chat로 메시지를 보낸다
    public void sendMessage(ChatMessageDTO message) {
        //메시지를 레디스와 db에 저장
        chatMessageService.saveMessage(message);

        // redis pub/sub으로 메시지 발행
        String channelName = "chatroom:" + message.getChatRoomID();
        messagePublisher.publish(channelName, message.getContent());
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
    public ResponseEntity<String> submitFeedback(@RequestParam Long sellerId, @RequestParam int feedback) {
        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seller not found"));

        // feedback 값이 1이면 trustScore +1, 0이면 trustScore -1
        if (feedback == 1) {
            seller.setTrustScore(seller.getTrustScore() + 1);
        } else if (feedback == 0) {
            seller.setTrustScore(seller.getTrustScore() - 1);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid feedback value");
        }

        userRepository.save(seller);  // 업데이트된 trustScore를 저장
        return ResponseEntity.ok("Feedback submitted successfully");
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

