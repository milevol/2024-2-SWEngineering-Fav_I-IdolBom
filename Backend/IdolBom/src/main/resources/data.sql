-- 실행될 때 마다 초기 데이터 삽입 SQL
INSERT INTO Idol VALUES (1, '임영웅'), (2, '이찬원'), (3, '장민호');



-- Schedule 데이터 삽입
INSERT INTO Schedule (scheduleID, idolID, scheduleName, scheduleDate, originUrl, description, location, isTicketing) VALUES
                                                                                                                         (1, 1, '아티스트 임영웅 리사이틀(RE:CITAL) 티켓 오픈', '2024-11-20 20:00:00', 'https://ticket.interpark.com/webzine/paper/TPNoticeView.asp?bbsno=34&no=53378', '콘서트', '고척스카이돔', 1),
                                                                                                                         (2, 1, '임영웅 유튜브 브이로그 게시', '2024-11-20 21:00:00', 'https://www.youtube.com/watch?v=183Tzz1htyI', '브이로그', null, 0),
                                                                                                                         (3, 1, '아티스트 임영웅 리사이틀(RE:CITAL) 공연', '2024-12-27 19:30:00', 'https://ticket.interpark.com/webzine/paper/TPNoticeView.asp?bbsno=34&no=53378', '콘서트', '고척스카이돔', 1),
                                                                                                                         (4, 1, '아티스트 임영웅 리사이틀(RE:CITAL) 공연', '2024-12-28 17:00:00', 'https://ticket.interpark.com/webzine/paper/TPNoticeView.asp?bbsno=34&no=53378', '콘서트', '고척스카이돔', 1),
                                                                                                                         (5, 1, '임영웅 |아임 히어로 더 스타디움 Special Thanks Video 연애편지 공개!', '2024-11-04 08:00:00', 'https://x.com/limyoungwoong/status/1853210865207759202', '영화', null, 0);