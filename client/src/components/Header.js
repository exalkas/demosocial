import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "./Context";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axios.post("/users/logout");
    console.log("🚀 ~ response:", response.data);

    dispatch({ type: "LOGOUT" });

    // logout()
    navigate("/");
  };

  return (
    <div
      className="bg-teal-500 text-white 
        w-full h-[100px] flex justify-center 
        items-center gap-[20px] text-[2rem]  cursor-pointer"
    >
      <Link to="/dashboard">
        <FaHome />
      </Link>
      <Link to="/profile">
        <CgProfile className="hover:text-slate-600" />
      </Link>
      <FiLogOut
        className="hover:text-slate-600 cursor-pointer"
        onClick={handleLogout}
      />
    </div>
  );
}

export default Header;
