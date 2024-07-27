import React from "react";
import axios from "axios";
export default function M_register(){
const [data,setData]=React.useState({
    first_name:"",
    last_name:"",
    shop:"",
    phone_num:"",
    pay_num:"",
    email:"",
    password:"",
    cpassword:""
})

function handleChange(event){
    setData((prevData)=>{
        return{
            ...prevData,
            [event.target.name]:event.target.value
        }
    })
}

function handleSubmit(e){
    if(data.password === data.cpassword){
        e.preventDefault();
        try {
            console.log(JSON.stringify(data));
            axios.post("http://localhost:3000/m_register",data)
            .then(user=>{
              console.log(user);
            })
            .catch(err=>{console.log(err)})

        } catch (error) {
            console.error(error.message);
        }
    }
    else{
        console.log("Passwords Does Not Match, try again.")
    }
}

return(<>
<div className=" mt-14 mx-10">
<div className="rounded-xl border-2 border-yellow-400 bg-white my-10 max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6 ">
      <div className="text-center mb-16">
        <h4 className=" font-bold  mt-3 text-xl tracking-wider">Register</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
          <div>
            <label className="text-sm mb-2 block">First Name</label>
            <input type="text"placeholder="Enter Name" name="first_name" onChange={handleChange} value={data.first_name} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400" />
          </div>
          <div>
            <label className="text-sm mb-2 block">Last Name</label>
            <input type="text" placeholder="Enter last name" name="last_name" onChange={handleChange} value={data.last_name} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400"  />
          </div>
          <div>
            <label className="text-sm mb-2 block">Shop Name</label>
            <input type="text" placeholder="Enter shop" name="shop" onChange={handleChange} value={data.shop} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400" />
          </div>
          <div>
            <label className="text-sm mb-2 block">Phone No.</label>
            <input type="number" placeholder="Enter phone no." name="phone_num" onChange={handleChange} value={data.phone_num} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400"  />
          </div>
          <div>
            <label className="text-sm mb-2 block">Payment No.</label>
            <input type="number" placeholder="Enter payment no." name="pay_num" onChange={handleChange} value={data.pay_num} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400" />
          </div>
          <div>
            <label className="text-sm mb-2 block">Email</label>
            <input type="email" placeholder="Enter email" name="email" onChange={handleChange} value={data.email} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400"  />
          </div>
          <div>
            <label className="text-sm mb-2 block">Password</label>
            <input type="password" placeholder="Enter password" name="password" onChange={handleChange} value={data.password} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400"  />
          </div>
          <div>
            <label className="text-sm mb-2 block">Confirm Password</label>
            <input type="password" placeholder="Enter password" name="cpassword" onChange={handleChange} value={data.cpassword} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400"  />
          </div>
        </div>

        <div className="!mt-10">
          <button className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-yellow-400 hover:bg-slate-950 focus:outline-none">
            Sign up
          </button>
        </div>
      </form>
    </div>
</div>  
</>)
}