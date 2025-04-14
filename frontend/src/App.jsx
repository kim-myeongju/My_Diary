import './App.css';
import { useReducer, useRef, useContext, createContext, useEffect, useState } from 'react';
import { Routes, Route, useSearchParams, useAsyncValue } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';

// 1. "/": 모든 일기를 조회하는 Home 페이지
// 2. "/new": 새로운 일기를 작성하는 New 페이지
// 3. "/diary": 일기를 상세히 조회하는 Diary 페이지

function reducer(state, action) {
  let nextState;

  switch(action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
      // return [action.data, ...state];
    case "UPDATE": {
      nextState = state.map((item) => String(item.id) === String(action.data.id)? action.data : item);
      break;
    }
      // return state.map((item) => String(item.id) === String(action.data.id)? action.data : item);
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
      // return state.filter((item) => String(item.id) !== String(action.id));
    default: 
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));

  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(3);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if(!storedData) { // storedData가 undefined라면 리턴 !
      return ;
    }
    const parsedData = JSON.parse(storedData);

    if(!Array.isArray(parsedData)) {
      setIsLoading(false);
      return ;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if(Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      }
    })
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    })
  };

  if(isLoading) {
    return <div>데이터 로딩중입니다...!!!^^</div>;
  }
  
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
