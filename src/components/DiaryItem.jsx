import './DiaryItem.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmotionImgById } from '../util';
import Button from './Button';

const DiaryItem = ({ id, emotionId, content, date }) => {
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/diary/${id}`);
    };

    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="DiaryItem">
            <div
                onClick={goDetail}
                className={["img_section", `img_section_${emotionId}`].join(" ")}
            >
                <img src={getEmotionImgById(emotionId)} alt={`emotion${emotionId}`} />
            </div>
            <div onClick={goDetail} className="info_section">
                <div className="date_wrapper">
                    {new Date(parseInt(date)).toLocaleDateString()}
                </div>
                <div className="content_wrapper">
                    {content.slice(0, 25)}
                </div>
            </div>
            <div className="btn_section">
                <Button onClick={goEdit} text={"수정하기"} />
            </div>
        </div>
    )
}

/* 
    최적화
    DiaryItem 컴포넌트는 Context 에서 데이터를 받거나 Props 로 함수나 배열 같은 참조형 값을 받지 않기 때문에
    React.memo 를 이용해 Props 를 기준으로 메모이제이션 함.
*/
export default React.memo(DiaryItem);