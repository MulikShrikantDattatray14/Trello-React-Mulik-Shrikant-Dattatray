import BoardsList from "../components/BoardsList";

const BoardsPage = ({ boards, boardsUpdate, listsUpdate, lists,remainingBoards, }) => {
  return (
    <BoardsList
   
    remainingBoards={remainingBoards}
      boardsUpdate={boardsUpdate}
      boards={boards}
      setLists={listsUpdate}
      lists={lists}
    />
  );
};

export default BoardsPage;
