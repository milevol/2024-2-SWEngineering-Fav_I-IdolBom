package Fav_I.IdolBom.Service;

import Fav_I.IdolBom.DTO.getTokenDTO;
import Fav_I.IdolBom.DTO.kakaoUserDTO;
import Fav_I.IdolBom.Entity.User;
import Fav_I.IdolBom.Repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    @Value("${kakao.client_id}")
    private String clientId;

    @Value("${kakao.redirect_uri}")
    private String redirectUri;

    // Access Token 요청 메서드
/*    public getTokenDTO getAccessTokenFromKakao(String code) throws JsonProcessingException {
        String reqUrl = "https://kauth.kakao.com/oauth/token";
        RestTemplate rt = new RestTemplate();

        // HttpHeaders 객체
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");


        // HttpBody 객체
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        // HttpEntity 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // 디버깅 로그 추가 (수정됨)
        log.info("Kakao Token Request URL: {}", reqUrl);
        log.info("Headers: {}", headers);
        log.info("Body: {}", params);

        try {
            // POST 방식으로 요청 보내기
            ResponseEntity<String> response = rt.exchange(reqUrl, HttpMethod.POST, kakaoTokenRequest, String.class);

            // 응답 디버깅 로그 추가 (수정됨)
            log.info("Kakao Token Response Status: {}", response.getStatusCode());
            log.info("Kakao Token Response Body: {}", response.getBody());

            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(responseBody, getTokenDTO.class);

        } catch (HttpClientErrorException e) {
            // 예외 로그 추가 (수정됨)
            log.error("HttpClientErrorException occurred: {}", e.getMessage());
            log.error("Response Body: {}", e.getResponseBodyAsString());
            throw new RuntimeException("Kakao API 요청 실패: " + e.getMessage());
        }
    }*/
    // 원본
    public getTokenDTO getAccessTokenFromKakao(String code) throws JsonProcessingException {
        String reqUrl = "https://kauth.kakao.com/oauth/token";
        RestTemplate rt = new RestTemplate();

        // HttpHeaders 객체
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 객체
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        // 추가: 로그 확인용
        log.info("Kakao Token Request URL: {}", reqUrl);
        log.info("Headers: {}", headers);
        log.info("Body: {}", params);

        // HttpEntity 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // POST 방식으로 요청 보내기
        ResponseEntity<String> response = rt.exchange(reqUrl, HttpMethod.POST, kakaoTokenRequest, String.class);

        // 추가:  디버깅 로그 : 카카오
        log.info("Kakao Token Request URL: {}", reqUrl);
        log.info("Headers: {}", headers);
        log.info("Body: {}", params);

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        getTokenDTO authResponse = objectMapper.readValue(responseBody, getTokenDTO.class);

        log.info("** Get Kakao Token Succeed.");

        return authResponse;
    }

    public kakaoUserDTO getKakaoInfo(String accessToken) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();

        // request 확인용
        log.info("Requesting Kakao User Info with Access Token: {}", accessToken);
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                kakaoUserInfoRequest,
                String.class
        );

        // responseBody에 있는 정보 꺼내기
        String responseBody = response.getBody();
        log.info("response body ----" + responseBody);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        Long id = jsonNode.get("id").asLong();
        String profile_image = jsonNode.get("properties")
                .get("profile_image").asText();
        String nickname = jsonNode.get("properties")
                .get("nickname").asText();

        log.info("** Get Kakao User Info Succeed.");
        return kakaoUserDTO.builder()
                .id(id)
                .profile_image(profile_image)
                .nickname(nickname)
                .build();
    }

    public Optional<User> register(kakaoUserDTO kakaoUserDTO) {
        Long id = kakaoUserDTO.getId();
        Optional<User> userInfo = userRepository.findById(id);

        // Register
        log.info(userInfo.toString());
        if (userInfo.isEmpty()) {
            User newUser = new User();
            newUser.setId(id);
            newUser.setUserName(kakaoUserDTO.getNickname());
            newUser.setProfileImage(kakaoUserDTO.getProfile_image());
            userRepository.save(newUser);
        }
        return userInfo;
    }

    public void setIdol(User user, int idol_id) {
        userRepository.setIdol(user.getId(), idol_id);
    }
}
