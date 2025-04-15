import "./EmotionItem.css";
import {getEmotionImage} from "../utils/get-emotion-images";
import React from "react";

const EmotionItem = ({emotionId, emotionName, isSelected, onClick}) => {
    return (
        <div onClick={onClick} className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ""}`}>
            <img className="emotion_img" src={getEmotionImage(emotionId)} />
            <div className="emotion_name">{emotionName}</div>
        </div>
    )
}

export default React.memo(EmotionItem);