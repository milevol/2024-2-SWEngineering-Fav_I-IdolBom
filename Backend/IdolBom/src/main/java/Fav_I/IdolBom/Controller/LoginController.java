package Fav_I.IdolBom.Controller;

import Fav_I.IdolBom.DTO.getTokenDTO;
import Fav_I.IdolBom.DTO.kakaoUserDTO;
import Fav_I.IdolBom.Entity.User;
import Fav_I.IdolBom.Service.KakaoService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;


@RestController
@Slf4j
@RequiredArgsConstructor
public class LoginController {
    private final KakaoService kakaoService;
    @Autowired
    private HttpSession session;

    // get kakaoCode without Frontend
    @GetMapping("/callback")
    public ResponseEntity<?> RegisterLogin(@RequestParam("code") String code) throws IOException {
        Map<String, Object> response = new LinkedHashMap<>();
        User loginUser = new User();

        try {
            getTokenDTO accessToken = kakaoService.getAccessTokenFromKakao(code);
            kakaoUserDTO userInfo = kakaoService.getKakaoInfo(accessToken.getAccessToken());
            log.info(userInfo.toString());
            kakaoService.register(userInfo);

            loginUser.setId(userInfo.getId());
            loginUser.setUserName(userInfo.getNickname());
            loginUser.setProfileImage(userInfo.getProfile_image());

            session.setAttribute("userInfo", loginUser);
            session.setMaxInactiveInterval(60 * 60 * 24);
            log.info(session.toString());

            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("loginUser", loginUser);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("code", "Error");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }

//    // api with front (get code)
//    @GetMapping("/login")
//    public ResponseEntity<?> RegisterLogin(@RequestBody String code) throws IOException {
//        getTokenDTO accessToken = kakaoService.getAccessTokenFromKakao(code);
//        kakaoUserDTO userInfo = kakaoService.getKakaoInfo(accessToken.getAccessToken());
//        log.info(userInfo.toString());
//        kakaoService.register(userInfo);
//        session.setAttribute("userInfo", userInfo);
//        session.setMaxInactiveInterval(60 * 60 * 24);
//        return ResponseEntity.ok(userInfo);
//    }

    @GetMapping("/{idol_id}")
    public ResponseEntity<?> setIdol(@PathVariable("idol_id") int idol_id) {
        Map<String, Object> response = new LinkedHashMap<>();
        Object currentUser = session.getAttribute("userInfo");

        try {
            kakaoService.setIdol((User)currentUser, idol_id);
            response.put("code", "SU");
            response.put("message", "idol set successfully.");
            response.put("loginUser", ((User) currentUser).getId());
            response.put("userName", ((User) currentUser).getUserName());
            response.put("idol_id", idol_id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("code", "Error");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }

}
