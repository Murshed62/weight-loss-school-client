import { useEffect, useState } from "react";
import ShowInstructor from "../../components/ShowInstructor/ShowInstructor";


const instructors = () => {
    const [instructor, setInstructor] = useState([]);

    useEffect(() => {
        fetch('https://weight-loss-school-server.vercel.app/popularinstructor')
            .then(res => res.json())
            .then(data => setInstructor(data))
    }, [])
    
    return (
        <div>
            <h1 className="text-center text-3xl font-bold text-orange-400 mb-5">Our Instructors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
                {
                    instructor.map(inst => <ShowInstructor
                        key={inst._id}
                        inst={inst}
                    ></ShowInstructor>)
                }
            </div>
        </div>
    );
};

export default instructors;