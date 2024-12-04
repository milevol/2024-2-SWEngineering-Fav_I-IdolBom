package Fav_I.IdolBom.Config;

import Fav_I.IdolBom.DTO.ChatMessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import Fav_I.IdolBom.Websocket.RedisSubscriber;

@RequiredArgsConstructor
@Configuration
public class RedisConfig {
    @Bean
    // 채팅방을 위한 채널 설정
    // 파라미터가 있으면 해당 파라미터를 이용하여 채널을 생성, 없으면 기본 채널 생성
    public ChannelTopic channelTopic() {
        return new ChannelTopic("chatroom:");
    }

    @Bean
    // 메시지 교환 방식을 지정하는 RedisTemplate 설정
    public RedisTemplate<String, ChatMessageDTO> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, ChatMessageDTO> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        // key는 문자열로 처리
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        // value는 ChatMessageDTO로 처리
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(ChatMessageDTO.class));
        return redisTemplate;
    }

    @Bean
    // redis에 publish된 메시지를 처리하는 리스너 설정 - channel topic "chatroom"을 구독하는 컨테이너
    public RedisMessageListenerContainer redisMessageListenerContainer(
            RedisConnectionFactory redisConnectionFactory,
            MessageListenerAdapter listenerAdapterOnMessage,
            MessageListenerAdapter listenerAdapterChatRoomList
    ) {

        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(redisConnectionFactory);
        container.addMessageListener(listenerAdapterOnMessage, new ChannelTopic("chatroom"));
        container.addMessageListener(listenerAdapterChatRoomList, new ChannelTopic("chatroom"));
        return container;
    }
    
    @Bean
    public MessageListenerAdapter listenerAdapterOnMessage(RedisSubscriber subscriber) {
        return new MessageListenerAdapter(subscriber, "onMessage");
    }

    @Bean
    public MessageListenerAdapter listenerAdapterChatRoomList(RedisSubscriber subscriber) {
        return new MessageListenerAdapter(subscriber, "sendRoomList");
    }
    // 동적으로 채팅방 생성 - Redis 구독 채널 추가
    public void addChannel(RedisMessageListenerContainer redisMessageListenerContainer, RedisSubscriber subscriber, String chatRoomId) {
        redisMessageListenerContainer.addMessageListener(listenerAdapterOnMessage(subscriber), new ChannelTopic("chatroom:"+chatRoomId));
    }
}