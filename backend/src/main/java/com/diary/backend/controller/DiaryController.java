package com.diary.backend.controller;
import com.diary.backend.model.Diary;
import com.diary.backend.repository.DiaryMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("diary")
public class DiaryController {

    @Autowired
    DiaryMapper diaryMapper;

    @PostMapping
    public ResponseEntity<String> save(@RequestBody Diary diary) {
        if (diary == null) {
            return ResponseEntity.status(400).body("save fail");
        }

//        // createdDate가 null이면 현재 날짜로 설정
//        if (diary.getCreatedDate() == null) {
//            diary.setCreatedDate(LocalDateTime.now());
//        }

        diaryMapper.saveDiary(diary);
        return ResponseEntity.ok("save success");
    }

    @GetMapping
    public ResponseEntity<List<Diary>> getDiaryList() {
        List<Diary> allDiary = diaryMapper.findAllDiary();
        return ResponseEntity.ok(allDiary);
    }

    @GetMapping("{id}")
    public ResponseEntity<Diary> getDiaryById(@PathVariable(value = "id") Long id) {
        Diary diaryById = diaryMapper.findDiaryById(id);
        return ResponseEntity.ok(diaryById);
    }

    @PutMapping("{id}")
    public ResponseEntity<Diary> update(@PathVariable(value = "id") Long id, @RequestBody Diary diaryRequest) {
        Diary diaryById = diaryMapper.findDiaryById(id);
        diaryById.setEmotionId(diaryRequest.getEmotionId());
        diaryById.setContent(diaryRequest.getContent());
        log.info("emotionId: {}", diaryRequest.getEmotionId());
        log.info("content: {}", diaryRequest.getContent());
        diaryMapper.updateDiary(diaryById);

        return ResponseEntity.ok(diaryById);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) {
        diaryMapper.deleteDiary(id);
        return ResponseEntity.ok("delete success");
    }
}
