import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios"
export default function Cart(props) {

    const navigate = useNavigate();
    const [user,setUser]=React.useState();
    const [isClicked,setIsClicked]=React.useState(false);
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:3000/isAuthenticated", { headers: { Authorization: token } })
            .then(res => {setUser(res.data.user) })
            .catch(err => { navigate("/login") })
    }, []);

    const orderData = [];
    const [payment,setPayment]=React.useState("");
    // const [token,setToken]=React.useState();

    const location = useLocation();
    const cartData = location.state;
    // console.log(cartData);
    cartData.forEach((item) => {
        orderData.push({
            ...item,
            payment: ""
        });
    })
    console.log(orderData);

    // function orderSummary() {
    //     let summary = [];
    //     cartData.map((item) => (
    //         summary.push(<div key={item.item_id}>
    //             <h1>Name = {item.name}X{item.quantity}=₹{item.price * item.quantity}</h1>
    //             <br />
    //         </div>)
    //     ))
    //     return (summary)
    // }

    function orderSummary() {
        let summary = [];
        cartData.map((item) => (
            summary.push(<div key={item.item_id}>
                {/* <h1>Name = {item.name}X{item.quantity}=₹{item.price * item.quantity}</h1>
                <br /> */}

                <div class="rounded-lg border border-yellow-400 bg-slate-100 p-4 shadow-sm ">
                    <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        
                            <img class="h-20 w-20 rounded-lg" src={item.imageUrl} alt={item.name}/>
                        

                        <label for="counter-input" class="sr-only">Choose quantity:</label>
                        <div class="flex items-center justify-between md:order-3 md:justify-end">
                            <div class="flex items-center">
                                {/* <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                    <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                    </svg>
                                </button> */}
                                <p class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0">Quantity: {item.quantity}</p>
                                {/* <input type="text" id="counter-input" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value="2" required /> */}
                                {/* <button type="button" id="increment-button" data-input-counter-increment="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                    <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button> */}
                            </div>
                            <div class="text-end md:order-4 md:w-32">
                                <p class="text-base font-bold text-gray-900">₹ {item.price}</p>
                            </div>
                        </div>

                        <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <p class="text-base font-medium text-gray-900">{item.name}</p>

                            {/* <div class="flex items-center gap-4">
                                <button type="button" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                    <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                    </svg>
                                    Add to Favorites
                                </button>

                                <button type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                    <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    Remove
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>


            </div>)
        ))
        return (summary)
    }


    function Amount() {
        let total = 0;
        cartData.map((item) => {
            total = total + (item.price * item.quantity)
        })
        return (total)
    }

   async function handleClick() {
        setIsClicked(true);
        let data = [];
        const date = new Date();
        let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // const day = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
        const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        console.log("Order placed");
        orderData.map((item) => {
            data.push({
                ...item,
                date: dateMDY,
                time: time,
                completed:false,
                rejected:false
            })
        })
        console.log(data);
        if(payment ==="")
        {
            alert("Choose Payment Method First !");
        }
        else if(data[0].payment ==="counter"){
            axios.post("http://localhost:3000/myorders",{data,user})
            .then(res=>{console.log(res)})
            .catch(err=>{console.log(err)})
            navigate("/OrderResult", { state: data });
        }
        else{

            let token;
            await axios.post("http://localhost:3000/api/get-token")
            .then(response => {token = response.data;
            })
            .catch(err =>(console.log(err)));
            console.log(user);
            console.log(token);
            await axios.post("http://localhost:3000/api/create-order",{token:token, amount:total(), user_id:user.user_id, buyer_name: user.first_name,last_name:user.last_name,enroll_id:user.enroll_id,email:user.email, cartData: data})
            .then(response =>{console.log(response.data);
            // window.open(response.data,'_blank')
            window.open(response.data)
            })
            .catch(err => console.log(err));

            // navigate("/OrderResult", { state: data });
        }
    }

    function handleChange(event) {
        setPayment(event.target.value);
    }

    orderData.map((item) => {
        item.payment = payment;
    })

    function tax(){
        let tax=0.02;
        let total=Amount();
        return (total * tax);
    }

    function total()
    {
        let taxx=tax();
        let amt=Amount();
        let total=amt+taxx;
        return total
    }

    return (<>
        {/* {orderSummary()}
        <h2>Total payble Amount=₹{Amount()}</h2> */}
        {/* <fieldset>
            <legend>Select the Payment Method</legend>
            <input
                type="radio"
                id="Counter"
                name="payment"
                value="counter"
                onChange={handleChange}
            />
            <label> Counter Payment</label>
            <br />
            <input
                type="radio"
                id="Online"
                name="payment"
                value="online"
                onChange={handleChange}
            />
            <label> Online Payment</label>
        </fieldset> */}

        {/* <button onClick={handleClick}>Confirm Order</button> */}

        <section class=" py-8 antialiased">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 class="text-4xl leading-10 font-extrabold tracking-tight  text-slate-800  max-sm:text-2xl">Food Cart</h2>
                <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div class="space-y-6">
                            {orderSummary()}
                        </div>
                    </div>



                    <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div class="space-y-4 rounded-lg border border-yellow-400 bg-slate-100 p-4 shadow-sm sm:p-6">
                            <p class="text-xl font-semibold text-gray-900">Order summary</p>

                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-600">Original price</dt>
                                        <dd class="text-base font-medium text-gray-900">₹{Amount()}</dd>
                                    </dl>

                                    {payment === "counter" && <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-600">Savings</dt>
                                        <dd class="text-base font-medium text-green-600">-₹{tax().toFixed(2)}</dd>
                                    </dl>}

                                    {/* <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                        <dd class="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                                    </dl> */}

                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-600">
                                            <p>Tax</p>
                                            <p className="text-sm">(Only for Online Payment)</p>
                                            </dt>
                                        <dd class="text-base font-medium text-gray-900">₹{tax().toFixed(2)}</dd>
                                    </dl>
                                </div>

                                <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                    <dt class="text-base font-bold text-gray-900">Total</dt>
                                    {payment === "online" && <dd class="text-base font-bold text-gray-900">₹{total()}</dd>}
                                    {payment === "counter" && <dd class="text-base font-bold text-gray-900">₹{Amount()}</dd>}
                                </dl>
                            </div>

                            <div class="space-y-4 rounded-lg border border-gray-700 bg-gray-900 p-4 shadow-sm sm:p-6">
                                    <div class="space-y-4">
                                        <p class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Select Payment Method: </p>
                                    </div>


                                <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    {/* <input id="Online" type="radio" value="online" name="payment" onChange={handleChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 " /> */}
                                    <label class="w-full py-4 ms-2 text-sm font-medium text-gray-300">
                                        <div className="flex items-center gap-2">
                                        <input id="Online" type="radio" value="online" name="payment" onChange={handleChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 " />
                                        <p>Online Payment</p>
                                        </div>
                                    </label>
                                        
                                    
                                </div>

                                <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                
                                    <label  class="w-full py-4 ms-2 text-sm font-medium text-gray-300 ">
                                    <div className="flex items-center gap-2">
                                    <input id="Counter" type="radio" value="counter" name="payment" onChange={handleChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 " />
                                    <p>Counter Payemt</p>
                                    </div>
                                    </label>
                        
                                </div>

                            </div>

                        {!isClicked && <button onClick={handleClick} className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-yellow-400 hover:bg-slate-950 focus:outline-none w-full bg-primary-600 hover:bg-primary-700 focus:ring-4focus:ring-primary-300 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Confirm Order
                        </button>}
                        {isClicked && <div className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-green-400 focus:outline-none w-full bg-primary-600 text-center">
                        Processing...
                        </div>}
                            <div class="flex items-center justify-center gap-2">
                                <span class="text-sm font-normal text-gray-500 dark:text-gray-600"> or </span>
                                <Link to={"/menu"} title="" class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                    Continue Shopping
                                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </section>

    </>)
}