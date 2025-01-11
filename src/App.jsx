import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { toast } from "react-toastify";
import { fetchBoards } from "./services/apiCalls";
import BoardsPage from "./pages/BoardsPage";
import MainLayout from "./layouts/MainLayout";
import ListsPage from "./pages/ListsPage";
import PageNotFound from "./pages/PageNotFound";
import { useReducer } from "react";

const boardsInitialState = {
  boards: [],
};

const boardsReducer = (state, action) => {
  switch (action.type) {
    case "fetchBoards":
      return { boards: action.boards };

    case "addBoards":
      return { boards: [...state.boards, action.newBoard] };
    // boardsUpdate((prev) => [...prev, newBoard]);

    case "deleteBoards":
      let updatedBoards = state.boards.filter(
        (board) => board.id != action.boardId
      );
      return { boards: updatedBoards };
  }
};

const listsInitialState = {
  lists: [],
};

const listssReducer = (state, action) => {
  switch (action.type) {
    case "fetchLists":
      return { lists: action.allLists };

    case "addLists":
      return { lists: [...state.lists, action.newList] };
    //listsUpdate((prevLists) => [...prevLists, newList]);

    case "deleteLists":
      let updatedlists = [...state.lists].filter(
        (item) => item.id !== action.e.target.id
      );
      return { lists: updatedlists };

    //setLists((prev) => prev.filter((item) => item.id !== e.target.id));635
  }
};

function App() {
  // const [boards, setBoards] = useState([]);
  const [boards, dispatchBoards] = useReducer(
    boardsReducer,
    boardsInitialState
  );
  //const [lists, setLists] = useState([]);
  const [lists, dispatchlist] = useReducer(listssReducer, listsInitialState);

  let remainingBoards = 10 - boards?.boards?.length;

  // let AllBoardsInfo = Array.from(boards.boards);

  // const boardsUpdate = (newBoard) => {
  //   setBoards(newBoard);
  // };

  // const listsUpdate = (newList) => {
  //   setLists(newList);
  // };

  useEffect(() => {
    const fetchAndSetBoards = async () => {
      try {
        const boardsData = await fetchBoards();
        dispatchBoards({ type: "fetchBoards", boards: boardsData });
      } catch {
        toast.error("Error: Could not fetch boards");
      }
    };

    fetchAndSetBoards();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <BoardsPage
              dispatchBoards={dispatchBoards}
              remainingBoards={remainingBoards}
              // boardsUpdate={boardsUpdate}
              boards={boards.boards}
              //listsUpdate={listsUpdate}
              dispatchlist={dispatchlist}
              lists={lists.lists}
            />
          }
        />
        <Route
          path="/boards/:id"
          element={
            <ListsPage
              lists={lists.lists}
              dispatchlist={dispatchlist}
              //listsUpdate={listsUpdate}
              AllBoardsInfo={boards.boards}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
