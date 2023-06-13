import Feedback from "../Feedback/Feedback";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import Slider from "../Slider/Slider";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <PopularClass></PopularClass>
            <PopularInstructor></PopularInstructor>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;