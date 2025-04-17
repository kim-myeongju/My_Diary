package com.diary.backend.model;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Diary {
    Long id;
    LocalDateTime createdDate;
    Long emotionId;
    String content;
}
