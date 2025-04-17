import './App.css';
import { useReducer, useRef, createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
export const DiaryDisPatchContext = createContext();

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);

  // ** 백엔드 연동되면 삭제하기
  const idRef = useRef(3);

  // localStorage.setItem("test", 'hello');
  // localStorage.setItem("person", JSON.stringify({name: "송혜교"}));

  // const test = localStorage.getItem("test");
  // console.log(test);
  // const person = localStorage.getItem("person");
  // console.log(JSON.parse(person));

  // localStorage.removeItem("test");
  // localStorage.removeItem("person");   // 브라우저 어플리케이션에서 삭제할 데이터를 클릭하고 backspace 눌러도 삭제

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

    // ** 백엔드 연동되면 삭제하기
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
        <DiaryDisPatchContext.Provider
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
        </DiaryDisPatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
