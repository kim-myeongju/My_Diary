import { useParams } from "react-router-dom";

const Diary = () => {
    const { id } = useParams();

    return (
        <div className="Diary">
            <div>{id}번의 일기입니다.</div>
            <div>Diary</div>
        </div>
    )
}

export default Diary;