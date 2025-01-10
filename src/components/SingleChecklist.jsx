import { useState } from "react";
import { toast } from "react-toastify";
import {
  updateChecklistItemById,
  deleteChecklistById,
  deleteChecklistItemById,
} from "../services/apiCalls";
import CreateChecklistItemButton from "./cardCreatorButtons/CreateChecklistItemButton";

const SingleChecklist = ({ checklist, setCheckLists }) => {
  const [checkItems, setCheckItems] = useState(checklist.checkItems);
  const [isAdding, setIsAdding] = useState(false);

  const calculateCompletionPercentage = () => {
    const completedCount = checkItems.filter(
      (item) => item.state === "complete"
    ).length;

    if ((completedCount / checkItems.length) * 100) {
      return (completedCount / checkItems.length) * 100;
    }
    return 0;
  };

  const toggleItemState = (currentState) => {
    return currentState === "complete" ? "incomplete" : "complete";
  };

  const updateChecklistItem = (itemId, newState, checklist) => {
    updateChecklistItemById(itemId, newState, checklist);
  };

  const updateCheckItemsState = (checkItems, itemId, newState) => {
    return checkItems.map((item) =>
      item.id === itemId ? { ...item, state: newState } : item
    );
  };

  const handleCheckboxChange = (itemId) => {
    setCheckItems((prevItems) => {
      const itemToUpdate = prevItems.find((item) => item.id === itemId);
      if (!itemToUpdate) return prevItems;

      const newState = toggleItemState(itemToUpdate.state);
      updateChecklistItem(itemId, newState, checklist);

      return updateCheckItemsState(prevItems, itemId, newState);
    });
  };

  const handleDeleteChecklist = (e) => {
    setCheckLists((prev) => prev.filter((item) => item.id !== e.target.id));
    toast.success("Checklist deleted");
    deleteChecklistById(e.target.id);
  };

  const handleDeleteChecklistItem = (e) => {
    setCheckItems((prev) => prev.filter((item) => item.id !== e.target.id));
    toast.success("ChecklistItem deleted");
    deleteChecklistItemById(checklist.id, e.target.id);
  };

  return (
    <div className="w-[90%] my-8 relative border border-gray-300 p-4 rounded-lg shadow-lg">
      {" "}
      <div className="text-xl font-semibold">
        <i className="fas fa-check-square text-gray-500 mr-3"></i>
        {checklist.name}
      </div>
      <button
        id={checklist.id}
        onClick={handleDeleteChecklist}
        className="absolute top-0 right-0 text-xs text-black hover:text-white hover:bg-black border-2 border-gray-500 p-2 rounded-full"
      >
        DELETE
      </button>
      <div className="my-2">
        <progress
          className="progress w-full h-2 bg-gray-200 rounded-full"
          value={calculateCompletionPercentage()}
          max="100"
        ></progress>
      </div>
      <div className="text-sm text-gray-500 mb-3">
        {Math.round(calculateCompletionPercentage())}% completed
      </div>
      {checkItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center mb-2 relative border-2 border-gray-300 rounded p-2"
        >
          <input
            type="checkbox"
            checked={item.state === "complete"}
            onChange={() => handleCheckboxChange(item.id)}
            className="checkbox checkbox-primary mr-3"
          />
          <span className="flex-grow">{item.name}</span>

          <button
            id={item.id}
            onClick={handleDeleteChecklistItem}
            className="absolute top-0 right-0 text-xs text-black hover:text-white hover:bg-black border-2 border-gray-500 p-2 rounded-full"
          >
            DELETE
          </button>
        </div>
      ))}
      <CreateChecklistItemButton
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        setCheckItems={setCheckItems}
        checklist={checklist}
      />
    </div>
  );
};

export default SingleChecklist;
