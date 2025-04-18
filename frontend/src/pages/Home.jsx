// import { useSearchParams } from "react-router-dom";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import usePageTitle from "../hooks/usePageTitle";

// 해당 달에 작성된 일기들만 정렬
const getMonthlyData = (pivotDate, data) => {
                            // (년도, 월, 그달의 시작날인 1일, 0시, 0분, 0초)
    // const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1).getTime();
                            // (년도, 월, 그달의 시작날인 그달의 끝날짜, 23시, 59분, 59초)
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();

    return data.filter((item) => {
        const created = new Date(item.createdDate);
        if(isNaN(created.getTime())) {
            console.warn("잘못된 날짜: ", item.createdDate);
            return false;
        }
        // const itemTime = new Date(item.createdDate).getTime();
        const itemTime = created.getTime();
        return beginTime <= itemTime && itemTime <= endTime;
    });
};

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());

    usePageTitle("감정 일기장");
    
    const monthlyData = getMonthlyData(pivotDate, data);

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
                leftChild={<Button onClick={onDecreaseMonth} text={"<"}/>}
                rightChild={<Button onClick={onIncreseMonth} text={">"}/>}
            />
            <DiaryList data={monthlyData} />
        </div>
    );
};

export default Home;