import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useStudent from "../hooks/useStudent";


const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();
  console.log(isInstructor);
  console.log(isAdmin);


  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center mt-5">
        {/* Page content here */}
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"></label>

      </div>


      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {isAdmin ? (<><li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='manageclass'>Manage Classes</Link></li>
            <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='allusers'>Mange Users</Link></li></>): isInstructor ? (
            <>
              
              <Link to="addaclass"> <li className="btn bg-orange-500 font-bold text-white hover:bg-orange-600 w-full">
                Add a Class
              </li></Link>
              <Link to='myclasses'> <li className="btn bg-orange-500 font-bold text-white hover:bg-orange-600 w-full">
                My Classes
              </li></Link>
            </>): 
              isStudent && (<>
              <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='myselectedclass'>My Selected Classes</Link></li>
            <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link>My Enrolled Classes</Link></li>
              </>)
            }
          
          

          {/*Instructor part  */}

          


          
          <div className="divider"></div>
          <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='/'>Home</Link></li>
          <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='/dashboard/instructors'>Instructors</Link></li>
          <li className="bg-orange-400 mb-3 text-white font-bold rounded hover:bg-orange-500"><Link to='classes'>Classes</Link></li>
        </ul>

      </div>
    </div>
  );
};

export default Dashboard;