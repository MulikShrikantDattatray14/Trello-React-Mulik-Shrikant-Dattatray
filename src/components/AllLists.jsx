import { useState } from "react";
import SingleList from "./SingleList";
import CreateListButton from "./cardCreatorButtons/CreateListButton";
import { useParams } from "react-router-dom";

const AllLists = ({ lists, listsUpdate, AllBoardsInfo }) => {
  const [isEditing, setIsEditing] = useState(false);

  let param = useParams();
  let BoardID = param.id;

  let BoardName = AllBoardsInfo.filter((element) => element.id === BoardID).map(
    (element) => element.name.toUpperCase()
  );
  //console.log(typeof BoardName)
  //BoardName= BoardName.toUpperCase() 

  return (
    <div className="w-full h-[95vh] bg-white z-100 relative flex flex-col gap-2 p-8 shadow-lg ">
      <div className="flex justify-center p-2 ">
        <CreateListButton
          AllBoardsInfo={AllBoardsInfo}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          listsUpdate={listsUpdate}
          lists={lists}
        />
      </div>

      <div className="text-center">
        <h2 className="text-4xl font-bold text-black p-4">
          {BoardName}
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto  pt-5 p-0 shadow-lg P-2">
        {lists.map((list) => (
          <SingleList key={list.id} list={list} setLists={listsUpdate} />
        ))}
      </div>
    </div>
  );
};

export default AllLists;
