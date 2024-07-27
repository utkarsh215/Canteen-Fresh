import React from "react";
import axios from "axios";
export default function Rejected(){

    const[orders,setOrders]=React.useState([]);
    const [user,setUser]=React.useState();
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:3000/isAuthenticated", { headers: { Authorization: token } })
            .then(res => {setUser(res.data.user) })
            .catch(err => { navigate("/login") })
    }, []);
    console.log(user);

    React.useEffect(()=>{
        try {
            const token=localStorage.getItem('token');
            axios.get("http://localhost:3000/myorders",{headers:{ Authorization: token}})
            .then(res => {setOrders(res.data)})
            .catch(err =>{console.error(err)})
        } catch (error) {
            console.log(error);
        } },[]);

        function allOrders(){
            let data=[];
            orders.map((item)=>{
                if(item.rejected===true)
                {
                data.push(
                    <div>
                        <div className="max-w-2xl mx-auto bg-slate-100 border border-yellow-400 rounded-lg flex">
                                <img class="rounded-lg w-56" src={item.imageUrl} alt="" />
                            <div className="p-5">
                            <h5 className="font-normal text-gray-700">{item.time} || {item.date}</h5>
                                <div className="flex justify-between">
                                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item.name}</h1>
                                <h1 className="mb-2 text-xl  tracking-tight text-gray-900">Total: ₹{item.price * item.quantity}</h1>
                                </div>
                                
                                
                                <h5 className="my-2 text-gray-700 font-bold">Quantity: {item.quantity}</h5>
                                <h5 className="my-2 text-gray-700 font-bold">Payment: {item.payment}</h5>
                                
                                <div className="flex items-center px-3 py-2 text-sm font-medium text-center gap-2">
                                <h1 className="text-sm mb-1 block tracking-tight text-gray-700">By: {item.first_name} {item.last_name} ({item.enroll_id})</h1>
                                </div>
                                
                            </div>
                        </div>
                        <br />
                    </div>
    
    
                )}
            })
            return data;
        }

    return(
        <>
        <div class="mt-3 mb-3 w-full max-w-5xl px-4 md:px-5 lg-6 mx-auto">
        <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center max-md:text-4xl">Rejected Orders</h2>
      </div>
      <div className="my-2 grid md:mb-8 lg:grid-cols-1 xl:grid-cols-2 mx-9">
        {allOrders()}
      </div>
        </>
    )
}