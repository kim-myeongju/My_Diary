package com.diary.backend.controller;
import com.diary.backend.model.Diary;
import com.diary.backend.repository.DiaryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;

@Controller
public class HomeController {

    @Autowired
    DiaryMapper diaryMapper;

    @GetMapping("test")
    public ResponseEntity<String> test() {
        Diary diary = new Diary();
        diary.setContent("test");
        diary.setCreatedDate(LocalDate.now());
        diary.setEmotionId("1");
        diaryMapper.saveDiary(diary);
        return ResponseEntity.ok("test");
    }
}
