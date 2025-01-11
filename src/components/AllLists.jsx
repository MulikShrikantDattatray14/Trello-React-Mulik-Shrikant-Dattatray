import { useState } from "react";
import SingleList from "./SingleList";
import CreateListButton from "./cardCreatorButtons/CreateListButton";
import { useParams } from "react-router-dom";

const AllLists = ({ lists, AllBoardsInfo, dispatchlist }) => {
  const [isEditing, setIsEditing] = useState(false);

  let param = useParams();
  let BoardID = param.id;

  let BoardName = AllBoardsInfo.filter((element) => element.id === BoardID).map(
    (element) => element.name
  );
  //console.log(BoardName);

  return (
    <div className="w-full h-[95vh] bg-gray-700 z-100 relative flex flex-col gap-2">
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-200 p-4">
        <CreateListButton
          dispatchlist={dispatchlist}
          AllBoardsInfo={AllBoardsInfo}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          // listsUpdate={listsUpdate}
          lists={lists}
        />
      </div>

      <div className="fixed top-48 left-1/2 transform -translate-x-1/2 z-140 text-center w-auto">
        <h2 className="text-2xl font-bold text-white">{BoardName}</h2>
      </div>

      <div className="flex gap-2 overflow-x-auto pt-60">
        {lists.map((list) => (
          <SingleList key={list.id} list={list} dispatchlist={dispatchlist}/>
        ))}
      </div>
    </div>
  );
};

export default AllLists;
