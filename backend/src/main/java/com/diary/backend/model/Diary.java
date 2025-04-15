package com.diary.backend.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Diary {
    Long id;
    String emotionId;
    LocalDate createdDate;
    String content;
}
