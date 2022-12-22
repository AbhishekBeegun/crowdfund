import React from 'react';
import { tagType,thirdweb } from "../assets";
import {daysLeft} from '../utils';


{/*this is used for home page and profile each campaign info can be acess as array is spread ...campaign */}
const FundCard = ({owner,title,description,target,deadline,amountCollected,image,handleClick}) => {

    const remainingDays = daysLeft(deadline);
  return (

    <div className="sm:w-[288px] w-full rounded-2xl bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
      {/*image section */}
     <img src={image} alt="Fund" className="w-full h-40 object-cover rounded-2xl"/> 
     <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-4">
            <img src={tagType} alt="tag" className="w-4 h-4 object-contain"/>
            <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-sm text-slate-400">Health</p>
        </div>
        {/* title and description truncate shrinks the text if too long */}
        <div className="block font-epilogue text-sm text-white leading-6 truncate">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>


        {/* aMount Raised and days left*/}
        <div className="flex justify-between flex-wrap mt-4 gap-2 font-epilogue text-white leading-6">
            <div className="flex flex-col">
                <h4>{amountCollected}</h4>
                <p>Raised of {target}</p>
            </div>

            <div className="flex flex-col">
                <h4>{remainingDays}</h4>
                <p>Days left</p>
            </div>
        </div>
       {/*organizer of the campaign swa owner */}
        <div className="flex items-center mt-5 gap-3">
            <div className="w-8 h-8 rounded-full flex justify-center items-center bg-slate-900">
                <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
            </div>
            <p className="flex-1 font-epilogue text-xs text-red-500 truncate">by <span className="text-white">{owner}</span></p>
        </div>


     </div> 

    </div>
  )
}

export default FundCard