package Fav_I.IdolBom.Service;

import Fav_I.IdolBom.DTO.ChatMessageDTO;
import Fav_I.IdolBom.Entity.ChatRoom;
import Fav_I.IdolBom.Entity.Message;
import Fav_I.IdolBom.Entity.User;
import Fav_I.IdolBom.Repository.ChatMessageRepository;
import Fav_I.IdolBom.Repository.ChatRoomRepository;
import Fav_I.IdolBom.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

// 메시지 송수신, 저장
@Service
@Slf4j
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    private final RedisTemplate<String, ChatMessageDTO> redisTemplate;
    private static final String CHATMESSAGE_KEY = "chatroom";

    //1. 메시지 저장 로직
    public void saveMessage(ChatMessageDTO messageDTO) {
        try {
            // redis 에 메시지 저장 (실시간 접근용)
            redisTemplate.opsForList().rightPush(CHATMESSAGE_KEY + ":" + messageDTO.getChatRoomID(), messageDTO);

            ChatRoom chatRoom = chatRoomRepository.findById(messageDTO.getChatRoomID())
                    .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

            User sender = userRepository.findById(messageDTO.getSenderID())
                    .orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다."));

            Message message = messageDTO.toEntity(chatRoom, sender);
            chatMessageRepository.save(message);
        } catch (Exception e) {
            throw new RuntimeException("메시지 저장에 실패했습니다." + e.getMessage(), e);    }
    }

    //2. 채팅방 내 메시지 조회
    public List<Message> getChatHistory(/*Long roomId*/ChatRoom chatRoomID) {
        //redis에 데이터없는 경우만 mysql 조회하고, 조회된 데이터 redis에 캐싱
        String redisKey = CHATMESSAGE_KEY + ":" + chatRoomID.getId();
        List<ChatMessageDTO> cachedMessages = redisTemplate.opsForList().range(redisKey, 0, -1);

        if(cachedMessages == null|| cachedMessages.isEmpty()) {
            List<Message> messages = chatMessageRepository.findAllByChatRoomID(chatRoomID);
            for(Message message : messages) {
                redisTemplate.opsForList().rightPush(redisKey, ChatMessageDTO.fromEntity(message));
            }
            return messages;
        }
        //return chatMessageRepository.findByChatRoomID(chatRoomID);
        // redis에서 조회한 메시지를 DTO에서 엔티티로 변환
        return cachedMessages.stream().map(dto -> dto.toEntity(chatRoomID, userRepository.findById(dto.getSenderID()).orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다.")))).collect(Collectors.toList());    }
}
