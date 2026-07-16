import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ searchInput, setSearchInput, setSearchQuery}){

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
                    <Link className="nav-link" to="/preferences">Preferences</Link>
                    <Link className="nav-link" to="/likes">Likes</Link>
                </div>
                <div className="navbar-search">
                    <input
                        type="text"
                        placeholder="Search news.."
                        value={searchInput}
                        onChange={(e)=> setSearchInput(e.target.value)}
                        onKeyDown={(e)=>{
                            if(e.key==="Enter"){
                                setSearchQuery(searchInput);
                            }
                        }}
                    />
                </div>
            </nav>
        </>
    );
}

export default Navbar;