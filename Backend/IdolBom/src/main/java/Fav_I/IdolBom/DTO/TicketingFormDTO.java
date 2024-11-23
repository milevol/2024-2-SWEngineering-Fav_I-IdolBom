package Fav_I.IdolBom.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class TicketingFormDTO {
    private Integer ticketNum;
    private String seatingType;
    private String requestMessage;
}
