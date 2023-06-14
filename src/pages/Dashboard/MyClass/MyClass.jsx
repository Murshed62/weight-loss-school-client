import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyClass = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`https://weight-loss-school-server.vercel.app/addclass?email=${user?.email}`)
      .then(res => res.json())
      .then(data => setClasses(data))
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <th>#</th>
            </th>
            <th>Class Image</th>
            <th>Class Name</th>
            <th>Seat</th>
            <th>Enrolled Student</th>
            <th>Price</th>
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

              <td></td>
              <td>{perClass?.price}</td>
              <td>{perClass?.status}</td>
              <td></td>
            </tr>))
          }

        </tbody>
      </table>
    </div>
  );
};

export default MyClass;