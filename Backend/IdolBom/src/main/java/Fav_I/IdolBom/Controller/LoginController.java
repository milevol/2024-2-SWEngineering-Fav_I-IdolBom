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
    /*@GetMapping("/callback")
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

    }*/

    // api with front (get code)
    //@GetMapping("/login")
    /*
    public ResponseEntity<?> RegisterLogin(@RequestBody String code) throws IOException {

        //
        log.info("Authorization Code Received: {}", code);
        //

        getTokenDTO accessToken = kakaoService.getAccessTokenFromKakao(code); //
        kakaoUserDTO userInfo = kakaoService.getKakaoInfo(accessToken.getAccessToken()); //
        log.info(userInfo.toString());
        kakaoService.register(userInfo);
        session.setAttribute("userInfo", userInfo); //
        session.setMaxInactiveInterval(60 * 60 * 24); //
        return ResponseEntity.ok(userInfo); //
    }*/

    @GetMapping("/callback")
    public ResponseEntity<?> handleCallback(@RequestParam("code") String code) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            log.info("GET Request Received. Authorization Code: {}", code);
            // 카카오 토큰 요청
            getTokenDTO accessToken = kakaoService.getAccessTokenFromKakao(code);

            log.info("kakao accessToken : {}", accessToken);
            // 사용자 정보 요청
            kakaoUserDTO userInfo = kakaoService.getKakaoInfo(accessToken.getAccessToken());
            log.info(userInfo.toString());

            // 사용자 등록
            kakaoService.register(userInfo);
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
