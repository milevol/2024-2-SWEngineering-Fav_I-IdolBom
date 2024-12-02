package Fav_I.IdolBom.Service;

import Fav_I.IdolBom.DTO.ReportDTO;
import Fav_I.IdolBom.Entity.Report;
import Fav_I.IdolBom.Entity.User;
import Fav_I.IdolBom.Repository.ReportRepository;
import Fav_I.IdolBom.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    public ReportService(ReportRepository reportRepository, UserRepository userRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Report createReport(ReportDTO reportRequestDTO) {
        // 신고자 정보 조회
        User reporter = userRepository.findById(reportRequestDTO.getReporterID())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Reporter ID: " + reportRequestDTO.getReporterID()));

        // 신고 대상 사용자 조회
        User reportedUser = userRepository.findById(reportRequestDTO.getReportedUserID())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Reported User ID: " + reportRequestDTO.getReportedUserID()));

        // Report 객체 생성 및 데이터 설정
        Report report = new Report();
        report.setReportType(reportRequestDTO.getReportType());
        report.setReportReason(reportRequestDTO.getReportReason());
        report.setReporterID(reporter);
        report.setReportedUserID(reportedUser);
        report.setReportDate(Instant.now());
        report.setReportStatus((byte) 0); // 기본 상태 (0: 처리 대기)
        report.setImage(reportRequestDTO.getImage());

        // 데이터베이스에 저장
        return reportRepository.save(report);
    }
}
