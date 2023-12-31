import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useStudent from "../hooks/useStudent";
import useAuth from "../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";


const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();
  const {user, logOut} = useAuth();
  
  const handleLogOut = ()=>{
    logOut()
    
  }
  


  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="btn bg-orange-400 drawer-button lg:hidden font-bold text-2xl hover:bg-orange-500">Open</label>

      </div>


      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full  text-base-content">
        <div className="avatar online mx-auto mb-5 border-4 border-orange-300 rounded-full p-1">
  <div className="w-20 rounded-full">
    <img src={user?.photoURL} />
  </div>
</div>
          {/* Sidebar content here */}
          {isAdmin ? (<><li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='manageclass'>Manage Classes</Link></li>
            <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='allusers'>Mange Users</Link></li></>) : isInstructor?.instructor ? (
              <>

                <Link to="addaclass"> <li className="btn bg-orange-500 font-bold text-white hover:bg-orange-600 w-full">
                  Add a Class
                </li></Link>
                <Link to='myclasses'> <li className="btn bg-orange-500 font-bold text-white hover:bg-orange-600 w-full">
                  My Classes
                </li></Link>
              </>) :
            isStudent && (<>
              <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='myselectedclass'>My Selected Classes</Link></li>
              <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to="enrollstudent">My Enrolled Classes</Link></li>
              <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to="paymenthistory">My Payment History</Link></li>
            </>)
          }



          {/*Instructor part  */}





          <div className="divider"></div>
          <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='/'>Home</Link></li>
          <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='/instructors'>Instructors</Link></li>
          <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='/classes'>Classes</Link></li>
          <li className="btn bg-orange-500 w-1/2 hover:bg-orange-600 mx-auto mt-10 text-white"><Link
        to="/login"
        onClick={handleLogOut}
        className="btn w-full font-bold text-2xl bg-orange-500 hover:bg-orange-600 border-none text-white"
        >Log Out <FiLogOut></FiLogOut></Link></li>
        </ul>
          
      </div>
    </div>
  );
};

export default Dashboard;