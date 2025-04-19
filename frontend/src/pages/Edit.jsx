import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDisPatchContext } from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDisPatchContext);
    const curDiaryItem = useDiary(params.id);

    usePageTitle(`${params.id}번 일기 수정`)

    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제하시겠습니까..?\n다시 복구되지 않습니다 !")) {
            onDelete(params.id);
            nav("/", {replace: true});   // {replace: true}: 그냥 뒤로가기 방지
        }
    };

    const onSubmit = (input) => {
        if(window.confirm("일기를 정말 수정하시겠습니까...?")) {
            onUpdate(params.id, input.createdDate, input.emotionId, input.content);
            nav("/", {replace: true});
        }
    };

    return (
        <div>
            <Header
                title={"일기 수정하기"}
                leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
                rightChild={<Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />} />
            <Editor onSubmit={onSubmit} initData={curDiaryItem} />
        </div>
    );
};

export default Edit;