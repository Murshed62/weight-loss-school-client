import React from 'react';
import { Link } from 'react-router-dom';

const ShowInstructor = ({inst}) => {
    const {_id,choose, email, instructor} = inst;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={choose} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">Instructor Name: {instructor}</h2>
          <p>{email}</p>
          <Link className="card-actions justify-end flex justify-center">
            <button className="btn btn-primary">Details</button>
          </Link>
        </div>
      </div>
    );
};

export default ShowInstructor;