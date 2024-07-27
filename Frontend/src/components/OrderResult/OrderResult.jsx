import React, { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
export default function OrderResult(props){
    let userData;

const location=useLocation();
const orderData=location.state;
const navigate=useNavigate();
const [payment,setPayment]=React.useState(orderData);
React.useEffect(()=>{

    const token = localStorage.getItem('token');
    axios.get("http://localhost:3000/isAuthenticated",{headers:{ Authorization: token}})
    .then(res=>{userData = res.data.user;
    // axios.post("http://localhost:3000/myorders",{orderData,userData})
    // .then(res=>{console.log(res)})
    // .catch(err=>{console.log(err)})
    })
    .catch(err=>{navigate("/login")})

    
    },[]);
// function showResult(){
//     if(orderData[0].payment == "counter"){
//         return(
//             <>
//             <h1>your Order is Successfully Registered</h1>
//             <button>My Orders</button>
//             </>
//         )
//     }
//     else{
//         return(<>
//         <h1>In online Payment Mode, at the time of accepting the order kindly show the Screenshot to the shop Owner. NOTE: Canteen fresh is not responsible for any discrepancy</h1>

//         </>)
//     }
    
// }

function Amount() {
    let total = 0;
    orderData.map((item) => {
        total = total + (item.price * item.quantity)
    })
    return (total)
}

function tax(){
    if(payment[0].payment ==="online")
    {
        let tax=0.02;
        let total=Amount();
        return (total * tax);
    }
    else{
        return 0;
    }
}

function total()
{
    let taxx=tax();
    let amt=Amount();
    let total=amt+taxx;
    return total
}

function showResult(){
let data=[];
orderData.map((item) => {
    data.push(
        <tr key={item.item_id}>
            
                <td class="whitespace-nowrap py-4 md:w-[384px]">
                  <div class="flex items-center gap-4">
                      <img className="h-20 w-20 rounded-lg" src={item.imageUrl} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                </td>
                <td class="p-4 text-base font-normal text-gray-900">x{item.quantity}</td>
                <td class="p-4 text-right text-base font-bold text-gray-900 ">₹{item.price}</td>
              
        </tr>
    )
})
return data;
}
console.log(orderData)


return(<>


            <div class="mt-28 w-full max-w-5xl px-4 md:px-5 lg-6 mx-auto">
                <h2 class="font-manrope font-bold text-6xl leading-10 text-black text-center max-md:text-4xl">
                    Thanks For Your Order
                </h2>
                {/* <div className="flex items-center text-center"> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-bag-check-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                </svg> */}
                <p class="mt-12 font-normal text-lg leading-8 text-gray-500 mb-11 text-center max-md:mt-5">
                    Order recieved Sucessfully. Happy feasting!</p>
                {/* </div> */}
                
            </div>
<section className="mt-4 mb-4 rounded-xl border-2 border-yellow-400 max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6 bg-white">
  <form class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div class="mx-auto max-w-3xl">
      <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">Order summary</h2>

      {/* <div class="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Billing & Delivery information</h4>

        <dl>
          <dt class="text-base font-medium text-gray-900 dark:text-white">Individual</dt>
          <dd class="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">Bonnie Green - +1 234 567 890, San Francisco, California, United States, 3454, Scott Street</dd>
        </dl>

        <button type="button" data-modal-target="billingInformationModal" data-modal-toggle="billingInformationModal" class="text-base font-medium text-primary-700 hover:underline dark:text-primary-500">Edit</button>
      </div> */}

      <div class="mt-6 sm:mt-8">
        <div class="relative overflow-x-auto border-b border-gray-200 ">
          <table class="w-full text-left font-medium text-gray-900  md:table-fixed">
            <tbody class="divide-y divide-gray-300">
            {showResult()}
            </tbody>
          </table>
        </div>

        <div class="mt-4 space-y-6">
          <h4 class="text-xl font-semibold text-gray-900">Order summary</h4>
          <div class="space-y-4">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-gray-500 ">Original Price</dt>
                <dd class="text-base font-medium text-gray-900">₹{Amount()}</dd>
              </dl>
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-gray-500 ">Payment Method</dt>
                <dd class="text-base font-medium text-gray-900 ">{payment[0].payment}</dd>
              </dl>

            <dl class="flex items-center justify-between gap-4">
            <dt class="text-gray-500 ">Tax</dt>
            <dd class="text-base font-medium text-gray-900">₹{tax().toFixed(2)}</dd>
            </dl>

            </div>

            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt class="text-lg font-bold text-gray-900 ">Total</dt>
              <dd class="text-lg font-bold text-gray-900 ">₹{total()}</dd>
            </dl>
          </div>
          <div class="gap-4 sm:flex sm:items-center">
          <button type="button" onClick={()=>{navigate("/menu")}}class="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-yellow-400 hover:bg-slate-950 focus:outline-none w-full bg-primary-600 hover:bg-primary-700 focus:ring-4focus:ring-primary-300 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">Continue Shopping</button>

            <button type="submit" onClick={()=>{navigate("/myOrders")}} class="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium hover:bg-primary-800 text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary-300  sm:mt-0">My Orders</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</section>
</>)
}