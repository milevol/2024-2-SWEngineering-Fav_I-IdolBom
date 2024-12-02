package Fav_I.IdolBom.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Fav_I.IdolBom.DTO.RecruitDTO;
import Fav_I.IdolBom.Repository.RecruitRepository;
import Fav_I.IdolBom.Entity.Recruitment;

@Service
public class RecruitService {
    @Autowired
    private RecruitRepository recruitRepository;

    public void createRecruit(RecruitDTO recruitDTO) {
        Recruitment recruit = new Recruitment();
        recruit.setTitle(recruitDTO.getTitle());
        recruit.setStartDate(recruitDTO.getStartDate());
        recruit.setExpiredDate(recruitDTO.getExpiredDate());
        recruit.setMaxParticipants(recruitDTO.getMaxParticipants());
        //recruit.setCurrentParticipants(recruitDTO.getCurrentParticipants());
        //recruit.setStatus(recruitDTO.getStatus());
        recruit.setGenderPreference(recruitDTO.getGenderPreference());
        recruit.setAgePreference(recruitDTO.getAgePreference());
        recruit.setLocationPreference(recruitDTO.getLocationPreference());
        recruit.setAdditionalNote(recruitDTO.getAdditionalNote());

        // Creator와 ScheduleID를 각각 User와 Schedule 엔티티에서 조회하여 설정 필요
        recruit.setCreatorID(recruitDTO.getCreatorID());
        recruit.setScheduleID(recruitDTO.getScheduleID());

        recruitRepository.save(recruit);

    }

}
