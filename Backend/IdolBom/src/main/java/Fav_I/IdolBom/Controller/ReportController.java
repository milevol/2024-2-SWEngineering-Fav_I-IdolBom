package Fav_I.IdolBom.Controller;

import Fav_I.IdolBom.DTO.ReportDTO;
import Fav_I.IdolBom.Entity.Report;
import Fav_I.IdolBom.Service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody ReportDTO reportRequestDTO) {
        Report createdReport = reportService.createReport(reportRequestDTO);
        return ResponseEntity.ok(createdReport);
    }
}
