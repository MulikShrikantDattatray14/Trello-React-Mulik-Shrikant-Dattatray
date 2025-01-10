import { useState } from "react";
import { createNewChecklist } from "../../services/apiCalls";
import { toast } from "react-toastify";

const CreateChecklistButton = ({
  isAdding,
  setIsAdding,
  setCheckLists,
  card,
}) => {
  const handleAddNewChecklist = async (e) => {
    try {
      let newChecklist = await createNewChecklist(
        e.target.checklistName.value,
        card.id
      );
      setCheckLists((prev) => [...prev, newChecklist]);
      toast.success("New Checklist created");
      setIsAdding(false);
    } catch {
      toast.error("Error: Could not create new checklist");
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      {" "}
     
      {!isAdding && (
        <div
          className="absolute top-4 right-4 w-[150px] py-1 px-2 border border-gray-300 rounded cursor-pointer mx-auto flex justify-center items-center text-sm hover:bg-gray-200 bg-white shadow-lg z-50" 
          onClick={(e) => {
            e.stopPropagation();
            setIsAdding(true);
          }}
        >
          Add New Checklist
        </div>
      )}
      {isAdding && (
       <div className="relative flex flex-col mb-4 text-center mt-[-20px] ml-[-10px]"> 
      
       <form
         onSubmit={(e) => {
           e.preventDefault();
           handleAddNewChecklist(e);
         }}
       >
         <input
           className="w-[70%] p-2 mb-2 bg-white border border-gray-300 rounded hover:border-black mx-auto"
           name="checklistName"
           type="text"
           placeholder="Enter Checklist Name"
         />
     
        
         <div className="flex justify-between mt-4">
           <button
             className="w-[80%] h-8 bg-black text-white px-4 rounded hover:bg-gray-700 mx-auto" 
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
             className="w-[80%] h-8 bg-gray-300 text-gray-700 px-4 rounded hover:bg-black hover:text-white mx-auto" 
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

export default CreateChecklistButton;
