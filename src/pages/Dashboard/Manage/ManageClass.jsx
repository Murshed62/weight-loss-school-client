import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ManageClass = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  console.log(classes);

  const  handleFeedback= (clss) => {
    console.log(clss);
    Swal.fire({
      title: "Send Feedback",
      icon: "info",
      html: '<input type="text" id="feedbackInput" placeholder="Enter your feedback" class="input bg-emerald-300 w-full max-w-xs border-error">',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Send",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const feedback = document.getElementById("feedbackInput").value;
        console.log(feedback)
  
  
        fetch(`https://weight-loss-school-server.vercel.app/classesFeedback/${clss}`,{
          method:'PUT',
          headers:{
              'content-type': 'application/json'
          },
          body:JSON.stringify({feedback})
        })
        .then(res=>res.json())
        .then(data=>{
  console.log(data);
          if(data?.modifiedCount > 0){
              //  update state 
            //  const remaining=classes.filter(cls => cls._id !== id)
            //  console.log(remaining);
            //  const updated=classes.find(cls=> cls._id === id);
            //  console.log(updated);
            //  updated.status='denied'
            //  const newClasses=[updated,...remaining];
            //  setClasses(newClasses)
          }
        })
      }
    });
  
  };

  useEffect(() => {
    fetch(`https://weight-loss-school-server.vercel.app/addclass`)
      .then(res => res.json())
      .then(data => setClasses(data))
  }, [])

  // approval status function 


  const handleStatus = id => {
    
    fetch(`https://weight-loss-school-server.vercel.app/addclass/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ status: "approved" })
    })
      .then(res => res.json())
      .then(data => {
        
        if (data?.modifiedCount > 0) {
          //  update state 
          const remaining = classes.filter(classes => classes._id !== id)
          const updated = classes.find(classes => classes._id === id);
          updated.status = 'approved'
          const newClasses = [updated, ...remaining];
          setClasses(newClasses);
        }
      })
  }

  const handleDenied = id => {
    
    fetch(`https://weight-loss-school-server.vercel.app/addclass/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ status: "denied" })
    })
      .then(res => res.json())
      .then(data => {
        
        if (data?.modifiedCount > 0) {
          //  update state 
          const remaining = classes.filter(classes => classes._id !== id)
          const updated = classes.find(classes => classes._id === id);
          updated.status = 'denied'
          const newClasses = [updated, ...remaining];
          setClasses(newClasses);
        }
      })
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-orange-500 font-bold text-center text-3xl mt-2">Manage Classes</h1>
      <div>
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">This modal works with a hidden checkbox!</p>
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>
</div>
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
            <th>Action Approve</th>
            <th>Action Denied</th>
            <th>Status</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            classes.map((perClass, index) => (<tr>
              <th>
                {index + 1}
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
                <span>{perClass?.name}</span>
              </td>
              <td>{perClass?.seats}</td>


              <td>{perClass?.price}</td>
              <td>
                {perClass?.status === 'approved' ? <span className="rounded-lg p-2 bg-orange-200 btn btn-ghost btn-xs">approved</span> : <button onClick={() => handleStatus(perClass._id)} className="btn btn-ghost bg-orange-400 btn-xs">
                  Approved
                </button>}
              </td>
              <td>
                {perClass.status === 'denied' ? <span className="rounded-lg p-2 bg-red-200 btn btn-ghost btn-xs">Denied</span> : <button onClick={() => handleDenied(perClass._id)} className="btn btn-ghost bg-red-400 btn-xs">
                  Denied
                </button>}
              </td>
              <td className="font-bold uppercase">{perClass.status}</td>
              <th>
                 <button  htmlFor="my_modal_6" onClick={()=>handleFeedback(perClass._id)} className="btn btn-ghost text-white bg-[#48b5f0] hover:bg-blue-500 btn-xs">
                    feedback 
                  </button>

                </th>
            </tr>))
          }

        </tbody>
      </table>
    </div>
  );
};

export default ManageClass;