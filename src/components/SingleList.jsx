import { useState, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import SingleCard from "./SingleCard";
import { fetchCards } from "../services/apiCalls";
import CreateCardButton from "./cardCreatorButtons/CreateCardButton";
import { archiveListById } from "../services/apiCalls";

let cardsInititalstate = {
  cards: [],
};

let cardsReducer = (state, action) => {
  switch (action.type) {
    case "fetchCards":
      return { cards: action.cardsData };

    case "addCards":
      let newCardLists = [...state.cards, action.newCard];
      return { cards: newCardLists };
    //setCards((prev) => [...prev, newCard]);

    case "deleteCards":
      let updatedCards = [...state.cards].filter(
        (item) => item.id !== action.e.target.id
      );
      return { cards: updatedCards };
    //setCards((prev) => prev.filter((item) => item.id !== e.target.id));
  }
};

const SingleList = ({ list, dispatchlist }) => {
  // const [cards, setCards] = useState([]);
  const [cards, dispatchCards] = useReducer(cardsReducer, cardsInititalstate);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchAndSetCards = async () => {
      try {
        let cardsData = await fetchCards(list.id);
        dispatchCards({ type: "fetchCards", cardsData: cardsData });
        //setCards(cardsData);
      } catch {
        toast.error("Error could not fetch cards for the given list");
      }
    };
    fetchAndSetCards();
  }, [list.id]);

  const handleArchiveList = async (e) => {
    dispatchlist({ type: "deleteLists", e: e });
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
              className="absolute top-0 right-0 text-black hover:text-white hover:bg-black p-2 rounded-lg border-2 border-gray-500 hover:border-white"
              onClick={(e) => handleArchiveList(e)}
            >
              DELETE
            </button>
          </div>

          <div className="w-full flex flex-col items-center">
            {cards.cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                dispatchCards={dispatchCards}
              />
            ))}
          </div>
        </div>

        <CreateCardButton
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          dispatchCards={dispatchCards}
          list={list}
        />
      </div>
    </div>
  );
};

export default SingleList;
