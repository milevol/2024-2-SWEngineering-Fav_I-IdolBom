package Fav_I.IdolBom.DTO;

import Fav_I.IdolBom.Entity.ChatRoom;
import Fav_I.IdolBom.Entity.User;
import Fav_I.IdolBom.Entity.Message;
import lombok.*;

import java.sql.Timestamp;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDTO {
    private String content;
    private Integer chatRoomID;
    private Long senderID;
    private Timestamp sendDate;

// chatMessageDTO와 Message간의 변환을 위한 메소드 -> redis에서 데이터 읽고 변환
    public static ChatMessageDTO fromEntity(Message message) {
        return ChatMessageDTO.builder()
                .content(message.getContent())
                .chatRoomID(message.getChatRoomID().getId())
                .senderID(message.getSenderID().getId())
                .sendDate(Timestamp.from(message.getSendDate()))
                .build();
    }

    public Message toEntity(ChatRoom chatRoom, User sender) {
        Message message = new Message();
        message.setContent(this.content);
        message.setChatRoomID(chatRoom);
        message.setSenderID(sender);
        message.setSendDate(this.sendDate.toInstant()); // Instant.now()로 현재 시간을 넣어도 됨
        // 필요한 다른 필드 설정
        return message;
    }
}
