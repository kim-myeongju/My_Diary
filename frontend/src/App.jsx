import './App.css';
import { useReducer, createContext, useEffect, useState } from 'react';
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
    case "UPDATE": {
      nextState = state.map((item) => String(item.id) === String(action.data.id)? action.data : item);
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default: 
      return state;
  }

  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDisPatchContext = createContext();

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const storedData = async () => {
      try {
        const response = await fetch("http://localhost:8080/diary");

        if(!response.ok) {
          throw new Error('서버 연결 실패');
        }

        const allData = await response.json();

        if(!Array.isArray(data)) {
          setIsLoading(false);
          return;
        }

        dispatch({
          type: "INIT",
          data: allData,
        });
      } catch(error) {
        console.error("일기 데이터 불러오기 실패: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    storedData();
  }, []);

  // 새로운 일기 추가
  const onCreate = async (createdDate, emotionId, content) => {
    
    const nowData = {
      createdDate: new Date(createdDate).toISOString(),
      emotionId,
      content,
    };

    try {
      const response = await fetch('http://localhost:8080/diary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nowData),
      });

      if (!response.ok) {
        throw new Error('서버 연결 실패');
      }

      const createdDiary = await response.json();

      dispatch({
        type: "CREATE",
        data: createdDiary,
      });
    } catch (error) {
      console.log("일기 저장 실패: ", error);
    }
  };

  // 기존 일기 수정
  const onUpdate = async (id, createdDate, emotionId, content) => {
    
    const nowData = {
      createdDate: new Date(createdDate).toISOString(),
      emotionId,
      content,
    };

    try {
      const response = await fetch(`http://localhost:8080/diary/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nowData),
      });

      if (!response.ok) {
        throw new Error('서버 연결 실패');
      }

      const updatedDiary = await response.json();

      dispatch({
        type: "UPDATE",
        data: updatedDiary,
      });
    } catch (error) {
      console.log("일기 수정 실패: ", error);
    }
  };

  // 기존 일기 삭제
  const onDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/diary/${id}`, {
        method: 'DELETE',
      });

      if(!response.ok) {
        throw new Error('서버 연결 실패');
      }

      dispatch({
        type: "DELETE",
        id,
      });
    } catch (error) {
      console.log("일기 삭제 실패: ", error);
    }
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