import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import {getStringDate} from "../utils/get-string-date";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
    const params = useParams();
    const navigate = useNavigate();

    usePageTitle(`${params.id}번 일기`);

    const curDiaryItem = useDiary(params.id);
    if(!curDiaryItem) {
        return <div>{`${params.id}번 일기 불러오는 중...`}</div>
    }

    const { createdDate, emotionId, content } = curDiaryItem;
    const title = getStringDate(new Date(createdDate));
    
    return (
        <div>
            <Header
                title={`${title}의 기록`}
                leftChild={<Button onClick={() => navigate(-1)} text={"< 뒤로가기"} />}
                rightChild={<Button onClick={() => navigate(`/edit/${params.id}`)} text={"수정하기"} />}
            />
            <Viewer emotionId={emotionId} content={content} />
        </div>
    )
}

export default Diary;