package Fav_I.IdolBom.DTO;
import java.time.Instant;

import Fav_I.IdolBom.Entity.Schedule;
import Fav_I.IdolBom.Entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecruitDTO {
    private String title;
    private Instant startDate;
    private Instant expiredDate;
    private User creatorID;
    private Integer maxParticipants;
    private String genderPreference;
    private String agePreference;
    private String locationPreference;
    private String additionalNote;
    private Schedule scheduleID;

    public RecruitDTO() {
    }

    public RecruitDTO(String title, Instant startDate, Instant expiredDate, User creatorID, Integer maxParticipants, String genderPreference, String agePreference, String locationPreference) {
        this.title = title;
        this.startDate = startDate;
        this.expiredDate = expiredDate;
        this.creatorID = creatorID;
        this.maxParticipants = maxParticipants;
        this.genderPreference = genderPreference;
        this.agePreference = agePreference;
        this.locationPreference = locationPreference;
    }
}