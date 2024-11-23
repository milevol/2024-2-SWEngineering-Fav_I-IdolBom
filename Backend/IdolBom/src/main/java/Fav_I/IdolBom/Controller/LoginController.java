package Fav_I.IdolBom.Controller;

import Fav_I.IdolBom.DTO.getTokenDTO;
import Fav_I.IdolBom.DTO.kakaoUserDTO;
import Fav_I.IdolBom.Entity.User;
import Fav_I.IdolBom.Service.LoginService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;


@RestController
@Slf4j
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;
    @Autowired
    private HttpSession session;

    @GetMapping("/callback")
    public ResponseEntity<?> handleCallback(@RequestParam("code") String code) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            log.info("GET Request Received. Authorization Code: {}", code);
            // 카카오 토큰 요청
            getTokenDTO accessToken = loginService.getAccessTokenFromKakao(code);

            log.info("kakao accessToken : {}", accessToken);
            // 사용자 정보 요청
            kakaoUserDTO userInfo = loginService.getKakaoInfo(accessToken.getAccessToken());
            log.info(userInfo.toString());

            // 사용자 등록
            loginService.register(userInfo);
            session.setAttribute("userInfo", userInfo);
            session.setMaxInactiveInterval(60 * 60 * 24); // 24시간


            // 응답 데이터 구성
            response.put("code", "SU");
            response.put("message", "Success");
            response.put("userInfo", userInfo);
            response.put("authCode", code);

            log.info("Response Data: {}", response);
            return ResponseEntity.status(HttpStatus.OK).body(response); // 메타데이터 포함
        } catch (Exception e) {
            log.error("Error during callback processing", e);
            response.put("code", "Error");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @GetMapping("/idol/{idol_id}")
    public ResponseEntity<?> setIdol(@PathVariable("idol_id") int idol_id) {
        Map<String, Object> response = new LinkedHashMap<>();
        Object currentUser = session.getAttribute("userInfo");

        try {
            loginService.setIdol((User)currentUser, idol_id);
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
