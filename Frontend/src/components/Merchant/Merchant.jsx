import axios from "axios";
import React from "react"
import { useNavigate } from "react-router-dom";
import AddItem from "./PopupAddItem/AddItem";
import { Pencil } from 'lucide-react';
import EditItem from "./PopEditItem/EditItem";
import LiveOrders from "./LiveOrders/LiveOrders";
export default function Merchant() {
  const [menu_items, setMenu_items] = React.useState([]);
  const [merchant, setMerchant] = React.useState();
  const [popupAdd, setPopupAdd] = React.useState(false);
  const [popupEdit, setPopupEdit] = React.useState({
    state: false,
    id: ""
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:3000/all", { headers: { Authorization: token } })
      .then((items) => {
        if (items.data.ismerchant) {
          setMenu_items(items.data.data);
          setMerchant(items.data)
        }
        else {
          alert("Only for Merchants");
          navigate("/m_login");
        }
      })
      .catch(err => { console.error(err); navigate("/m_login") });
  }, []);

console.log(menu_items)
  // function menu(){
  //    let data=[];
  //    menu_items.map((item) =>{
  //     if(item.shop_id === merchant.id)
  //         {
  //             data.push(
  //                 <div key={item.item_id}>
  //                     <button onClick={()=>{setPopupEdit({state:true , item:item})}}><Pencil size={10}/></button>
  //                     <h1>{item.name}</h1>
  //                     <h3>{item.price}</h3>
  //                     <br/>
  //                 </div>
  //             )
  //         }
  //     })
  // return data;
  // }    


  function menu() {
    let data = [];
    menu_items.map((item) => {
      if (item.shop_id === merchant.id) {
        data.push(
          <div key={item.item_id}>
            {/* <button onClick={()=>{setPopupEdit({state:true , item:item})}}><Pencil size={10}/></button>
                         <h1>{item.name}</h1>
                         <h3>{item.price}</h3>
                         <br/> */}

            <div class=" bg-slate-100 p-6 shadow-sm border border-yellow-400 rounded-lg">
             
                <img className="h-40 w-72 rounded-lg" src={item.imageUrl} alt={item.name} />
              
              <div class="pt-6">

                <h1 class="text-lg font-semibold leading-tight text-gray-900">{item.name}</h1>
                <div class="mt-4 flex items-center justify-between gap-4">
                  <p class="text-2xl font-extrabold leading-tight text-gray-900 ">₹{item.price}</p>

                  <button type="button" onClick={() => { setPopupEdit({ state: true, item: item }) }} class="text-white bg-yellow-400 hover:bg-slate-950 focus:outline-none inline-flex items-center rounded-lg  px-5 py-2.5 text-sm font-medium ">
                    <Pencil size={15} className="m-2" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    })
    return data;
  }



  
  return (
    <div>
      {/* <br/>
        <h1>Menu goes here:-</h1>
        {menu()}
        <button onClick={()=>setPopupAdd(true)}>Add Item</button>
        {popupAdd && <AddItem onClose={()=> setPopupAdd(false)} merchant={merchant}/>}

        {popupEdit.state && <EditItem onClose={() => setPopupEdit({state:false , item:{}})} data={popupEdit}/>}

        <h1>Live Orders:-</h1>
        <br/>
        <LiveOrders merchant={merchant}/> */}
      <div class="mt-3 mb-3 w-full max-w-5xl px-4 md:px-5 lg-6 mx-auto">
                <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center max-md:text-4xl">Current Menu</h2>
            </div>

      <section class="py-8 antialiased">

        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {menu()}

            <button onClick={() => setPopupAdd(true)}>
              <div class="rounded-lg border p-6 shadow-sm text-white bg-yellow-400 hover:bg-slate-950 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="250" height="115" fill="currentColor" class="bi bi-plus mx-auto font-semibold leading-tight" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                  </svg>
              </div>
            </button>

          </div>
        </div>
      </section>



      {popupAdd && <AddItem onClose={() => setPopupAdd(false)} merchant={merchant} />}
      {popupEdit.state && <EditItem onClose={() => setPopupEdit({ state: false, item: {} })} data={popupEdit} />}


      <div class="mt-3 mb-3 w-full max-w-5xl px-4 md:px-5 lg-6 mx-auto">
        <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center max-md:text-4xl">Live Orders</h2>
      </div>
      <div className="my-2">
        <LiveOrders merchant={merchant}/>
      </div>



    </div>
  )
}








{/* <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div class="h-56 w-full">
          <a href="#">
            <img class="mx-auto h-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg" alt="" />
            <img class="mx-auto hidden h-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg" alt="" />
          </a>
        </div>

        <div class="pt-6">
          <div class="mb-4 flex items-center justify-between gap-4">
            <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> Up to 35% off </span>

            <div class="flex items-center justify-end gap-1">
              <button type="button" data-tooltip-target="tooltip-quick-look-3" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only"> Quick look </span>
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                  <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
              <div id="tooltip-quick-look-3" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                Quick look
                <div class="tooltip-arrow" data-popper-arrow=""></div>
              </div>

              <button type="button" data-tooltip-target="tooltip-add-to-favorites-3" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only"> Add to Favorites </span>
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                </svg>
              </button>
              <div id="tooltip-add-to-favorites-3" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                Add to favorites
                <div class="tooltip-arrow" data-popper-arrow=""></div>
              </div>
            </div>
          </div>

          <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">iPad Pro 13-Inch (M4): XDR Display, 512GB</a>

          <div class="mt-2 flex items-center gap-2">
            <div class="flex items-center">
              <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>

              <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>

              <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>

              <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>

              <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>
            </div>

            <p class="text-sm font-medium text-gray-900 dark:text-white">4.9</p>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">(879)</p>
          </div>

          <ul class="mt-2 flex items-center gap-4">
            <li class="flex items-center gap-2">
              <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
              </svg>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Shipping Today</p>
            </li>

            <li class="flex items-center gap-2">
              <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
            </li>
          </ul>

          <div class="mt-4 flex items-center justify-between gap-4">
            <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">$799</p>

            <button type="button" class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      </div>
 */}