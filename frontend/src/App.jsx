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

  // localStorage.setItem("diary", JSON.stringify(nextState));

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
          throw new Error("서버 응답 오류");
        }

        const data = await response.json();

        if(!Array.isArray(data)) {
          setIsLoading(false);
          return;
        }

        dispatch({
          type: "INIT",
          data: data,
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
    const newDiary = {
      createdDate: new Date(createdDate).toISOString(),
      emotionId,
      content,
    };

    console.log("onCreate: ", newDiary);

    try {
      const response = await fetch("http://localhost:8080/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDiary),
      });

      if(!response.ok) {
        throw new Error("서버 응답 실패");
      }

      const saveDiary = await response.json();

      if(saveDiary.msg === "save success") {
        const diariesLatest = await fetch("http://localhost:8080/diary/latest");
        if(!diariesLatest.ok) {
          throw new Error("일기 목록 불러오기 실패");
        }

        const diaries = await diariesLatest.json();
        if(Array.isArray(diaries)) {
          dispatch({
            type: "INIT",
            data: diaries,
          });
        } else {
          console.error("불러온 데이터가 예상과 다릅니다.");
        }
      } else {
        console.error("일기 저장 실패: ", saveDiary.msg);
      };
    } catch (error) {
      console.error("일기 저장 실패: ", error);
    }
  };

  // 기존 일기 수정
  // const onUpdate = (id, createdDate, emotionId, content) => {
  //   dispatch({
  //     type: "UPDATE",
  //     data: {
  //       id,
  //       createdDate,
  //       emotionId,
  //       content,
  //     }
  //   })
  // };

  // 기존 일기 삭제
  // const onDelete = (id) => {
  //   dispatch({
  //     type: "DELETE",
  //     id,
  //   })
  // };

  if(isLoading) {
    return <div>데이터 로딩중입니다...!!!^^</div>;
  }
  
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDisPatchContext.Provider
          value={{
            onCreate,
            // onUpdate,
            // onDelete,
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
