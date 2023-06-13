import { useEffect, useState } from "react";


const PopularClass = () => {
    const [classes, setClasses] = useState([]);

    useEffect(()=>{
        fetch('classes.json')
        .then(res=>res.json())
        .then(data=>setClasses(data))
    },[])

    return (
        <div>
            <h1 className="text-center text-3xl font-semibold text-orange-500 mt-20 mb-10">Popular Classes</h1>
           
        </div>
    );
};

export default PopularClass;