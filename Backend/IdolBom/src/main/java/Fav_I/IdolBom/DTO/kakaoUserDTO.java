package Fav_I.IdolBom.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.HashMap;

@Data
@Builder
@ToString
public class kakaoUserDTO {
    public Long id; // 고유 id
    public String nickname; // 카카오톡 상의 이름
    public String profile_image; // 카카오톡 프로필 사진
}
