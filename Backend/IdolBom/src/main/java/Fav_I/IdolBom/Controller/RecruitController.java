package Fav_I.IdolBom.Controller;


import Fav_I.IdolBom.DTO.RecruitDTO;
import Fav_I.IdolBom.Service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recruit")
public class RecruitController {
    @Autowired
    private RecruitService recruitService;

    @PostMapping
    public ResponseEntity<?> createRecruit(@RequestBody RecruitDTO recruitDTO) {
        try {
            recruitService.createRecruit(recruitDTO);
            return ResponseEntity.ok("Recruit created");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Invalid request");
        }
    }

}
