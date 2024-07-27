import React from "react";
import axios from "axios";
import io from 'socket.io-client';
export default function LiveOrders({merchant}){
    const[orders,setOrders]=React.useState([]);
    
    const [ordersData, setOrdersData] = React.useState([]);

    const [isOrder,setIsOrder] = React.useState(true);

    const socket = io('http://localhost:3000');
    React.useEffect(()=>{
        try {

            const token=localStorage.getItem('token');
            axios.get("http://localhost:3000/myorders",{headers:{ Authorization: token}})
            .then(res => {setOrders(res.data)})
            .catch(err =>{console.error(err)})

        } catch (error) {
            console.log(error);
        }
    },[]);



    React.useEffect(()=>{
        socket.on('new_order', (data) => {
            // if(data.shop_id === merchant.id)
            //     {
            //         console.log(data)
            //         setOrders((prevOrders) => [data, ...prevOrders]);
            //     }


            try {

                const token=localStorage.getItem('token');
                axios.get("http://localhost:3000/myorders",{headers:{ Authorization: token}})
                .then(res => {setOrders(res.data)})
                .catch(err =>{console.error(err)})
    
            } catch (error) {
                console.log(error);
            }

        
        });
        return () => {
        socket.off('new_order');
        socket.disconnect();
        };
    },[socket]);
    // console.log(orders);

    function liveOrders(){
        // let data=[];
        // console.log(orders[0]);
        // orders.map((item)=>{
        //     data.push(
        //         // <tr key={item.order_id}>
        //         //     <td>{item.name}</td>
        //         //     <td>{item.price}</td>
        //         //     <td>{item.quantity}</td>
        //         //     <td>{item.price*item.quantity}</td>
        //         //     <td>{item.payment}</td>
        //         //     <td>{item.time}</td>
        //         //     <td>{item.date.slice(0,10)}</td>
        //         //     <br />
        //         // </tr>
        //         <div>
        //             <div className="max-w-xl mx-auto bg-slate-100 border border-yellow-400 rounded-lg">
        //                     <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
        //                 <div className="p-5">
        //                 <h5 className="font-normal text-gray-700">{item.time} || {item.date.slice(0,10)}</h5>
        //                     <div className="flex justify-between">
        //                     <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item.name}</h1>
        //                     <h1 className="mb-2 text-xl  tracking-tight text-gray-900">Total: ₹{item.price * item.quantity}</h1>
        //                     </div>
                            
                            
        //                     <h5 className="my-2 text-gray-700 font-bold">Quantity: {item.quantity}</h5>
        //                     <h5 className="my-2 text-gray-700 font-bold">Payment: {item.payment}</h5>
                            
        //                     <div className="flex items-center px-3 py-2 text-sm font-medium text-center gap-2">
        //                     <h1 className="text-sm mb-1 block tracking-tight text-gray-700">By: {item.first_name} {item.last_name} ({item.enroll_id})</h1>
        //                     </div>
        //                     <button type="button" className={`min-w-[150px] mx-3 py-3 px-4 text-sm font-semibold rounded text-white bg-green-600 hover:bg-slate-950`}>
        //                     Completed
        //                     </button>
        //                     <button type="button" className={`min-w-[150px] mx-3 py-3 px-4 text-sm font-semibold rounded text-white bg-red-600 hover:bg-slate-950`}>
        //                     Reject
        //                     </button>
        //                 </div>
        //             </div>
        //             <br />
        //         </div>
        //     )
        // })

        // return data;

        const handleReject = (orderId) => {
            orders.map((item)=>{
                if(item.order_id === orderId)
                {
                    axios.post("http://localhost:3000/edit_myorders",{item,rejected:true,completed:false})
                    .then(res=>console.log(res))
                    .catch(err=>console.error(err));

                }
            });
            const updatedOrders = orders.filter((order) => order.order_id !== orderId);
            setOrders(updatedOrders);
          };

          const handleCompleted = (orderId) => {
            orders.map((item)=>{
                if(item.order_id === orderId)
                {
                    axios.post("http://localhost:3000/edit_myorders",{item,completed:true,rejected:false})
                    .then(res=>console.log(res))
                    .catch(err=>console.error(err));

                }
            });
            const updatedOrders = orders.filter((order) => order.order_id !== orderId);
            setOrders(updatedOrders);
          };

        React.useEffect(() => {
            let data=[];

            orders.map((item) => {
                if(item.rejected === false && item.completed===false)
                {  
                
                data.push(
                <div key={item.order_id}>
                <div className="max-w-xl mx-auto bg-slate-100 border border-yellow-400 rounded-lg">
                  <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                  <div className="p-5">
                    <h5 className="font-normal text-gray-700">{item.time} || {item.date.slice(0, 10)}</h5>
                    <div className="flex justify-between">
                      <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item.name}</h1>
                      <h1 className="mb-2 text-xl tracking-tight text-gray-900">Total: ₹{item.price * item.quantity}</h1>
                    </div>
                    <h5 className="my-2 text-gray-700 font-bold">Quantity: {item.quantity}</h5>
                    <h5 className="my-2 text-gray-700 font-bold">Payment: {item.payment}</h5>
                    <div className="flex items-center px-3 py-2 text-sm font-medium text-center gap-2">
                      <h1 className="text-sm mb-1 block tracking-tight text-gray-700">By: {item.first_name} {item.last_name} ({item.enroll_id})</h1>
                    </div>
                    <button
                      type="button"
                      className="min-w-[150px] mx-3 py-3 px-4 text-sm font-semibold rounded text-white bg-green-600 hover:bg-slate-950"
                      onClick={() => handleCompleted(item.order_id)}
                    >
                      Completed
                    </button>
                    <button
                      type="button"
                      className="min-w-[150px] mx-3 py-3 px-4 text-sm font-semibold rounded text-white bg-red-600 hover:bg-slate-950"
                      onClick={() => handleReject(item.order_id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
                <br />
              </div>)
              }
        }
    );

            if(data.length ===0)
            {
                setIsOrder(false);
            }
            else
            {
                setIsOrder(true);
            }
        
            setOrdersData(data);
          }, [orders]);

          return ordersData
    }



    return(<>
        {!isOrder && <h1 className="text-center text-lg text-slate-600 font-semibold tracking-wide py-4">- - - No Orders - - -</h1>}
        {liveOrders()}
    </>)
}