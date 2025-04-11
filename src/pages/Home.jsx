import Header from '../components/Header';
import Button from '../components/Button';
import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import { getMonthRangeByDate } from '../util';
import DiaryList from '../components/DiaryList';

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [filteredData, setFilteredData] = useState([]);
    const [pivotDate, setPivoDate] = useState(new Date());
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;

    const onIncreaseMonth = () => {
        setPivoDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };

    const onDecreaseMonth = () => {
        setPivoDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    useEffect(() => {
        if (data.length > 0) {
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter(
                    (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
                )
            );
        } else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    return (
        <div className="Home">
            <Header
                title={headerTitle}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
                rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
            />
            <DiaryList data={filteredData}/>
        </div>
    )
}

export default Home;