package Fav_I.IdolBom.Service;

import Fav_I.IdolBom.Entity.ParticipantList;
import Fav_I.IdolBom.Entity.ParticipantListId;
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

import java.time.LocalDate;
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
        Recruitment recruit = Recruitment.builder()
                .title(recruitDTO.getTitle())
                .startDate(recruitDTO.getStartDate())
                .expiredDate(recruitDTO.getExpiredDate())
                .maxParticipants(recruitDTO.getMaxParticipants())
                .currentParticipants(1)
                .status((byte) 0)
                .genderPreference(recruitDTO.getGenderPreference())
                .agePreference(recruitDTO.getAgePreference())
                .locationPreference(recruitDTO.getLocationPreference())
                .additionalNote(recruitDTO.getAdditionalNote())
                .creatorID(userRepository.findById(recruitDTO.getCreatorID()).get())
                .scheduleID(scheduleRepository.findById(recruitDTO.getScheduleID()).get())
                .build();

        Recruitment created = recruitRepository.save(recruit);

        ParticipantListId participantListId = ParticipantListId.builder()
                .userID(recruitDTO.getCreatorID())
                .recruitmentID(created.getId())
                .build();

        ParticipantList participantList = ParticipantList.builder()
                .id(participantListId)
                .userID(created.getCreatorID())
                .recruitmentID(created)
                .build();

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
