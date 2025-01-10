import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SingleCard from "./SingleCard";
import { fetchCards } from "../services/apiCalls";
import CreateCardButton from "./cardCreatorButtons/CreateCardButton";
import { archiveListById } from "../services/apiCalls";

const SingleList = ({ list, setLists }) => {
  
  const [cards, setCards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchAndSetCards = async () => {
      try {
        let cardsData = await fetchCards(list.id);
        setCards(cardsData);
      } catch {
        toast.error("Error could not fetch cards for the given list");
      }
    };
    fetchAndSetCards();
  }, [list.id]);

  const handleArchiveList = async (e) => {
    setLists((prev) => prev.filter((item) => item.id !== e.target.id));
    toast.success("List Deleted Successfully");
    await archiveListById(e.target.id);
  };

  return (
    <div className="relative mb-40">
      <div className="card w-80 bg-white shadow-xl">
        <div className="card-body flex flex-col items-center">
         
          <div className="w-full text-center mb-4">
            <h2 className="text-xl font-bold">{list.name}</h2>
            <button
              id={list.id}
              className="absolute top-0 right-0 text-black hover:text-white hover:bg-black p-2 rounded-full border-2 border-gray-500 hover:border-white"
              onClick={(e) => handleArchiveList(e)}
            >
              DELETE
            </button>
          </div>
        
          <div className="w-full flex flex-col items-center">
            {cards.map((card) => (
              <SingleCard key={card.id} card={card} setCards={setCards} />
            ))}
          </div>
        </div>

       
        <CreateCardButton
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          setCards={setCards}
          list={list}
        />
      </div>
    </div>
  );
};

export default SingleList;
