import { Link } from "react-router-dom";

const Navbar = (props) => {
    const { loggedIn } = props;

    return (
        <div className="navLinks">
            { loggedIn ? <div></div> : <Link to="NewUser"> Sign Up </Link> }
            { loggedIn ? <div></div> : <Link to="/Login"> Sign In </Link> }
            <Link to="/"> Posts </Link>
            <Link to="/Home"> Home </Link>
            { !loggedIn ? <div></div> : <Link to="/Profile"> Profile </Link>}
            { !loggedIn ? <div></div> : <Link to="/Logout"> Logout </Link>}
        </div>
    )
}

export default Navbar;
