import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FcFeedback } from 'react-icons/fc';

const MyClass = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);

  const [feedbackData, setFeedbackData] = useState(null);

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

            
              <td>{perClass?.price}</td>
              <td>{perClass?.status}</td>
              
              <td>
                  <label
                    htmlFor="my_modal_6"
                    className="btn bg-orange-300 hover:bg-orange-500 px-2 py-1 rounded-sm"
                    onClick={() =>
                      setFeedbackData(
                        perClass.feedback ? perClass.feedback : "No Feedback"
                      )
                    }
                  >
                    <FcFeedback className="text-2xl"></FcFeedback>
                  </label>

                  <input
                    type="checkbox"
                    id="my_modal_6"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box">
                      <p className="py-4 border-emerald-600 border-2 rounded-xl px-3">
                        {feedbackData}
                      </p>
                      <div className="modal-action">
                        <label
                          htmlFor="my_modal_6"
                          className="btn bg-emerald-500 hover:bg-emerald-700"
                        >
                          Close!
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
            </tr>))
          }

        </tbody>
      </table>
    </div>
  );
};

export default MyClass;