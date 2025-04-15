package com.diary.backend.repository;

import com.diary.backend.model.Diary;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DiaryMapper {
    void saveDiary(Diary diary);
}
