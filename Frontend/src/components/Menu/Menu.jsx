import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart";
export default function Menu() {
    const [items, setItems] = React.useState([]);
    let user;
    const [ismerchant,setIsmerchant]=React.useState(false);
    let navigate = useNavigate();
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:3000/all", { headers: { Authorization: token } })
            .then(res => { setItems(res.data.data); user = res.data.user_id ; setIsmerchant(res.data.ismerchant);console.log(res.data)})
            .catch(err => { console.log(err); navigate("/login"); })
    }, []);
    console.log(items);
    let order = [];
    items.map(item => (
        order.push({
            ...item,
            quantity: 0
        })
    ))
    function handleChange(id, event) {
        order.forEach((item) => {
            if (item.item_id === id) {
                item.quantity = event.target.value;
            }
        })
    }

    function sendItems() {
        let data = [];
        order.map((item) => {
            if (item.quantity > 0) {
                data.push(item);
            }
        })
        if(data.length>0)
        {
            console.log(ismerchant)
            if(ismerchant === true)
            {
                alert("Merchants cannot order");
            }
            else{
                navigate("/cart", { state: data });
            }
            
        }
        else{
            alert("Select Atleast One Item");
        }
        
    }

    function returnItems() {
        let data = []
        items.map((item) => {
            data.push(
                <div>
                    {/* <h1>{item.name}</h1>
                    <h2>{item.price}</h2>
                    <h2>{item.shop}</h2>
                    <div className="">
                        <label className="text-sm mb-1 block">Quantity</label>
                        <input placeHolder="Enter quantity" name="quantity" onChange={(event)=>{handleChange(item.item_id , event )}}/>
                    </div> */}
                    <div className="max-w-xl mx-auto bg-slate-100 border border-yellow-400 rounded-lg flex">
                            <img class="rounded-lg w-48 h-40 max-sm:h-48" src={item.imageUrl} alt={item.name} />
                        <div className="p-5">
                            <div className="sm:flex justify-between">
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 max-sm:max-w-48">{item.name}</h1>
                            <h1 className="mb-2 text-xl  tracking-tight text-gray-900">₹ {item.price}</h1>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                            <h5 className="font-normal text-gray-700">{item.shop}</h5>
                            </div>
                            <div className="flex items-center px-3 py-2 text-sm font-medium text-center gap-2">
                            <label className="text-sm mb-1 block tracking-tight text-gray-700">Quantity</label>
                            <input className=" outline-yellow-400" type="number" placeHolder="Enter quantity" name="quantity" onChange={(event)=>{handleChange(item.item_id , event )}}/>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            )
        })
        return data;
    }

    return (<>

            <div class="my-7 w-full max-w-5xl px-4 md:px-5 lg-6 mx-auto">
                <h2 class="font-manrope text-4xl leading-10 font-extrabold tracking-tight  text-slate-800 text-center max-md:text-4xl">Menu</h2>
            </div>

        <div className="my-2 grid md:mb-8 lg:grid-cols-1 xl:grid-cols-2 mx-9">
            {returnItems()}
            
        </div>
       
            {/* <button onClick={sendItems} className=" m-5 flex items-center gap-1 min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-yellow-400 hover:bg-slate-950 focus:outline-none" > */}
            <button
            onClick={sendItems}
            className="mb-10 m-5 flex items-center gap-1 min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-yellow-400 hover:bg-slate-950 focus:outline-none"
            style={{ position: 'fixed', bottom: '20px', right:"20px", zIndex: 1000 }}
            >
                        <p>Order Now</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
            </button>
        
    </>)
}