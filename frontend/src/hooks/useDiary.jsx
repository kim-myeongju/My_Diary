import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();

    useEffect(() => {
        const currentDiaryItem = data.find((item) => String(item.id) === String(id));

        if(!currentDiaryItem) {
            window.alert("존재하지 않는 일기입니다.");
            nav("/", {replace: true});
        }

        setCurDiaryItem(currentDiaryItem);
    // }, [params.id, data]);   // 리액트 버전이 업그레이드 되면서 발생하는 오류 해결
    }, [id]);

    return curDiaryItem;
};

export default useDiary;