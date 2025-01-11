import AllLists from "../components/AllLists";
const ListsPage = ({ lists, dispatchlist ,AllBoardsInfo}) => {
  return <AllLists lists={lists}  dispatchlist={dispatchlist}  AllBoardsInfo={AllBoardsInfo}/>;
};

export default ListsPage;
