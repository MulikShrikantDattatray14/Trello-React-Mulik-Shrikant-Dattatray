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

function App() {
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState([]);

  let remainingBoards = 10 - boards.length;

  let AllBoardsInfo = Array.from(boards);

  const boardsUpdate = (newBoard) => {
    setBoards(newBoard);
  };

  const listsUpdate = (newList) => {
    setLists(newList);
  };

  useEffect(() => {
    const fetchAndSetBoards = async () => {
      try {
        const boardsData = await fetchBoards();
        setBoards(boardsData);
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
              remainingBoards={remainingBoards}
              boardsUpdate={boardsUpdate}
              boards={boards}
              listsUpdate={listsUpdate}
              lists={lists}
            />
          }
        />
        <Route
          path="/boards/:id"
          element={
            <ListsPage
              lists={lists}
              listsUpdate={listsUpdate}
              AllBoardsInfo={AllBoardsInfo}
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
