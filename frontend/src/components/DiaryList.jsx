import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({data}) => {
    const nav = useNavigate();
    const [sortType, setSortType] = useState("latest");

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    
    const getSortedDate = () => {
        return data.toSorted((a, b) => {
            if(sortType === 'oldest') {
                // ** 이 부분도 백엔드 쪽에 정렬 쿼리 만든 메퍼 적용해서 구현완료되면 계산식은 삭제할 부분 - 리턴으로 백엔드 쪽 정보 리턴하도록??
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                // ** 이 부분도 백엔드 쪽에 정렬 쿼리 만든 메퍼 적용해서 구현완료되면 계산식은 삭제할 부분 - 리턴으로 백엔드 쪽 정보 리턴하도록??
                return Number(b.createdDate) - Number(a.createdDate);
            }
        });
    };
    const sortData = getSortedDate();

    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된순</option>
                </select>
                <Button onClick={()=>nav("/new")} text={"새 일기 쓰기"} type={"POSITIVE"} />
            </div>
            <div className="list_wrapper">
                {sortData.map((item)=><DiaryItem key={item.id} {...item}     />)}
            </div>
        </div>
    );
};

export default DiaryList;