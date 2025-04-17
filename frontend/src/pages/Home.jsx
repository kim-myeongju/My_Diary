// import { useSearchParams } from "react-router-dom";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import usePageTitle from "../hooks/usePageTitle";

// 해당 달에 작성된 일기들만 정렬렬
const getMonthlyData = (pivotDate, data) => {
                            // (년도, 월, 그달의 시작날인 1일, 0시, 0분, 0초)
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
                            // (년도, 월, 그달의 시작날인 그달의 끝날짜, 23시, 59분, 59초)
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();

    return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime);
};

const Home = () => {
    // 동적경로방식 query string 으로 파라미터 불러오기(?뒤에 변수명과 값 명시): /?value=hello
    // const [params, setParams] = useSearchParams();
    // console.log(params.get("value"));

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