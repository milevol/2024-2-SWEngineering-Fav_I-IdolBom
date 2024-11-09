package Fav_I.IdolBom.Controller;

import Fav_I.IdolBom.DTO.getTokenDTO;
import Fav_I.IdolBom.DTO.kakaoUserDTO;
import Fav_I.IdolBom.Service.KakaoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
@Slf4j
@RequiredArgsConstructor
public class LoginController {
    private final KakaoService kakaoService;

    // get kakaoCode without Frontend
    @GetMapping("/callback")
    public ResponseEntity<?> RegisterLogin(@RequestParam("code") String code, HttpServletRequest request) throws IOException {
        getTokenDTO accessToken = kakaoService.getAccessTokenFromKakao(code);
        kakaoUserDTO userInfo = kakaoService.getKakaoInfo(accessToken.getAccessToken());
        log.info(userInfo.toString());
        kakaoService.register(userInfo);

        HttpSession session = request.getSession();
        session.setAttribute("userInfo:", userInfo);
        session.setMaxInactiveInterval(60 * 60 * 24);

        return ResponseEntity.ok(userInfo);
    }

//    // api with front (get code)
//    @GetMapping("/login")
//    public ResponseEntity<?> RegisterLogin(@RequestBody String code) throws IOException {
//        getTokenDTO accessToken = kakaoService.getAccessTokenFromKakao(code);
//        kakaoUserDTO userInfo = kakaoService.getKakaoInfo(accessToken.getAccessToken());
//        log.info(userInfo.toString());
//        kakaoService.RegisterLogin(userInfo);
//        return ResponseEntity.ok(userInfo);
//    }
}
