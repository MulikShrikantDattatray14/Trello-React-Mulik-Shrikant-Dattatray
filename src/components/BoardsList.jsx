import { useState } from "react";
import CreateBoardButton from "./cardCreatorButtons/CreateBoardButton";
import { useNavigate } from "react-router-dom";
import { fetchLists } from "../services/apiCalls";
import { toast } from "react-toastify";
import { deleteBoardById } from "../services/apiCalls";
import img from "../../src/assets/boardlist.jpg";
console.log(img);
import { MdDelete } from "react-icons/md";

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
    <div className="w-full h-screen bg-white bg-cover bg-center flex flex-col justify-start items-center px-4 py-4">
      <div>
        <CreateBoardButton
          remainingBoards={remainingBoards}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          boardsUpdate={boardsUpdate}
        />
      </div>
      <div className="flex flex-wrap justify-center ">
        {boards.map((board) => (
          <div
            key={board.id}
            className="mt-8 mx-4 cursor-pointer  bg-white p-2"
            onClick={(e) => {
              e.preventDefault();
              fetchAndSetLists(board.id);
            }}
          >
            <div className="relative w-80 h-32  bg-white text-black border-black shadow-2xl hover:border-2 hover:border-white-800 ">
              <div className="p-4 relative">
                <h3 className="text-lg font-bold">{board.name}</h3>

                <button
                  className="absolute top-2 right-2 text-black hover:text-white hover:bg-black  rounded-md px-2 py-1 text-sm hover:border-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBoard(board.id);
                  }}
                >
                  X
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
