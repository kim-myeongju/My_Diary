package com.diary.backend.repository;

import com.diary.backend.model.Diary;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DiaryMapper {
    // 일기 추가
    void saveDiary(Diary diary);
    // 전체 일기 최신 순으로 정렬
    List<Diary> findAllDiaryDesc();
    // id에 해당하는 일기 상세조회
    Diary findDiaryById(Long id);
    // 일기 수정
    void updateDiary(Diary diary);
    // 일기 삭제
    void deleteDiary(Long id);
}
