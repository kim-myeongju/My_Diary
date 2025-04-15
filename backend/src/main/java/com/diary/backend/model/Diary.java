package com.diary.backend.model;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Diary {
    Long id;
    String emotionId;
    LocalDateTime createdDate;
    String content;
}
