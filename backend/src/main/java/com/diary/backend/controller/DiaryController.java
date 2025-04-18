package com.diary.backend.controller;
import com.diary.backend.model.Diary;
import com.diary.backend.repository.DiaryMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("diary")
public class DiaryController {

    @Autowired
    DiaryMapper diaryMapper;

    // 일기 추가
    @PostMapping
    public ResponseEntity<Map<String, String>> save(@RequestBody Diary diary) {
        System.out.println("diary data ==> " + diary);

        if (diary == null) {
            Map<String,String> response = new HashMap<>();
            response.put("msg", "save fail");
            return ResponseEntity.status(400).body(response);
        }

        // createdDate가 null이면 현재 날짜로 설정
//        if (diary.getCreatedDate() == null) {
//            diary.setCreatedDate(LocalDateTime.now());
//        }

        diaryMapper.saveDiary(diary);

        Map<String,String> response = new HashMap<>();
        response.put("msg", "save success");

        return ResponseEntity.ok(response);
    }

//    @GetMapping("/test")
//    public ResponseEntity<String> test() {
//        Diary diary = new Diary();
//        if (diary == null) {
//            return ResponseEntity.status(400).body("save fail");
//        }
//        diary.setCreatedDate(LocalDateTime.now());
//        diary.setEmotionId(1L);
//        diary.setContent("this is test23");
//
//        diaryMapper.saveDiary(diary);
//
//        return ResponseEntity.ok("save success");
//    }

    // 일기 최신순으로 정렬
    @GetMapping
    public ResponseEntity<List<Diary>> getDiaryListLatest() {
        List<Diary> allDiary = diaryMapper.findAllDiaryDesc();
        return ResponseEntity.ok(allDiary);
    }

    // id에 해당하는 일기 상세 조회
    @GetMapping("{id}")
    public ResponseEntity<Diary> getDiaryById(@PathVariable(value = "id") Long id) {
        Diary diaryById = diaryMapper.findDiaryById(id);
        return ResponseEntity.ok(diaryById);
    }

    // 일기 수정
    @PutMapping("{id}")
    public ResponseEntity<Diary> update(@PathVariable(value = "id") Long id, @RequestBody Diary diaryRequest) {
        Diary diaryById = diaryMapper.findDiaryById(id);

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
