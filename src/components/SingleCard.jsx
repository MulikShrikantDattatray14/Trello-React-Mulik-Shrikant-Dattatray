import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SingleChecklist from "./SingleChecklist";
import { fetchChecklists } from "../services/apiCalls";
import CreateChecklistButton from "./cardCreatorButtons/CreateChecklistButton";
import { deleteCardById } from "../services/apiCalls";

const SingleCard = ({ card, setCards }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkLists, setCheckLists] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchChecklists(card.id);
  }, [card.id]);

  const handleOpenDialog = async () => {
    setIsOpen(true);
    const checkListData = await fetchChecklists(card.id);
    setCheckLists(checkListData);
  };
  const handleCloseDialog = () => setIsOpen(false);

  const handleDeleteCard = async (e) => {
    setCards((prev) => prev.filter((item) => item.id !== e.target.id));
    toast.success("Card deleted");
    await deleteCardById(e.target.id);
  };

  return (
    <>
      <div
        onClick={handleOpenDialog}
        className="my-2 cursor-pointer relative border-1 border-black mb-15"
      >
        <div className="card w-[320px] h-[65px] bg-white shadow-md hover:shadow-lg hover:border-2 hover:border-gray-400">
          <div className="card-body relative p-2">
            <h3 className="text-lg font-semibold">{card.name}</h3>
            <button
              id={card.id}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCard(e);
              }}
              className="absolute top-0 right-0 text-xs p-1 text-black-300 hover:text-white hover:bg-black  border-2 border-black hover:border-white mb-10"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>

      <div
        className={`modal ${isOpen ? "modal-open" : ""}`}
        onClick={handleCloseDialog}
      >
        <div
          className="modal-box relative w-[1400px] h-[900px]"
          onClick={(e) => e.stopPropagation()}
        >
         
          <div className="absolute top-4 right-4">
            <CreateChecklistButton
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              setCheckLists={setCheckLists}
              card={card}
            />
          </div>

         
          <h3 className="text-2xl font-semibold mb-4">{card.name}</h3>

          
          <div className="overflow-y-auto h-[700px] mt-4">
            {checkLists.map((checklist) => (
              <SingleChecklist
                key={checklist.id}
                checklist={checklist}
                setCheckLists={setCheckLists}
              />
            ))}
          </div>

          
          <div className="absolute bottom-4 right-4">
            <button className="btn btn-primary" onClick={handleCloseDialog}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
