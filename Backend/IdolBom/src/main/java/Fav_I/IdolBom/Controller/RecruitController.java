package Fav_I.IdolBom.Controller;


import Fav_I.IdolBom.DTO.RecruitDTO;
import Fav_I.IdolBom.Entity.Recruitment;
import Fav_I.IdolBom.Entity.User;
import Fav_I.IdolBom.Service.RecruitService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recruit")
public class RecruitController {
    @Autowired
    private RecruitService recruitService;

    @GetMapping
    public ResponseEntity<?> getRecruitList() {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            List<Recruitment> recruitList = recruitService.getRecruitList();
            response.put("code", "SU");
            response.put("message", recruitList.size() + " recruitments found.");
            response.put("recruitList", recruitList);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    // 스케줄 ID는 프론트에서 DTO로 받아오기, Creator는 세션에서 로그인 유저 가져와서 넣으면 됨.
    @PostMapping("/create")
    public ResponseEntity<?> createRecruit(@RequestBody RecruitDTO recruitDTO) {
        Map<String, Object> response = new LinkedHashMap<>();

        try {
            recruitService.createRecruit(recruitDTO);
            response.put("code", "SU");
            response.put("message", "Recruits created successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            response.put("code", "Error");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{recruit_id}")
    public ResponseEntity<?> updateRecruit(@PathVariable Integer recruit_id, HttpSession session) {
        try {
            User loginUser = (User) session.getAttribute("loginUser");
            recruitService.updateRecruit(loginUser, recruit_id);
            return ResponseEntity.ok("Recruit updated");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

}
