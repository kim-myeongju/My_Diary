import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import {getStringDate} from "../util/get-string-date";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
    // 동적경로방식 URL Parameter(/뒤에 아이템의 id를 명시): ~/diary/1, ~/diary/2, ~/diary/3
    const params = useParams();
    const nav = useNavigate();

    usePageTitle(`${params.id}번 일기`);
    
    const curDiaryItem = useDiary(params.id);
    if(!curDiaryItem) {
        return <div>데이터 로딩중...!</div>;
    }

    const { createdDate, emotionId, content } = curDiaryItem;
    const title = getStringDate(new Date(createdDate));

    return (
        <div>
            <Header
                title={`${title} 기록`}
                leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
                rightChild={<Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />} />
            <Viewer emotionId={emotionId} content={content} />
        </div>
    );
};

export default Diary;