package Fav_I.IdolBom.Controller;

import Fav_I.IdolBom.DTO.getTokenDTO;
import Fav_I.IdolBom.DTO.kakaoUserDTO;
import Fav_I.IdolBom.Service.KakaoService;
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
    public ResponseEntity<?> RegisterLogin(@RequestParam("code") String code) throws IOException {
        getTokenDTO accessToken = kakaoService.getAccessTokenFromKakao(code);
        kakaoUserDTO userInfo = kakaoService.getKakaoInfo(accessToken.getAccessToken());
        log.info(userInfo.toString());
        kakaoService.RegisterLogin(userInfo);
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
