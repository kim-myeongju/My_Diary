import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import usePageTitle from "../hooks/usePageTitle";

const getMonthlyData = (pivotDate, data) => {
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();

    const diaryData = data.filter((diary) => {
      
        // 날짜 비교 (createdDate가 문자열이면 Date 객체로 바꿔줘야 해)
        const diaryDate = new Date(diary.createdDate);
        return beginTime <= diaryDate && diaryDate <= endTime;
    });
      
    return diaryData;
};

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const monthlyData = getMonthlyData(pivotDate, data);

    usePageTitle("감정 일기장");

    //console.log("monthlyData : " + monthlyData);

    const onIncreseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    return (
        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
                rightChild={<Button onClick={onIncreseMonth} text={">"} />}
            />
            <DiaryList data={monthlyData} />
        </div>
    );
};

export default Home;