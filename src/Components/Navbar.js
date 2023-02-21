import { Link } from "react-router-dom";

const onLogout = () => {
  console.log("Logging out");
  localStorage.removeItem("currentUser");
  window.location.reload();
};

const loggedOut = localStorage.getItem("currentUser") ? "hider" : "";

const loggedIn = localStorage.getItem("currentUser") ? "" : "hider";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Safe's Lifestyle Blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
      </div>

      <div className={loggedIn}>
        <Link
          to="/create"
          style={{
            color: "white",
            backgroundColor: "#f1356d",
            borderRadius: "8px",
          }}
        >
          New Blog
        </Link>
        <Link to="/" onClick={onLogout}>
          Logout
        </Link>
      </div>

      <div className={loggedOut}>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
