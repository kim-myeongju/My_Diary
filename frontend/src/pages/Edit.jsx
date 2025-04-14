import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
    const curDiaryItem = useDiary(params.id);

    usePageTitle(`${params.id}번 일기 수정`);

    const onClickDelete = () => {
        if(window.confirm("일기를 정말 삭제하시겠습니까?")) {
            onDelete(params.id);
            navigate("/", {replace: true});
        }
    }

    const onSubmit = (input) => {
        if(window.confirm("일기를 정말 수정하시겠습니까?")) {
            onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
            navigate("/", {replace: true});
        }
    };

    return (
        <div>
            <Header 
                title={"일기 수정하기"}
                leftChild={<Button onClick={() => navigate(-1)} text={"< 뒤로가기"} />}
                rightChild={<Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />}
            />
            <Editor onSubmit={onSubmit} initData={curDiaryItem} />
        </div>
    )
};

export default Edit;