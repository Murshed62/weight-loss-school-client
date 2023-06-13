import { useEffect, useState } from "react";
import ShowInstructor from "../../components/ShowInstructor/ShowInstructor";


const insts = () => {
    const [insts, setinst] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/addclass')
        .then(res=>res.json())
        .then(data=>setinst(data))
    },[])
console.log(insts);
    return (
        <div>
            <h1 className="text-center text-3xl font-bold text-orange-400 mb-5">Our Instructor</h1>       
            {
                insts.map(inst=><ShowInstructor
                    key={inst._id}
                    inst={inst}
                    ></ShowInstructor>)
            }     
        </div>
    );
};

export default insts;