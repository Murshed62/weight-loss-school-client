import { useEffect, useState } from "react";
import ShowClass from "../../components/ShowClass/ShowClass";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useInstructor from "../../hooks/useInstructor";
import useAdmin from "../../hooks/useAdmin";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const {user} = useAuth();

    useEffect(() => {
        fetch("http://localhost:5000/addclass")
          .then((res) => res.json())
          .then((data) => {
            const newData = data.filter(
              (classAll) => classAll?.status === "approved"
            );
    
            setClasses(newData);
          });
      }, []);

      const handleEnroll = (enroll) => {
        const{AvailableSeat,className,email,image,name,price,student,ClassId}=enroll
   
        const saveClassData={ ClassId,AvailableSeat,className,email,image,name,price,student
        }

   
   if(isAdmin || isInstructor?.instructor){
toast.error("Don't permission Select class")
  //  alert('hbe na')
 
   }else{
    if (user) {
      fetch("http://localhost:5000/selected", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveClassData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login to enroll the class",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
   }
   
  };
    
    return (
        <div>
            <h1 className="text-center font-bold text-orange-400 text-3xl">Enroll Classes</h1> 
            {classes.map((cls) => (
          <ShowClass
            key={cls._id}
            handleEnroll={handleEnroll}
            cls={cls}
          ></ShowClass>
        ))}         
        </div>
    );
};

export default Classes;