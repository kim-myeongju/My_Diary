package com.diary.backend.repository;

import com.diary.backend.model.Diary;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DiaryMapper {
    void saveDiary(Diary diary);
    List<Diary> findAllDiaryDesc();
    List<Diary> findAllDiary();
    Diary findDiaryById(Long id);
    void updateDiary(Diary diary);
    void deleteDiary(Long id);
}
