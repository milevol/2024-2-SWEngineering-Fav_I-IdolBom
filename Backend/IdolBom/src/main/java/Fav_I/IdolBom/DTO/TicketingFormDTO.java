package Fav_I.IdolBom.DTO;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class TicketingFormDTO {
    private Integer ticketNum;
    private String seatingType;
    private String requestMessage;
}
