import { useState } from "react";
import CreateBoardButton from "./cardCreatorButtons/CreateBoardButton";
import { useNavigate } from "react-router-dom";
import { fetchLists } from "../services/apiCalls";
import { toast } from "react-toastify";
import { deleteBoardById } from "../services/apiCalls";

const BoardsList = ({ boardsUpdate, boards, setLists, remainingBoards }) => {
  
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const fetchAndSetLists = async (boardId) => {
    try {
      let allLists = await fetchLists(boardId);

      setLists(allLists);
      navigate(`/boards/${boardId}`);
    } catch {
      toast.error("Error: Could not fetch lists for the given board");
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoardById(boardId);
      let updatedBoards = boards.filter((board) => board.id != boardId);
      boardsUpdate(updatedBoards);
      toast.success("Deleted board");
    } catch {
      toast.error("Error could not delete board");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-800 flex flex-col justify-start items-center px-4 py-4">
      <div>
        <CreateBoardButton
          remainingBoards={remainingBoards}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          boardsUpdate={boardsUpdate}
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {boards.map((board) => (
          <div
            key={board.id}
            className="mt-8 mx-4 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              fetchAndSetLists(board.id);
            }}
          >
            <div className="relative w-80 h-32 bg-white text-black shadow-md hover:shadow-2xl hover:border-2 hover:border-gray-800">
              <div className="p-4 relative">
                <h3 className="text-lg font-semibold">{board.name}</h3>

               
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-white hover:bg-black border-2 border-black rounded-md px-2 py-1 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBoard(board.id);
                  }}
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardsList;
