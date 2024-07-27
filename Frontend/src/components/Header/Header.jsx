import axios from "axios";
import React from "react";
import {Link, NavLink, useLocation} from "react-router-dom"
import logo from "../../assets/logo-crop-nobg.png"
export default function Header(props)
{
    const location=useLocation();
    const loggedInData=location.state;
    const[dash,setDash]=React.useState(false);
    const [loggedIn,setLoggedIn]=React.useState({
        status:false,
        user:""
    });
        React.useEffect(() => {
            const fetchData = async () => {
                const token = localStorage.getItem('token');
                try {
                    const res = await axios.get("http://localhost:3000/isAuthenticated", { headers: { Authorization: token } });
                    console.log(res);
                    setLoggedIn({
                        status: res.data.authenticated,
                        user: res.data.user
                    });
                } catch (err) {
                    setLoggedIn({
                        status: err.response?.data?.authenticated || false,
                        user: err.response?.data?.user || ""
                    });
                }
            };
        
            fetchData();
        }, [loggedInData]);

        console.log(dash)
    
    return(<>
    <nav className="sticky">
        <div className="bg-yellow-400  text-slate flex justify-between">
            <div className="flex items-center">
                <img src={logo} className="ml-10 w-14 h-10" alt="Logo" />
            <NavLink to ="/"className="font-bold tracking-widest text-xl p-3 max-sm:hidden">Canteen Fresh</NavLink>
            </div>
        
        <div className="mx-auto flex align-middle justify-between max-md:hidden">
        <NavLink to="/" className="px-5 p-3">Home</NavLink>
        <NavLink to="/menu" className="px-5 p-3">Menu</NavLink>
        <NavLink to="/merchant" className="px-5 p-3">Shop's Desk</NavLink>
        </div>

        {!(loggedIn.status || loggedInData) && <NavLink to ="/login"className="max-md:ml-auto mr-2 p-3 font-semibold">Login</NavLink>}
        {!(loggedIn.status || loggedInData) && <NavLink to = "/register"className="mx-3 pt-1"><button className="bg-slate-950 text-white px-5 py-2 rounded font-semibold">Sign up</button></NavLink>}
        {(loggedIn.status || loggedInData) && <div className="mx-2 p-3 font-semibold flex items-center gap-2">
            
            <button onClick={()=>{setDash((prev)=> !prev)}} className="max-md:hidden">
                <div className="flex items-center gap-1">
                <h1>Hi, {loggedIn.user.first_name}</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                
                </div>
                
            </button>
            <button className="md:hidden" onClick={()=>{setDash((prev)=> !prev)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </button>
            
            </div>}
            
        </div>
    </nav>
    
    {dash && <div className="z-10 absolute right-0 m-2">
        <div id="dropdown" class=" bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class=" py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
                <div className="md:hidden block px-4 py-2">
                <h1>Hi, {loggedIn.user.first_name}</h1> 
                </div>
            </li>
            <li>
                <Link to={"/"} onClick={()=>{setDash((prev)=> !prev)}} className=" md:hidden block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
            </li>
            <li>
                <Link to={"/menu"} onClick={()=>{setDash((prev)=> !prev)}} className=" md:hidden block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Menu</Link>
            </li>
            <li>
                <Link to={"/merchant"} onClick={()=>{setDash((prev)=> !prev)}} className=" md:hidden block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Shop's Desk</Link>
            </li>
           {loggedIn.user.ismerchant=== false && <li>
                <Link to={"/myorders"} onClick={()=>{setDash((prev)=> !prev)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Orders</Link>
            </li>}
            {loggedIn.user.ismerchant=== true && <li>
                <Link to={"/completed"} onClick={()=>{setDash((prev)=> !prev)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Completed Orders</Link>
            </li>}
            {loggedIn.user.ismerchant=== true && <li>
                <Link to={"/rejected"} onClick={()=>{setDash((prev)=> !prev)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Rejected Orders</Link>
            </li>}
            <li>
                <Link to={"/"} onClick={()=>{setDash((prev)=> !prev); localStorage.removeItem("token")}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</Link>
            </li>
            
            </ul>
        </div>
    </div>}
    </>)
}