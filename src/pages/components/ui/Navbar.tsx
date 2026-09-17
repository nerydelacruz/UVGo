import {FiBell, FiSearch} from "react-icons/fi"
import "./index.css"
const Navbar=()=>{
    return(
        <div className="Navbar">
            <div className="w-1/3">
                <img src="./src/assets/logo.png" className="max-w-2/6"/>  
            </div>
            <div className="w-1/3 flex justify-between">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </div>
            <div className="flex w-1/3 justify-end">
                <FiSearch className="w-5 h-5 text-gray-500" />
                <div className="relative">
                    <FiBell className="w-5 h-5 text-gray-500" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
            </div>
        </div>
    )
}

export default Navbar

