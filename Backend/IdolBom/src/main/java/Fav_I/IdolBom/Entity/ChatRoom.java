package Fav_I.IdolBom.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatRoomID", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "title")
    private String title;

    @Size(max = 255)
    @Column(name = "chatRoomImage")
    private String chatRoomImage;

    @NotNull
    @CreationTimestamp
    @Column(name = "createdDate", nullable = false)
    private Instant createdDate;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "recruitmentID", nullable = false)
    private Recruitment recruitmentID;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "matchingID", nullable = false)
    private Matching matchingID;
}