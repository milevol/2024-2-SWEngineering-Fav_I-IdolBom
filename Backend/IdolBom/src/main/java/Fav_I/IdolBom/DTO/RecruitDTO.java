package Fav_I.IdolBom.DTO;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecruitDTO {
    private String title;
    private LocalDate startDate;
    private LocalDate expiredDate;
    private Long creatorID;
    private Integer maxParticipants;
    private String genderPreference;
    private String agePreference;
    private String locationPreference;
    private String additionalNote;
    private Integer scheduleID;
}