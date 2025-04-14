import "./DiaryItem.css";
import { getEmotionImage } from "../utils/get-emotion-images";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import React from "react";

const DiaryItem = ({id, emotionId, createdDate, content}) => {
    const navigate = useNavigate();

    return (
        <div className="DiaryItem">
            <div onClick={() => navigate(`/diary/${id}`)} className={`img_section img_section_${emotionId}`}>
                <img src={getEmotionImage(emotionId)} />
            </div>
            <div onClick={() => navigate(`/diary/${id}`)} className="info_section">
                <div className="created_date">
                    {new Date(createdDate).toLocaleDateString()}
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
            <div className="button_section">
                <Button onClick={() => navigate(`/edit/${id}`)} text={"수정하기"} />
            </div>
        </div>
    )
}

export default React.memo(DiaryItem);