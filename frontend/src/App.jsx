import './App.css';
import { useReducer, useRef, useContext, createContext, useEffect, useState } from 'react';
import { Routes, Route, useSearchParams, useAsyncValue } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';
import axios from 'axios';

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
      nextState = state.map((item) => item.id === action.data.id? action.data : item);
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
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const getAllDiary = async () => {
      try {
        const response = await fetch("http://localhost:8080/diary");
        
        if (!response.ok) {
          throw new Error("Failed to fetch diary data");
        }

        // 서버에서 받아온 데이터로 상태 업데이트
        const diaryData = await response.json();
        
        // 데이터를 reducer로 보냄
        dispatch({
          type: "INIT",
          data: diaryData,
        });
        
      } catch (error) {
        console.error("Error fetching diaries:", error);
      } finally {
        setIsLoading(false); // 로딩 완료 후 false로 설정
      }
    };

    getAllDiary();
  }, []);

  // 새로운 일기 추가
  const onCreate = async (createdDate, emotionId, content) => {
    if (!createdDate.trim() || !content.trim()) return;
    const diaryData = {
      createdDate : new Date(createdDate).toISOString(),
      emotionId: emotionId,
      content: content,
    };

    console.log(createdDate);

    try {
      const response = await fetch('http://localhost:8080/diary', {
        method: "POST",
        body: JSON.stringify(diaryData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = response;

      dispatch({
        type: "CREATE",
        data: resData,
      });

    } catch (err) {
      console.log("save fail: ", err);
    }
  };

  // 기존 일기 수정
  const onUpdate = async (id, createdDate, emotionId, content) => {
    const updateDiary = {
      id,
      createdDate: new Date(createdDate).toISOString(),
      emotionId: emotionId,
      content: content,
    }

    try {
      const response = await fetch(`http://localhost:8080/diary/${id}`, {
        method: "PUT",
        body: JSON.stringify(updateDiary),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(!response.ok) {
        throw new Error("update fail");
      }

      const resData = await response.json();

      dispatch({
        type: "UPDATE",
        data: {
          id,
          emotionId: content,
        }
      });

    } catch(error) {
      console.error("update request fail: ", error);
    } finally {
      console.error("update emotionId: ", emotionId);
      console.error("update content: ", content);
    }
  };

  // 기존 일기 삭제
  const onDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/diary/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch diary data");
      }
      
      dispatch({
        type: "DELETE",
        id,
      });
      
    } catch (error) {
      console.error("Error fetching diaries:", error);
    }
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