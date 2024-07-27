import React from 'react'
import { X } from 'lucide-react';
import axios from 'axios';

import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

export default function AddItem({onClose , merchant}) {
    const [data,setData]=React.useState({
        name:"",
        price:""
    });

    const modelRef=React.useRef();

    function handleChange(event){
        setData(prev =>{
            return{
                ...prev,
                [event.target.name]:event.target.value
            }
        })
    }
    function handleSubmit(event){
        event.preventDefault();
        const result={
            name:data.name,
            price:data.price,
            available:true,
            shop_id:merchant.id,
            shop:merchant.shop,
            image:imageUrl
        }
        console.log(result);

        axios.post("http://localhost:3000/all",result)
        .then(res=>{console.log(res)})
        .catch(err =>{console.error(err)});

        onClose();
    }


    function closeModel(event)
    {
        if(modelRef.current === event.target){
            onClose();
        }
    }

  const [imageUrl, setImageUrl] = React.useState("");
  
  const handleChangeEvent = (items) => {
    const uploadedFiles = items.allEntries.filter((file) => file.status === 'success');
    
    if (uploadedFiles.length > 0) {
      const cdnUrl = uploadedFiles[0].cdnUrl;
      setImageUrl(cdnUrl);
      console.log('CDN URL of the just-uploaded image:', cdnUrl);
    }
  }

  return (
    <div ref={modelRef} onClick={closeModel} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
    <div className=" mt-14 mx-10 bg-white rounded-xl">
    
    <div className="rounded-xl border-2 border-yellow-400 max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6 ">
    <button className='place-self-end' onClick={()=> onClose()}><X/></button>
      <div className="text-center mb-16">
        <h4 className=" font-bold  mt-3 text-xl tracking-wider">Add Item:-</h4>
      </div>
      <h4 className=" text-sm mb-2 block">Add Image:-</h4>

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
            <input type="text"placeholder="enter name" name="name" onChange={handleChange} value={data.name} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400" />
          </div>
          <div>
            <label className="text-sm mb-2 block">Price</label>
            <input type="number" placeholder="price" name="price" onChange={handleChange} value={data.price} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-yellow-400"  />
          </div>
        </div>
        <div className="!mt-10">
          <button className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-yellow-400 hover:bg-slate-950 focus:outline-none" >
            Add Item
          </button>
        </div>
      </form>
    </div>
</div>
</div>
  )
}
