import {
  FaHome,
  FaPollH,
  FaEyeDropper,
  FaArchive,
  FaUserFriends,
  FaGift,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/portfolios", icon: <FaPollH />, label: "Portfolios" },
    { path: "/portfoliosv2", icon: <FaPollH />, label: "Portfolios v2" },
    { path: "/experimentals", icon: <FaEyeDropper />, label: "Experimentals" },
    { path: "/slack-archives", icon: <FaArchive />, label: "Slack Archives" },
    { path: "/refer", icon: <FaUserFriends />, label: "Refer a friend" },
    { path: "/gift", icon: <FaGift />, label: "Gift a subscription" },
    { path: "/account", icon: <FaUser />, label: "Account" },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="../../public/logo.svg" height={50} width={50} alt="logo" />
        <h2>
          Capitalmind <span>Premium</span>
        </h2>
      </div>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${
            location.pathname === item.path ? "active" : ""
          }`}
        >
          <span>{item.icon}</span> {item.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
