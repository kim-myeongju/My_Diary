import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const { onCreate } = useContext(DiaryDispatchContext);
    const onSubmit = (data) => {
        const { date, content, emotionId } = data;
        onCreate(date, content, emotionId);
        navigate("/", { replace: true });
    }

    return (
        <div className="New">
            <Header title={"New Diary"} leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />} />
            <Editor onSubmit={onSubmit} />
        </div>
    )
}

export default New;