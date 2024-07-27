import React from "react";
import { Link, useNavigate } from "react-router-dom";
import fastFood from "../../assets/fast-food-crop.png"
import hat from "../../assets/chef-crop.png"
import reach from "../../assets/reach-nobg.png"
import waiting from "../../assets/waiting-nobg.png"
import money from "../../assets/money-nobg.png"
import pay from "../../assets/payment1-nobg.png"
import axios from "axios";
export default function Home() {
    const navigate = useNavigate();
    const [merchant, setMerchant] = React.useState([]);
    const [menu, setMenu] = React.useState([]);
    React.useEffect(() => {
        axios.get("http://localhost:3000/merchant")
            .then(res => setMerchant(res.data))
            .catch(err => console.error(err));

        axios.get("http://localhost:3000/menu_home")
            .then(res => setMenu(res.data))
            .catch(err => console.error(err));
    }, []);

    function canteen() {
        let data = [];
        merchant.map((item) => {
            data.push(
                <div class="inline-block min-w-[200px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="text-yellow-300 rounded-sm w-16 h-16 mx-auto bi bi-shop-window" viewBox="0 0 16 16">
                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    <h2 class="text-xl mt-4 text-center font-extrabold tracking-tight text-slate-800">{item.shop}</h2>
                    <p class="text-center font-medium text-slate-700">IIIT Kota</p>
                </div>
            )
        })
        return data;
    }

    function menuData() {
        let data = [];
        menu.map((item) => {
            data.push(
                <div class=" bg-slate-100 p-6 shadow-sm border border-yellow-400 rounded-lg">
                    <div className="flex justify-center">
                        <img className="h-40 w-72 rounded-lg" src={item.imageUrl} alt={item.name} />
                    </div>
                    <div class="pt-6">

                        <h1 class="text-lg font-semibold leading-tight text-gray-900">{item.name}</h1>
                        <div className="flex items-center gap-2 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
                                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
                            </svg>
                            <h5 className="font-normal text-gray-700">{item.shop}</h5>
                        </div>
                        <div class="mt-4 flex items-center justify-between gap-4">
                            <p class="text-2xl font-extrabold leading-tight text-gray-900 ">₹{item.price}</p>
                        </div>
                    </div>
                </div>
            )
        });
        return data;
    }

    return (<>
        {/* <Link to="/m_login"><button>Merchant Login</button></Link> */}



        {/* <section className="bg-center bg-no-repeat bg-cover min-h-screen bg-blend-multiply" style={{ backgroundImage: `url(${fastFood})` }} >
            <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 class="mb-10 text-4xl font-extrabold tracking-tight leading-none text-slate-900 md:text-5xl lg:text-6xl">Unlock the Magic of Dining</h1>
                <p class="mb-8 text-lg font-semibold text-slate-700 lg:text-xl sm:px-16 lg:px-48">Unlock the Magic of Dining" invites you to experience the enchantment of culinary excellence, where each meal becomes a journey of flavors, aromas, and unforgettable moments.</p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <button onClick={() => { navigate("/menu") }} class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg mb-4 mx-10 md:mx-32 m-5  gap-1 min-w-[150px] bg-slate-900 hover:bg-slate-950 focus:outline-none">
                        Get started
                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                   
                </div>
            </div>
        </section> */}

        <section className="relative bg-center bg-no-repeat bg-cover min-h-screen bg-blend-multiply" style={{ backgroundImage: `url(${fastFood})` }}>
            <div className="absolute inset-0 bg-yellow-300 opacity-60"></div> {/* This is the overlay */}
            <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-slate-900 max-sm:mt-24 max-md:mt-32 md:text-5xl lg:text-6xl">Unlock the Magic of Dining</h1>
                <p className="mb-8 text-lg font-semibold text-gray-900 lg:text-xl sm:px-16 lg:px-48">Canteen Fresh invites you to experience the enchantment of culinary excellence, where each meal becomes a journey of flavors, aromas, and unforgettable moments.</p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <button onClick={() => { navigate("/menu") }} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg mb-4 mx-10 md:mx-32 m-5 gap-1 min-w-[150px] bg-slate-900 hover:bg-slate-950 focus:outline-none">
                        Get started
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>


        <div className="max-md:flex md:justify-center">
            <h1 class="mx-auto md:mx-32 my-16 text-5xl font-extrabold tracking-tight leading-none text-slate-800 md:text-5xl lg:text-6xl">Why Us?</h1>
        </div>

        <div className="mx-5 sm:mx-32 md:flex md:justify-center">
            <div class=" flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                <img class=" bg-yellow-400 object-cover w-full rounded-lg h-96 md:h-36 md:w-48 " src={reach} alt="" />
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Improves the reach of canteen Venders</h5>
                    <p class="mb-3 font-normal text-gray-700 ">We provide online platforms to connect students and canteen venders.</p>
                </div>
            </div>
            <br />
            <div class="flex flex-col items-center ml-auto bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                <img class="bg-yellow-400 object-cover w-full rounded-lg h-96 md:h-36 md:w-48 " src={waiting} alt="" />
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Decreases waiting time at Canteen</h5>
                    <p class="mb-3 font-normal text-gray-700 ">We can order our food before reaching the canteen, thus reducing counter waiting time. This is especially helpful during exam times.</p>
                </div>
            </div>
        </div>
        <br />
        <div className="mx-5 sm:mx-32 md:flex md:justify-center">
            <div class="mt-7  flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                <img class="bg-yellow-400 object-cover w-full rounded-lg h-96 md:h-36 md:w-48 " src={money} alt="" />
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Keep Track on your Food Expenses</h5>
                    <p class="mb-3 font-normal text-gray-700 ">You can keep track of your food expenses by easily scrolling through your order history.</p>
                </div>
            </div>
            <br />
            <div class="mt-7 flex flex-col items-center ml-auto bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                <img class="bg-yellow-400 object-cover w-full rounded-lg h-96 md:h-36 md:w-48 " src={pay} alt="" />
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Hassle-free Payment Options</h5>
                    <p class="mb-3 font-normal text-gray-700 ">We provide an online payment portal as well as an option for counter payment when receiving the order from the canteen.</p>
                </div>
            </div>
        </div>
        <br />


        <div className="max-md:flex md:justify-center">
            <h1 class="max-sm:text-center mx-auto md:mx-32 my-16 text-5xl font-extrabold tracking-tight leading-none text-slate-800 md:text-5xl lg:text-6xl">Featured Canteen(s)</h1>
        </div>
        <div className="mb-4 mx-10 md:mx-32 overflow-x-auto whitespace-nowrap">
            {canteen()}
        </div>
        <br />


        <div className="bg-yellow-400 py-6 mb-4 mx-10 md:mx-24 rounded-2xl">
            <div className="max-md:flex md:justify-center">
                <h1 class="mx-auto md:mx-32 my-16 text-5xl font-extrabold tracking-tight leading-none text-slate-100 md:text-5xl lg:text-6xl">What's Today?</h1>
            </div>
            <div class="mb-4 mx-10 md:mx-32 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 ">
                {menuData()}
            </div>
            <button onClick={() => { navigate("/menu") }} className="mb-4 mx-10 md:mx-32 m-5 flex items-center gap-1 min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-slate-900 hover:bg-slate-950 focus:outline-none">
                <p>Explore Menu</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                </svg>
            </button>
        </div>
        <br />
        <br />
        <div className="mx-10 md:flex md:mx-24">
            <img src={hat} />
            <div className="bg-yellow-400 py-6  ml-auto max-w-2xl  rounded-2xl">
                <div className="max-md:flex md:justify-center">
                    <h1 class="mx-auto md:mx-32 mt-16 text-5xl font-extrabold tracking-tight leading-none text-slate-100 max-sm:text-3xl md:text-5xl lg:text-5xl">Canteen's Cornor</h1>
                </div>
                <div className="max-md:flex md:justify-center">
                    <h1 class="max-sm:text-center mx-auto md:mx-32 my-16 text-xl font-semibold tracking-tight leading-none text-slate-200 max-sm:text-2xl md:text-xl lg:text-2xl">Expand your bussiness, join Canteen Fresh Now!</h1>
                </div>
                <button onClick={() => { navigate("/merchant") }} className="mb-4 ml-auto mr-20 flex items-center gap-1 min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-slate-900 hover:bg-slate-950 focus:outline-none">
                    <p>Shop's Desk</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                    </svg>
                </button>
            </div>
        </div>
        <br />
        <br />


    </>)
}