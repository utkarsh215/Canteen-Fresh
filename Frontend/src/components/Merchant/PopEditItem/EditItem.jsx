import React from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

export default function EditItem({data , onClose}){

    const modelRef=React.useRef();
    const[currData,setCurrData]=React.useState(data.item);
    console.log(currData);
    let navigate=useNavigate();
    const[deleteItem,setDeleteItem]=React.useState(false);
    function closeModel(event)
    {
        if(modelRef.current === event.target){
            onClose();
        }
    }

    function handleChange(event){
        setCurrData(prev =>{
            return{
                ...prev,
                [event.target.name]:event.target.value
            }
        })
    }
    function handleSubmit(event){
        event.preventDefault();
        if(deleteItem === true){
            axios.delete("http://localhost:3000/edit_menu",{data: {
                source: currData
              }})
            .then(res=>{console.log(res)})
            .catch(err =>{console.log(err)});
        }
        else{
            axios.post("http://localhost:3000/edit_menu",currData)
            .then(res=>{console.log(res)})
            .catch(err =>{console.log(err)});
        }
        onClose();
        
    }


  const [imageUrl, setImageUrl] = React.useState();
  
  const handleChangeEvent = (items) => {
    const uploadedFiles = items.allEntries.filter((file) => file.status === 'success');
    
    if (uploadedFiles.length > 0) {
      const cdnUrl = uploadedFiles[0].cdnUrl;
      // setImageUrl(cdnUrl);

      setCurrData(prev =>{
        return{
            ...prev,
            imageUrl:cdnUrl
        }
       
    })
    console.log(currData);
      console.log('CDN URL of the just-uploaded image:', cdnUrl);
    }
  }

return(<div ref={modelRef} onClick={closeModel} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
    <div className=" mt-14 mx-10 bg-white rounded-xl">
    
    <div className="rounded-xl border-2 border-yellow-400 max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6 ">
    <button className='place-self-end' onClick={()=> onClose()}><X/></button>
      <div className="text-center mb-16">
        <h4 className=" font-bold  mt-3 text-xl tracking-wider">Edit Item:-</h4>
      </div>

      <h4 className=" text-sm mb-2 block">Edit Image:-</h4>

      <FileUploaderRegular
      onChange={handleChangeEvent}
    pubkey="bff1bd53d96605d649e2"
    maxLocalFileSizeBytes={10000000}
    multiple={false}
    imgOnly={true}
    sourceList="local, url, camera, dropbox"
    classNameUploader="my-config uc-light"
    className='my-4'
    />
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
          <div>
            <label className="text-sm mb-2 block">Name</label>
            <input type="text"placeholder="enter name" name="name" onChange={handleChange} value={currData.name} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400" />
          </div>
          <div>
            <label className="text-sm mb-2 block">Price</label>
            <input type="number" placeholder="price" name="price" onChange={handleChange} value={currData.price} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400"  />
          </div>
          <div>
          <button type="button" className={`min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white ${deleteItem ? 'bg-red-600':'bg-yellow-400 hover:bg-red-600 focus:outline-none'} `} onClick={()=>{setDeleteItem(prev =>(!prev))}}>
            Delete
        </button>
          </div>
        </div>
        <div className="!mt-10 flex gap-3">
          <button className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-yellow-400 hover:bg-slate-950 focus:outline-none" >
            Edit
          </button>
        </div>
      </form>
    </div>
</div>
</div>)
}