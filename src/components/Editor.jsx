import { emotionList, getFormattedDate } from '../util';
import './Editor.css';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import EmotionItem from './EmotionItem';

// New, Edit 컴포넌트에서 공통으로 사용
const Editor = ({ initData, onSubmit }) => {
    // initData: Editor 컴포넌트를 Edit에서 사용할 때 기존에 작성한 일기를 페이지에 보여줄 목적
    // onSubmit: 일기를 모두 작성하고 <작성 완료>버튼을 클릭 했을 때 호출할 이벤트 핸들러
    
    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: "",
    });
    const navigate = useNavigate();

    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        })
    };

    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        })
    };

    const handleSubmit = () => {
        onSubmit(state);
    };

    const handleOnGoBack = () => {
        navigate(-1);
    }
    
    // 최적화
    // Editor 컴포넌트를 리렌더해도 함수 handleChangeEmotion 을 다시 생성하지 않도록 useCallback을 사용해서 메모이제이션하기
    const handleChangeEmotion = useCallback((emotionId) => {
        setState((state) => ({
            ...state,
            emotionId,
        }));
    }, []);

    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);

    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date} onChange={handleChangeDate} />
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem 
                            key={it.id}
                            {...it}
                            onClick={handleChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea placeholder='오늘은 어땠나요?' value={state.content} onChange={handleChangeContent}></textarea>
                </div>
            </div>
            <div className="editor_section btn_section">
                <Button text={"취소하기"} onClick={handleOnGoBack} />
                <Button text={"작성완료"} type={"positive"} onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default Editor;