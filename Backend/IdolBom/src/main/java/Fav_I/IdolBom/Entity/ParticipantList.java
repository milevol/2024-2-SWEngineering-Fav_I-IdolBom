package Fav_I.IdolBom.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ParticipantList {
    @EmbeddedId
    private ParticipantListId id;

    @MapsId("userID")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "userID", nullable = false)
    private User userID;

    @MapsId("recruitmentID")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "recruitmentID", nullable = false)
    private Recruitment recruitmentID;

}