package Fav_I.IdolBom.DTO;

import lombok.Data;

import java.time.Instant;

@Data
public class ReportDTO {
    private Byte reportType; // 신고 유형
    private String reportReason; // 상세 사유
    private Long reporterID; // 신고자 ID
    private Long reportedUserID; // 신고 대상 사용자 ID
    private String image; // 이미지 (선택)
}
