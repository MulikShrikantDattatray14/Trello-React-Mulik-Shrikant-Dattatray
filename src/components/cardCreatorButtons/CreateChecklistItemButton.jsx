import { useState } from "react";
import { toast } from "react-toastify";
import { createNewChecklistItem } from "../../services/apiCalls";

const CreateChecklistItemButton = ({
  isAdding,
  setIsAdding,
  setCheckItems,
  checklist,
}) => {
  const handleNewChecklistItem = async (e) => {
    try {
      let newChecklistItem = await createNewChecklistItem(
        e.target.checklistItemName.value,
        checklist.id
      );
      setCheckItems((prev) => [...prev, newChecklistItem]);
      setIsAdding(false);
    } catch {
      toast.error("Error: Could not create new checklist item");
    }
  };

  return (
    <>
      {!isAdding && (
        <div
          className="w-4/5 border border-gray-300 mt-4 py-2 rounded cursor-pointer mx-auto flex justify-center items-center text-base hover:bg-gray-200 hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            setIsAdding(true);
          }}
        >
          Add Checklist Item
        </div>
      )}
      {isAdding && (
        <div className="relative flex mb-4 text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNewChecklistItem(e);
              setIsAdding(false);
            }}
            className="w-full"
          >
            <input
              className="w-11/12 p-1.5 mb-2 bg-white border border-gray-300 rounded text-sm"
              name="checklistItemName"
              type="text"
              placeholder="Enter Checklist Item Name"
            />
            <div className="flex justify-between mt-4">
              <button
                className="w-auto h-6 bg-black text-white text-xs px-3 py-1 rounded hover:bg-gray-700"
                type="submit"
              >
                Add
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsAdding(false);
                }}
                type="button"
                className="w-auto h-6 text-gray-500 hover:text-black text-xs px-3 py-1 rounded hover:bg-gray-200"
              >
                CLOSE
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateChecklistItemButton;
