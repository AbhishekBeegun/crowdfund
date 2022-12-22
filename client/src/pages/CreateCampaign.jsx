import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {ethers} from 'ethers';

import { useStateContext } from "../context";


import { money } from "../assets";

import { CustomButton,FormField } from "../components";

import {checkIfImage} from '../utils';
const CreateCampaign = () => {

  const { createCampaign } = useStateContext();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    name:"",
    title:"",
    description:"",
    target:"",
    deadline:"",
    image:""
  });

{/*code below pren tou seki ena dn nu form ek renplace zt --e.preventDefault(); enpess reload on submit amust in react form*/}
  const handleFormFieldChange = (fieldName,e) => {
    setform({ ...form,[fieldName] : e.target.value})
  }

  {/*onSubmit semd data to third web...spred form and check if image iss valid if not else executed----target:ethers.utils.parseUnits(form.target, 18) sanla obligatiore fer li akz ETH decimal places*/}
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image,async(exists) =>{
      if(exists){
      setisLoading(true)
      await createCampaign({ ...form,target:ethers.utils.parseUnits(form.target, 18)})
      setisLoading(false);
      navigate('/');
    } else {
      alert("Enter a Valid URL Eg:Google Search for image => Right Click select open image new tab copy link paste here")
      setform({...form,image:""});
    }
   
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-lg sm:p-10 p-4">
     {isLoading && 'Loader...'}
     <div className="flex justify-center items-center p-4 sm:min-w-[380px] bg-red-500 rounded-lg">
      <h1 className="font-epilogue font-bold sm:text-2xl text-xl text-white leading-10">Start Campign</h1>
     </div>

     {/*FormField consist of a single label avk input module */}

     <form onSubmit={handleSubmit} className="w-full mt-16 flex flex-col gap-8">
      <div className="flex flex-wrap gap-10">
        <FormField
        labelName="Your Name *"
        placeholder="Abhishek Beegun"
        inputType="text"
        value={form.name}
        handleChange={(e) => handleFormFieldChange('name',e)} />

        <FormField
         labelName="Campaign Title *"
         placeholder="Title"
         inputType="text"
         value={form.title}
         handleChange={(e) => handleFormFieldChange('title',e)} />
      </div>

        <FormField
         labelName="Story Details *"
         placeholder="Write Story"
         isTextArea
         value={form.description}
         handleChange={(e) => handleFormFieldChange('description',e)} />
         
         {/*div below is a banner pu bez kass */}

         <div className="w-full flex justify-start items-center p-4 bg-emerald-400 rounded-lg h-36">
          <img src={money} alt="money" className="w-10 h-10 object-contain" />
          <h4 className="font-epilogue font-bold text-2xl text-white ml-5">All money raised is 100% yours</h4>
         </div>

        <div className="flex flex-wrap gap-10">
                 
        <FormField
         labelName="Amount needed *"
         placeholder="ETH 0.50"
         inputType="text"
         value={form.target}
         handleChange={(e) => handleFormFieldChange('target',e)} />
        
        <FormField
         labelName="Deadline*"
         placeholder="Deadline"
         inputType="date"
         value={form.deadline}
         handleChange={(e) => handleFormFieldChange('deadline',e)} />
        </div>


        <FormField
         labelName="Campaign Images*"
         placeholder="Place Image URL here"
         inputType="url"
         value={form.image}
         handleChange={(e) => handleFormFieldChange('image',e)} />
   

         <div className="flex justify-center items-center mt-10">
          <CustomButton 
          btnType="submit"
          title="Submit new Campaign"
          styles="bg-red-400"/>
         
         </div>
      
     </form>
    </div>
  )
}

export default CreateCampaign