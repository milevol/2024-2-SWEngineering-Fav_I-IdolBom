package Fav_I.IdolBom.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Ticketing {
    @Id
    @Column(name = "ticketingID", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "applicantID", nullable = false)
    private User applicantID;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "scheduleID", nullable = false)
    private Schedule scheduleID;

    @Column(name = "ticketNum")
    private Integer ticketNum;

    @Lob
    @Column(name = "seatingType")
    private String seatingType;

    @Size(max = 100)
    @Column(name = "requestMessage", length = 100)
    private String requestMessage;

    @NotNull
    @Column(name = "ticketingStatus", nullable = false)
    private Byte ticketingStatus;

}