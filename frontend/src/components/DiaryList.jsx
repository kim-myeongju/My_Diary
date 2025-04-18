import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const DiaryList = ({ data }) => {

    const nav = useNavigate();
    const [sortType, setSortType] = useState("latest");

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    const sortedData = useMemo(() => {
        return data.slice().sort((a, b) => {
            if (sortType === "oldest") {
                return new Date(a.createdDate) - new Date(b.createdDate); // 오래된 순
            } else {
                return new Date(b.createdDate) - new Date(a.createdDate); // 최신순
            }
        });
    }, [data, sortType]);

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
                {sortedData.length === 0 ? (
                    <p>일기가 없습니다.</p>
                ) : (
                    sortedData.map((item) => <DiaryItem key={item.id} {...item} />)
                )}
            </div>
        </div>
    );
};

export default DiaryList;