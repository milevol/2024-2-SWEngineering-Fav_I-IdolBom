package Fav_I.IdolBom.Config;

import Fav_I.IdolBom.DTO.ChatMessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import Fav_I.IdolBom.Websocket.RedisSubscriber;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@RequiredArgsConstructor
@Configuration
public class RedisConfig {

    // MySQL 관련 설정은 따로 추가하여 MySQL과 연결하는 설정을 분리할 수 있습니다.

    // 채팅방을 위한 채널 설정 (Redis용)
    @Bean

    // 채팅방을 위한 채널 설정
    // 파라미터가 있으면 해당 파라미터를 이용하여 채널을 생성, 없으면 기본 채널 생성

    public ChannelTopic channelTopic() {
        return new ChannelTopic("chatroom:");
    }

    // 메시지 교환 방식을 지정하는 RedisTemplate 설정 (Redis용)
    @Bean
    public RedisTemplate<String, ChatMessageDTO> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, ChatMessageDTO> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        // key는 문자열로 처리
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        // value는 ChatMessageDTO로 처리
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(ChatMessageDTO.class));
        return redisTemplate;
    }

    // Redis에 publish된 메시지를 처리하는 리스너 설정 (채팅방 메시지 수신)
    @Bean
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

    // 채팅 메시지 처리 리스너
    @Bean
    public MessageListenerAdapter listenerAdapterOnMessage(RedisSubscriber subscriber) {
        return new MessageListenerAdapter(subscriber, "onMessage");
    }
    // 채팅방 리스트를 처리하는 리스너
    @Bean
    public MessageListenerAdapter listenerAdapterChatRoomList(RedisSubscriber subscriber) {
        return new MessageListenerAdapter(subscriber, "sendRoomList");
    }

    // 채팅방에 대한 추가적인 채널을 설정하는 메서드 (동적으로 채널 추가 가능)
    public void addChannel(RedisMessageListenerContainer redisMessageListenerContainer, RedisSubscriber subscriber, String chatRoomId) {
        redisMessageListenerContainer.addMessageListener(listenerAdapterOnMessage(subscriber), new ChannelTopic("chatroom:"+chatRoomId));
    }

    // Redis Connection 설정
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory("localhost", 6379); // Redis 호스트와 포트 설정
    }

    @Bean
    public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
        return new GenericJackson2JsonRedisSerializer();
    }

}
