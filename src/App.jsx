import { Routes, Route } from 'react-router-dom';
import { useEffect, useReducer, useRef, useState, createContext } from 'react';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Header from './components/Header';

const initState = [];
const mockData = [
  {
    id: 1,
    date: new Date().getTime() -1,
    content: "야호",
    emotionId: 1,
  },
  {
    id: 2,
    date: new Date().getTime() -2,
    content: "오잇",
    emotionId: 3,
  },
  {
    id: 3,
    date: new Date().getTime() -3,
    content: "냐아앙",
    emotionId: 2,
  },
]
function reducer(state, action) {
  switch(action.type) {
    case "INIT": return action.data;
    case "CREATE": return [action.data, ...state];
    case "UPDATE": return state.map((it) => it.id === action.data.targetId ? {...action.data} : it);
    case "DELETE": return state.filter((it) => it.id !== action.data.targetId);
    default: return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {

  const [data, dispatch] = useReducer(reducer, initState);
  const idRef = useRef(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    });
    setIsDataLoaded(true);
  }, []);

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current++;
  };

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다...</div>
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <div className='App'>
              <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/diary/:id' element={<Diary />} />
              <Route path='/edit/:id' element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    )
  }
}

export default App