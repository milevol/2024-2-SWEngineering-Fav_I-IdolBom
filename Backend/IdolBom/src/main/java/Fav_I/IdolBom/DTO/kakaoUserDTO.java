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
    public Long id;
    public String nickname;
    public String profile_image;
}
