package Fav_I.IdolBom.Websocket;

import Fav_I.IdolBom.DTO.ChatMessageDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessagePublisher {

    @Autowired
    private RedisTemplate<String, ChatMessageDTO> redisTemplate;
    @Autowired
    private ObjectMapper objectMapper;
    public void publish(String channel, ChatMessageDTO messageDTO) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(messageDTO);
            redisTemplate.convertAndSend(channel, jsonMessage);

        }
        catch (Exception e) {
            throw new RuntimeException("메시지 발행에 실패했습니다." + e.getMessage(), e);
        }
}
}