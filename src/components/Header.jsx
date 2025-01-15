import { useNavigate } from "react-router-dom";
import TrelloLogo from "../assets/Trello-logo.png";

const Header = () => {
  const navigate = useNavigate();

  const navigateToBoard = () => {
    navigate("/");
  };

  return (
    <header className="w-full bg-blue-400">
      <div className="navbar">
        <div className="navbar-start">
          <button
            onClick={navigateToBoard}
            className="btn btn-outline btn-white mr-[39vw] ml-4 hover:bg-gray-700 hover:text-white hover:border-gray-400 text-gray-500"
          >
            All Boards
          </button>
        </div>
        <div className="navbar-center">
          <div className="w-[5rem] h-full">
            <img
              src={TrelloLogo}
              className="w-[120%] h-auto"
              alt="Trello Logo"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
