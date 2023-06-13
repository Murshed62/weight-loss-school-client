import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const ManageClass = () => {
    const {user} = useAuth();
    const [classes, setClasses] = useState([]);
  
    useEffect(()=>{
      fetch(`http://localhost:5000/addclass`)
      .then(res=>res.json())
      .then(data=>setClasses(data))
    },[])

    // approval status function 


  const handleStatus=id=>{
   console.log(id);
   fetch(`http://localhost:5000/addclass/${id}`,{
    method:'PATCH',
    headers:{
        'content-type': 'application/json'
    },
    body:JSON.stringify({status:"approved"})
  })
  .then(res=>res.json())
  .then(data=>{
   console.log(data);
    if(data?.modifiedCount > 0){
        //  update state 
       const remaining=classes.filter(classes => classes._id !== id)
       const updated=classes.find(classes=> classes._id === id);
       updated.status='approved'
       const newClasses=[updated,...remaining];
       setClasses(newClasses);
    }
  })
    }

  const handleDenied=id=>{
   console.log(id);
   fetch(`http://localhost:5000/addclass/${id}`,{
    method:'PATCH',
    headers:{
        'content-type': 'application/json'
    },
    body:JSON.stringify({status:"denied"})
  })
  .then(res=>res.json())
  .then(data=>{
   console.log(data);
    if(data?.modifiedCount > 0){
        //  update state 
       const remaining=classes.filter(classes => classes._id !== id)
       const updated=classes.find(classes=> classes._id === id);
       updated.status='denied'
       const newClasses=[updated,...remaining];
       setClasses(newClasses);
    }
  })
    }

    return (
        <div className="overflow-x-auto">
            <h1 className="text-orange-500 font-bold text-center text-3xl">Manage Classes</h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <th>#</th>
              </th>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
           {
            classes.map((perClass, index)=>( <tr>
              <th>
                {index+1}
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={perClass.choose} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  
                </div>
              </td>
              <td>
                <span>{perClass.name}</span>
              </td>
              <td>{perClass.seats}</td>
              
              
              <td>{perClass.price}</td>
              <td>
                 {perClass.status ==='approved'? <span className= "rounded-lg p-2 bg-[#ff4d6d] btn btn-ghost btn-xs">approved</span> :<button onClick={()=>handleStatus(perClass._id)} className="btn btn-ghost bg-[#FFAEBC] btn-xs">
                    {perClass.status}
                  </button>}
                </td>
              <td>
                 {perClass.status ==='denied'? <span className= "rounded-lg p-2 bg-[#ff4d6d] btn btn-ghost btn-xs">Denied</span> :<button onClick={()=>handleDenied(perClass._id)} className="btn btn-ghost bg-[#7cd9a7] btn-xs">
                    {perClass.status}
                  </button>}
                </td>
             
            </tr>))
           }
           
          </tbody>     
        </table>
      </div>
    );
};

export default ManageClass;