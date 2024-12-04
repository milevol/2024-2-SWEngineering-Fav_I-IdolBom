package Fav_I.IdolBom.Controller;

import Fav_I.IdolBom.Entity.User;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class TestController {
    @GetMapping("/test/{roomId}")
    public String test(@PathVariable int roomId, Model model, HttpSession session) {
        User loginUser = (User) session.getAttribute("loginUser");
        model.addAttribute("senderId", loginUser.getId());
        model.addAttribute("roomId", roomId);
        return "test";
    }
}
