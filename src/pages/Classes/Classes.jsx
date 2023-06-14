import { useEffect, useState } from "react";
import ShowClass from "../../components/ShowClass/ShowClass";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useInstructor from "../../hooks/useInstructor";
import useAdmin from "../../hooks/useAdmin";
import { toast } from "react-hot-toast";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const { user } = useAuth();
  



  useEffect(() => {
    fetch("https://weight-loss-school-server.vercel.app/addclass")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filter(
          (classAll) => classAll?.status === "approved"
        );

        setClasses(newData);
      });
  }, []);

  

  const handleEnroll = (enroll) => {
    const { AvailableSeat, className, email, image, name, price, student, ClassId } = enroll

    const saveClassData = {
      ClassId, AvailableSeat, className, email, image, name, price, student
    }


    if (isAdmin || isInstructor?.instructor) {

      toast.error("Don't permission Select class")

    } else {
      if (user) {
        fetch("https://weight-loss-school-server.vercel.app/selected", {
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
      <h1 className="text-center font-bold text-orange-400 text-3xl mb-5">Enroll Classes</h1>
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
        {classes.map((cls) => (

          <ShowClass
            key={cls._id}
            handleEnroll={handleEnroll}
            cls={cls}


          ></ShowClass>

        ))}
      </div>
    </div>
  );
};

export default Classes;