package Fav_I.IdolBom.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Recruitment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recruitmentID", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "startDate", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Column(name = "expiredDate", nullable = false)
    private LocalDate expiredDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "creatorID")
    private User creatorID;

    @NotNull
    @Column(name = "maxParticipants", nullable = false)
    private Integer maxParticipants;

    @NotNull
    @Column(name = "currentParticipants", nullable = false)
    private Integer currentParticipants;

    @NotNull
    @Column(name = "status", nullable = false)
    private Byte status;

    @NotNull
    @Lob
    @Column(name = "genderPreference", nullable = false)
    private String genderPreference;

    @NotNull
    @Lob
    @Column(name = "agePreference", nullable = false)
    private String agePreference;

    @Size(max = 20)
    @NotNull
    @Column(name = "locationPreference", nullable = false, length = 20)
    private String locationPreference;

    @Size(max = 255)
    @Column(name = "additionalNote")
    private String additionalNote;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "scheduleID", nullable = false)
    private Schedule scheduleID;

}