package Fav_I.IdolBom.Service;

import Fav_I.IdolBom.Entity.Ticketing;
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
}
