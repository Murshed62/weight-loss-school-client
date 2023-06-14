import React, { useEffect, useState } from 'react';

const PaymentHistory = () => {
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(() => {
        fetch('https://weight-loss-school-server.vercel.app/payments')
            .then(res => res.json())
            .then(data => setPaymentHistory(data))
    }, [])
    
    return (
        <div>
            <h1 className='text-center font-bold text-orange-400 text-3xl mb-5 mt-2'>My Payment History</h1>
            <div className="overflow-x-auto">

                <table className="table">
                    {/* totalEnrolledStudent > 0 ? totalEnrolledStudent : */}
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Student Email</th>
                            <th>Instructor Name</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* row 1 */}
                        {
                            paymentHistory?.map((ph, index) => (<tr>
                                <td>
                                    {index + 1}
                                </td>

                                <td>{ph?.payment?.student}</td>
                                <td>{ph?.payment.name}</td>
                                <td>{ph?.transactionId}</td>
                                <td>{ph?.date}</td>
                                <td>{ph?.status}</td>

                            </tr>))
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;