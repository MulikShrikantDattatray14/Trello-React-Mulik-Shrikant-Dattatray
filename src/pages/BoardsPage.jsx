import BoardsList from "../components/BoardsList";

const BoardsPage = ({ boards, listsUpdate, lists,remainingBoards,dispatchBoards ,dispatchlist}) => {
  return (
    <BoardsList
    dispatchlist={dispatchlist}
    dispatchBoards={dispatchBoards}
    remainingBoards={remainingBoards}
      boards={boards}
      //setLists={listsUpdate}
      lists={lists}
    />
  );
};

export default BoardsPage;
