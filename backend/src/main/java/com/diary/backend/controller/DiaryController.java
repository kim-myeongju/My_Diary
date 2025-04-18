package com.diary.backend.controller;
import com.diary.backend.model.Diary;
import com.diary.backend.repository.DiaryMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("diary")
public class DiaryController {

    @Autowired
    DiaryMapper diaryMapper;

    // 일기 추가
    @PostMapping
    public ResponseEntity<Diary> save(@RequestBody Diary diary) {

        // createdDate가 null이면 현재 날짜로 설정
//        if (diary.getCreatedDate() == null) {
//            diary.setCreatedDate(LocalDateTime.now());
//        }

        if(diary == null) {
            return ResponseEntity.status(400).body(null);
        }

        // 화면에서는 날짜만 입력받기 때문에 순서 정렬을 생각해서 시간은 저장시간으로 설정해줌.
        if (diary.getCreatedDate().toLocalTime().equals(LocalTime.MIDNIGHT)) {
            LocalDate dateOnly = diary.getCreatedDate().toLocalDate();
            LocalTime nowTime = LocalTime.now();
            diary.setCreatedDate(LocalDateTime.of(dateOnly, nowTime));
        }

        diaryMapper.saveDiary(diary);
        Diary createdDiary = diaryMapper.findDiaryById(diary.getId());

        return ResponseEntity.ok(createdDiary);
    }

    // 일기 최신순으로 정렬
    @GetMapping
    public ResponseEntity<List<Diary>> getDiaryListLatest() {
        List<Diary> allDiary = diaryMapper.findAllDiaryDesc();
        return ResponseEntity.ok(allDiary);
    }

    // id에 해당하는 일기 상세 조회
//    @GetMapping("{id}")
//    public ResponseEntity<Diary> getDiaryById(@PathVariable(value = "id") Long id) {
//        Diary diaryById = diaryMapper.findDiaryById(id);
//        log.info("diaryById: {}", diaryById);
//
//        return ResponseEntity.ok(diaryById);
//    }

    // 일기 수정
    @PutMapping("{id}")
    public ResponseEntity<Diary> update(@PathVariable(value = "id") Long id, @RequestBody Diary diaryRequest) {
        Diary diaryById = diaryMapper.findDiaryById(id);

        // 날짜를 변경하지 않을 경우에는 시간도 갱신되면 안됨.
        // 날짜를 변경할 경우에 변경했을 때의 시간으로 수정.
        if (diaryById.getCreatedDate().toLocalDate() != diaryRequest.getCreatedDate().toLocalDate()) {
            if (diaryRequest.getCreatedDate() != null && diaryRequest.getCreatedDate().toLocalTime().equals(LocalTime.MIDNIGHT)) {
                LocalDate dateOnly = diaryRequest.getCreatedDate().toLocalDate();
                LocalTime nowTime = LocalTime.now();
                diaryRequest.setCreatedDate(LocalDateTime.of(dateOnly, nowTime));
            }
        }

        diaryById.setCreatedDate(diaryRequest.getCreatedDate());
        diaryById.setEmotionId(diaryRequest.getEmotionId());
        diaryById.setContent(diaryRequest.getContent());
        diaryMapper.updateDiary(diaryById);

        return ResponseEntity.ok(diaryById);
    }

    // 일기 삭제
    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) {
        diaryMapper.deleteDiary(id);
        return ResponseEntity.ok("delete success");
    }
}
