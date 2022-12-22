import React from 'react';
import { useNavigate } from "react-router-dom";

import {loader} from '../assets';
import FundCard from "./FundCard";


const DisplayCampaigns = ({ title,isLoading,campaigns}) => {
 const navigate = useNavigate();

 {/*tageting campaign => title acts as ID to displau CampaignDetails.jsx */}

 const handleNavigate = (campaign) =>{
  navigate(`/campaign-details/${campaign.title}`,{state:campaign})
 }

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-xl text-white">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-5 gap-6">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain"/>
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-sm leading-7 text-slate-500">
            No Campaign Created yet.
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard
        key={campaign.id} 
        {...campaign}
        handleClick = {() => handleNavigate(campaign)} />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns