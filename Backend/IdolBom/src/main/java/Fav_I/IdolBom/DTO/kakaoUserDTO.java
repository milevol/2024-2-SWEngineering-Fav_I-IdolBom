package Fav_I.IdolBom.DTO;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Data
@Builder
@ToString
public class KakaoUserDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    public Long id; // 고유 id
    public String nickname; // 카카오톡 상의 이름
    public String profile_image; // 카카오톡 프로필 사진
}
