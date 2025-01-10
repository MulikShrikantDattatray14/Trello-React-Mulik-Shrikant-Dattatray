import { useState } from "react";
import { toast } from "react-toastify";
import { createNewCard } from "../../services/apiCalls";

const CreateCardButton = ({ isAdding, setIsAdding, setCards, list }) => {
  const handleAddNewCard = async (e) => {
    try {
      let newCard = await createNewCard(e.target.cardName.value, list);
      setCards((prev) => [...prev, newCard]);
      toast.success("New Card created");
      setIsAdding(false);
    } catch {
      toast.error("Error: Could not create card");
    }
  };

  return (
    <div>
      {!isAdding && (
        <div
          className="w-4/5 border-2 border-gray-300 mt-6 mb-6 py-2 rounded-lg cursor-pointer mx-auto flex justify-center items-center text-black hover:bg-black hover:text-white" // Updated border thickness and rounded corners
          onClick={(e) => {
            e.stopPropagation();
            setIsAdding(true);
          }}
        >
          Add New Card
        </div>
      )}
      {isAdding && (
        <div className="relative flex flex-col mb-4 text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNewCard(e);
            }}
          >
            <input
              className="w-4/5 p-2 mb-2 bg-white border border-gray-300 rounded"
              name="cardName"
              type="text"
              placeholder="Enter Card Name"
            />
            <div className="flex justify-between mt-4 px-2">
              <button
                className="w-auto h-8 bg-black text-white px-4 rounded"
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

export default CreateCardButton;
