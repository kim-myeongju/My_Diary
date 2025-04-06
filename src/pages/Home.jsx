import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
    // 쿼리스트링 확인
    // const [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.get("sort"));
    
    return (
        <div>
            <Button text={"default"} onClick={() => {alert("default btn")}} />
            <Button type="positive" text={"positive"} onClick={() => {alert("positive btn")}} />
            <Button type="negative" text={"negative"} onClick={() => {alert("negative btn")}} />
        </div>
    )
}

export default Home;