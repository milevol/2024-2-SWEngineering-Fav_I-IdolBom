package Fav_I.IdolBom.Service;

import Fav_I.IdolBom.DTO.TicketingFormDTO;
import Fav_I.IdolBom.Entity.Ticketing;
import Fav_I.IdolBom.Entity.User;
import Fav_I.IdolBom.Repository.TicketingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class TicketingService {
    private final TicketingRepository ticketingRepository;

    public List<Ticketing> getTicketingList() {
        return ticketingRepository.findAll();
    }

    public void submitTicketing(User currentUser, int schedule_id, TicketingFormDTO formDTO) {
        ticketingRepository.submit(currentUser.getId(), schedule_id, formDTO.getTicketNum(), formDTO.getSeatingType(), formDTO.getRequestMessage());
    }
}
