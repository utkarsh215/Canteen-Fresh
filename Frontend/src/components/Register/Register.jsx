import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register(){
    const [data,setData] = React.useState({
        first_name:"",
        last_name:"",
        enroll_id:"",
        email:"",
        password:"",
        cpassword:""
    });
    const[msg,setMsg]=React.useState("Sending Email...");
    const [showBtn,setShowBtn]=React.useState(true);
    const [allUsers,setAllUsers]=React.useState();
    React.useEffect(()=>{
      axios.get("http://localhost:3000/users")
      .then(res => setAllUsers(res.data))
      .catch(err=>console.error(err));
    },[]);
    const navigate=useNavigate();
    function handleChange(event){
        setData((prevData)=>{
            return{
                ...prevData,
                [event.target.name]:event.target.value
            }
        })
    }
console.log(allUsers)
    function sendData(){
      try {
        setShowBtn(false);
        // console.log(JSON.stringify(data));
        axios.post("http://localhost:3000/register",data)
        .then(user=>{
          console.log(user);
          setMsg(user.data.message);
        })
        .catch(err=>{console.log(err)});

        // alert("Email was sent to Your account");
        // navigate("/login");

    } catch (error) {
        console.error(error.message);
    }
    }

      async function handleSubmit(e){
        e.preventDefault();
        
        if(data.password === data.cpassword){
          let found=false;
          let updated=false;
          await allUsers.map((user)=>{
            if(user.enroll_id.toUpperCase() === data.enroll_id.toUpperCase() || user.email.toLowerCase() === data.email.toLowerCase())
            {
              // alert(user.verified);
              if(user.verified === true)
              {
                found=true;
              }
              else{
                try {
                  updated=true;
                  console.log(JSON.stringify(data));
                  setShowBtn(false);
                  axios.post("http://localhost:3000/updateUser",data)
                  .then(user=>{
                    console.log(user.data);
                    setMsg(user.data.message);
                  })
                  .catch(err=>{console.log(err)});
                }
                catch(error){
                  console.error(error);
                }
                
              }
            }
          });
          if(found === true){
            alert("User allready exists");
          }
          else if(updated == false){
            if(data.enroll_id.toUpperCase() === data.email.slice(0,12).toUpperCase())
            {
              sendData();
            }
            else{
              alert("Email and enroll_id are of Different Students");
            }
          }
        }
        else{
            alert("Passwords Does Not Match, try again.")
        }
        
    }

    return(<>
    {/* <form onSubmit={handleSubmit} className="">
        <input  type="text"placeholder="First Name" name="first_name" onChange={handleChange} value={data.first_name} />
        <input  type="text" placeholder="Last Name" name="last_name" onChange={handleChange} value={data.last_name} />
        <input  type="text" placeholder="Enrollment Id" name="enroll_id" onChange={handleChange} value={data.enroll_id} />
        <input  type="text" placeholder="Email" name="email" onChange={handleChange} value={data.email} />
        <input  type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} />
        <button >Submit</button>  
    </form> */}

<div className=" mt-14 mx-10 my-2">
<div className="rounded-xl border-2 border-yellow-400 max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6 bg-white">
      <div className="text-center mb-16">
        {/* <a href="javascript:void(0)"><img
          src="https://readymadeui.com/readymadeui.svg" alt="logo" class='w-52 inline-block' />
        </a> */}
        <h4 className=" font-bold  mt-3 text-xl tracking-wider">Register</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
          <div>
            <label className="text-sm mb-2 block">First Name</label>
            <input type="text"placeholder="Enter Name" name="first_name" onChange={handleChange} value={data.first_name} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400" required/>
          </div>
          <div>
            <label className="text-sm mb-2 block">Last Name</label>
            <input type="text" placeholder="Enter last name" name="last_name" onChange={handleChange} value={data.last_name} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400"  required/>
          </div>
          <div>
            <label className="text-sm mb-2 block">Email Id</label>
            <input type="text" placeholder="Enter email" name="email" onChange={handleChange} value={data.email} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400" pattern="\d{4}(kucp|kuec)\d{4}@iiitkota\.ac\.in" title="Enter valied iiitkota.ac.in email" required/>
          </div>
          <div>
            <label className="text-sm mb-2 block">Enrollment Id</label>
            <input type="text" placeholder="Enter enroll id" name="enroll_id" onChange={handleChange} value={data.enroll_id} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400"  required pattern="\d{4}(kucp|kuec|KUCP|KUEC)\d{4}" title="Format: <year>kucp<id> or <year>kuec<id>"/>
          </div>
          <div>
            <label className="text-sm mb-2 block">Password</label>
            <input type="password" placeholder="Enter password" name="password" onChange={handleChange} value={data.password} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400" required/>
          </div>
          <div>
            <label className="text-sm mb-2 block">Confirm Password</label>
            <input type="password" placeholder="Enter confirm password" name="cpassword" onChange={handleChange} value={data.cpassword} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400"  required/>
          </div>
        </div>
        <div className="!mt-10">
          {showBtn && <button className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-yellow-400 hover:bg-slate-950 focus:outline-none">
            Sign up
          </button>}
          {!showBtn && <div className="py-3 px-4 text-sm font-semibold rounded text-slate-800 bg-green-400 text-center">
            {msg}
          </div>}
        </div>
      </form>
    </div>
</div>  
    </>)
}