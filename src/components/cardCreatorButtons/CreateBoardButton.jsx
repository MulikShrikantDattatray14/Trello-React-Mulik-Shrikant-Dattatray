import { useState } from "react";
import { createNewBoard } from "../../services/apiCalls";
import { toast } from "react-toastify";
import { addData } from "../../slice/BoardSlice";
import { useDispatch } from "react-redux";
const CreateBoardButton = ({
  setIsEditing,
  isEditing,
  boardsUpdate,
  remainingBoards,
}) => {
  const dispatch=useDispatch()
  const handleCreateBoard = async (boardName) => {
    try {
      // let newBoard = await createNewBoard(boardName);
      // boardsUpdate((prev) => [...prev, newBoard]);
      dispatch(addData(boardName))
      toast.success("Created a new board");
    } catch {
      toast.error("Error: Could not create new board");
    }
  };

  return (
    <div
      className="w-80 p-4 bg-white text-center cursor-pointer relative rounded-lg shadow-md hover:bg-gray-200"
      onClick={() => setIsEditing(true)}
    >
      <div>
        <h3 className="text-black">Create New Board +</h3>
        <p className="text-black">{remainingBoards} Boards Remaining</p>
      </div>

      {isEditing && (
        <div className="mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(false);
              handleCreateBoard(e.target.boardName.value);
            }}
          >
            <input
              className="w-4/5 p-2 mb-2 bg-white border border-gray-300 rounded"
              name="boardName"
              type="text"
              placeholder="Enter Board Name"
            />
            <div className="flex justify-between mt-4">
              <button
                className="w-auto h-8 bg-black text-white px-4 rounded"
                type="submit"
              >
                Add
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                }}
                className="text-black hover:text-white border-2 border-black hover:bg-black hover:border-black rounded px-2 py-1"
              >
                CLOSE
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateBoardButton;
