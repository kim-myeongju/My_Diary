import './EmotionItem.css';
import React from 'react';

const EmotionItem = ({ id, img, name, onClick, isSelected }) => {

    const handleOnClick = () => {
        onClick(id);
    }

    return (
        <div className={[
            "EmotionItem",
            isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`,
            ].join(" ")}
            onClick={handleOnClick}>
            <img src={img} alt={`emotion${id}`} />
            <span>{name}</span>
        </div>
    )
}

/* 
    최적화
    EmotionItem 컴포넌트는 Editor 컴포넌트로부터 함수를 Props로 전달받기 때문에
    컴포넌트가 리렌더 되면 함수 또한 다시 생성됨.
    즉, 사용자가 날짜나 일기를 입력해 Editor 컴포넌트가 리렌더 될 때 함수 handleChangeEmotion 또한 다시 생성됨.
    따라서 Editor 컴포넌트를 리렌더해도 함수 handleChangeEmotion 을 다시 생성하지 않도록 useCallback을 사용해서
    메모이제이션하기.
*/
export default React.memo(EmotionItem);