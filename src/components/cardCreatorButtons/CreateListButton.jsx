import { useState } from "react";
import { toast } from "react-toastify";
import { createNewList } from "../../services/apiCalls";
import { useParams } from "react-router-dom";

const CreateListButton = ({
  setIsEditing,
  isEditing,
  listsUpdate,
  lists,
  AllBoardsInfo,
}) => {
  let param = useParams();
  let BoardID = param.id;

  let BoardName = AllBoardsInfo.filter((element) => element.id === BoardID).map(
    (element) => element.name
  );

  const handleCreateList = async (e) => {
    try {
      const newList = await createNewList(BoardID, e.target.listName.value);
      listsUpdate((prevLists) => [...prevLists, newList]);
      toast.success("New list created");
    } catch {
      toast.error("Error: Could not create new list");
    }
  };

  return (
    <div
      className="w-80 cursor-pointer z-10 relative hover:bg-black  hover:shadow-xl hover:border-gray-400"
      onClick={() => setIsEditing(true)}
    >
      <div className="p-4 bg-white text-center">
        <h3 className="text-black">Create New List +</h3>
      </div>
      {isEditing && (
        <div className="p-4 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(false);
              handleCreateList(e);
            }}
          >
            <input
              className="w-4/5 p-2 mb-2 bg-white border border-gray-300 rounded"
              name="listName"
              type="text"
              placeholder="Enter List Name"
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
                className="h-8 bg-gray-300 text-gray-700 px-4 rounded hover:bg-black hover:text-white"
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

export default CreateListButton;
