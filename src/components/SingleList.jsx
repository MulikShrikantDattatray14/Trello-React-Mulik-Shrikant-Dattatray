import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SingleCard from "./SingleCard";
import { fetchCards } from "../services/apiCalls";
import CreateCardButton from "./cardCreatorButtons/CreateCardButton";
import { archiveListById } from "../services/apiCalls";
import { MdDelete } from "react-icons/md";
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
  }, []);

  const handleArchiveList = async (e) => {
    setLists((prev) => prev.filter((item) => item.id !== e.target.id));
    toast.success("List Deleted Successfully");
    await archiveListById(e.target.id);
  };

  return (
    <div className="relative mb-40 shadow-lg hover:border-2 hover:border-black">
      <div className="card w-80 bg-white shadow-xl">
        <div className="card-body flex flex-col items-center">
          <div className="w-full text-center mb-4">
            <h2 className="text-xl text-center font-bold">
              {typeof list.name === "string" ? list.name.toUpperCase() : ""}
            </h2>

            <button
              id={list.id}
              className="absolute top-0 right-0 text-black hover:text-white hover:bg-black p-2   hover:border-white m-1 p-2"
              onClick={(e) => handleArchiveList(e)}
            >
              x
            </button>
          </div>

          <div className="w-3/5 flex flex-col items-center ">
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
