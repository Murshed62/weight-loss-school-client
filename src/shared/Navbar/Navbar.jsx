import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const {user, logOut} = useAuth();

  const handleLogOut = ()=>{
    logOut()
    
  }

    const navOptions = <>
    <li><Link className="font-semibold text-2xl" to="/">Home</Link></li>
    <li><Link className="font-semibold text-2xl" to="/instructors">Instructors</Link></li>
    <li><Link className="font-semibold text-2xl" to="/classes">Classes</Link></li>
    <li><Link className="font-semibold text-2xl" to="/dashboard">Dashboard</Link></li>
    <li><Link className="font-semibold text-2xl" to="/classes">Classes</Link></li>
    
</>

    return (
        <div className="navbar">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
       {navOptions}
      </ul>
    </div>
    <Link className="btn btn-ghost normal-case text-xl"><span className="text-orange-500">SlimFit</span> <span className="text-[#fd1d1d]">Academy</span></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navOptions}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user?.displayName ? (
        <span className="w-14 rounded-full">
          <img className="rounded-full w-2/3" src={user.photoURL} title={user?.displayName} alt="" />
        </span>
      ) : (
        ""
      )
    }
    {
      user ? (
        <Link
        to="/login"
        onClick={handleLogOut}
        className="btn font-bold bg-orange-500 hover:bg-orange-600 border-none text-white"
        >Logout</Link>
      ) : (
        <div>
            <Link
              to="/login"
              className="font-bold mr-3 mb-1 bg-orange-500 border-none  hover:bg-orange-600 forMblLink py-3 px-4 rounded text-white mobile-login"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="font-bold mobile-register bg-orange-500 border-none hover:bg-orange-600 forMblLink py-3 px-4 rounded text-white"
            >
              Register
            </Link>
          </div>
      )
    }
    
  </div>
</div>
    );
};

export default Navbar;