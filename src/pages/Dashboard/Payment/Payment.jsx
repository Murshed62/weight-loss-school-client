import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Payment = () => {
    const {id} = useParams();
    const [paymentData, setPaymentData] = useState({})
    useEffect(() => {
        if (id) {
          fetch(`http://localhost:5000/selectedClass/${id}`)
            .then(res => res.json())
            .then(data => {
              setPaymentData(data);
            
            })
            .catch(error => {

             
            });
        }
      }, []);
    return (
        <div>
            <h1>Payment page</h1>
        </div>
    );
};

export default Payment;