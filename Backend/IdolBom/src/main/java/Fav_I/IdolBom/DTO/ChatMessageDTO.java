package Fav_I.IdolBom.DTO;

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
}
