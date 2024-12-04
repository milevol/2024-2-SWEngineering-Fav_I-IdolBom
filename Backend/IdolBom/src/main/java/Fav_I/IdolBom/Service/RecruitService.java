package Fav_I.IdolBom.Service;

import Fav_I.IdolBom.Entity.ParticipantList;
import Fav_I.IdolBom.Entity.User;
import Fav_I.IdolBom.Repository.ParticipantListRepository;
import Fav_I.IdolBom.Repository.ScheduleRepository;
import Fav_I.IdolBom.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import Fav_I.IdolBom.DTO.RecruitDTO;
import Fav_I.IdolBom.Repository.RecruitRepository;
import Fav_I.IdolBom.Entity.Recruitment;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecruitService {
    private final RecruitRepository recruitRepository;
    private final ScheduleRepository scheduleRepository;
    private final ParticipantListRepository participantListRepository;
    private final UserRepository userRepository;

    public List<Recruitment> getRecruitList() {
        return recruitRepository.findAll();
    }

    public void createRecruit(RecruitDTO recruitDTO) {
        Recruitment recruit = new Recruitment();
        recruit.setTitle(recruitDTO.getTitle());
        recruit.setStartDate(recruitDTO.getStartDate());
        recruit.setExpiredDate(recruitDTO.getExpiredDate());
        recruit.setMaxParticipants(recruitDTO.getMaxParticipants());
        recruit.setCurrentParticipants(1); // Creator 1명
        recruit.setStatus((byte) 0); // 상태 : 모집 진행중
        recruit.setGenderPreference(recruitDTO.getGenderPreference());
        recruit.setAgePreference(recruitDTO.getAgePreference());
        recruit.setLocationPreference(recruitDTO.getLocationPreference());
        recruit.setAdditionalNote(recruitDTO.getAdditionalNote());
        recruit.setCreatorID(userRepository.findById(recruitDTO.getCreatorID()).get());
        recruit.setScheduleID(scheduleRepository.findById(recruitDTO.getScheduleID()).get());

        Recruitment created = recruitRepository.save(recruit);

        ParticipantList participantList = new ParticipantList();
        participantList.setUserID(userRepository.findById(recruitDTO.getCreatorID()).get());
        participantList.setRecruitmentID(created);
        participantListRepository.save(participantList);
    }

    public void updateRecruit(User loginUser, int recruit_id) throws Exception {
        Recruitment recruit = recruitRepository.findById(recruit_id).get();
        if (recruit.getCurrentParticipants() == recruit.getMaxParticipants()) {
            throw new Exception("max participants");
        }
        recruit.setCurrentParticipants(recruit.getCurrentParticipants() + 1); // 동행 인원 추가
        if (recruit.getCurrentParticipants().equals(recruit.getMaxParticipants())) {
            recruit.setStatus((byte) 1); // 한명 추가해서 풀방됨.
        }
        recruitRepository.save(recruit);

        // ParticipantList에 추가
        ParticipantList to_update = new ParticipantList();
        to_update.setUserID(loginUser);
        to_update.setRecruitmentID(recruit);
        participantListRepository.save(to_update);
    }
}
