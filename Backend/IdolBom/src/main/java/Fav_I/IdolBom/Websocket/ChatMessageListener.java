package Fav_I.IdolBom.Websocket;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;

public class ChatMessageListener implements MessageListener {
    @Override
    public void onMessage(Message message, byte[] pattern) {
        System.out.println("Message received: " + message.toString());
    }
}