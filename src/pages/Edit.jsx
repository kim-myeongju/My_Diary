import { useParams, useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const Edit = () => {
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
    const onClickDelete = () => {
        if(window.confirm("일기를 정말 삭제하시겠습니까?")) {
            onDelete(id);
            navigate("/", { replace: true });
        }
    };

    const onSubmit = (data) => {
        if(window.confirm("일기를 수정하시겠습니까?")) {
            const { date, content, emotionId } = data;
            onUpdate(id, date, content, emotionId);
            navigate("/", { replace: true });
        }
    }

    if (!data) {
        return <div>일기를 불러오는 중입니다...</div>
    } else {
        return (
            <div>
                <Header title={"일기 수정하기"} leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />} rightChild={<Button text={"삭제하기"} type={"negative"} onClick={onClickDelete} />} />
                <Editor initData={data} onSubmit={onSubmit} />
            </div>
        )
    }
}

export default Edit;