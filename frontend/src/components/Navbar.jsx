import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(){

    return(
        <>
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/">NewsWise AI</Link>
                </div>
                <div className="navbar-links">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/bookmarks">Bookmarks</Link>
                    <Link className="nav-link" to="/profile">Profile</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                </div>
                <div className="navbar-search">
                    <input
                        type="text"
                        placeholder="Search news.."
                    />
                </div>
            </nav>
        </>
    );
}

export default Navbar;