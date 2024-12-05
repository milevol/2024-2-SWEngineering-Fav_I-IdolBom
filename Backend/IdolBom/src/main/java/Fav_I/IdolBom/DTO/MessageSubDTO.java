package Fav_I.IdolBom.DTO;


import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
@Builder
public class MessageSubDTO {
    private Long applicantID;
    private Long agentID;
    private ChatMessageDTO chatMessageDTO;
    private List<ChatRoomListGetResponse> applicantList = new ArrayList<>(); // 빈 리스트로 초기화
    private List<ChatRoomListGetResponse> agentList = new ArrayList<>(); // 빈 리스트로 초기화
}
