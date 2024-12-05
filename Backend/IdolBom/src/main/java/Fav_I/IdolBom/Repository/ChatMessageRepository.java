package Fav_I.IdolBom.Repository;
import Fav_I.IdolBom.Entity.ChatRoom;
import Fav_I.IdolBom.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<Message, Long> {
    //List<Message> findByRoomId(Long roomId);
    List<Message> findAllByChatRoomID(ChatRoom chatRoomID);
}