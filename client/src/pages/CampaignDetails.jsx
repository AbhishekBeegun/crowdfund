import React ,{useState ,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { CustomButton,CountBox } from "../components";
import { calculateBarPercentage,daysLeft } from "../utils";
import { thirdweb } from "../assets";


const CampaignDetails = () => {
  {/*state buildin react func allow us to get info about campaign selected line 14 in DisplayCampaign when we navigate */}
  const {state} = useLocation();
  const {getDonations,contract,address} = useStateContext();
  
  const [isLoading, setisLoading] = useState(false);
  const [amount, setamount] = useState('');
  const [donators, setdonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setdonators(data);
  }
  {/*ensure ki ena contract ek addres avn donation is sent */}
  useEffect(() => {
    if(contract) fetchDonators();

  },[contract,address])


  const handleDonate = async () => {
    setisLoading(true);

    await donate(state.pId,amount);
    setisLoading(false);

  }


  return (
    <div>
     {isLoading && 'Loading...'}

     <div className="w-full flex md:flex-row flex-col mt-30 gap-7">
      <div className="flex-1 flex-col">
        <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
        <div className="relative w-full h-1 bg-slate-500 mt-2">
          <div className="absolute h-full bg-emerald-300" style={{width:`${calculateBarPercentage(state.target,state.amountCollected)}%`,maxWidth:'100%'}}>
          </div>
        </div>
      </div>

      <div className="flex md:w-36 w-full lg:flex-wrap justify-between gap-7">
        <CountBox title="Days Left" value={remainingDays} />
        <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
        <CountBox title="Total Backers" value={donators.length} />
      </div>

     </div>

     <div className="flex mt-14 lg:flex-row flex-col gap-5">
      <div className="flex-[2] flex flex-col gap-10">
        {/**owner details */}
        <div>
         <h4 className="font-epilogue font-semibold text-sm text-white uppercase">Creator</h4>
         <div className="mt-5 flex flex-row items-center flex-wrap gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer">
            <img src={thirdweb} alt="owner" className="w-[60%] h-[60%] object-contain"/>
          </div>
          <div>
          <h4 className="font-epilogue font-semibold text-sm text-white break-all">{state.owner}</h4>
         </div>

        </div>

       

        {/*Story and description */}

        <div>
        <h4 className="font-epilogue font-semibold text-sm text-white uppercase">Story</h4> 
        </div>

        <div className="mt-5">
          <p className="font-epilogue text-base text-white">
            {state.description}
          </p>
        </div>

        {/*donations and Custom button  */}
        <div>
        <h4 className="font-epilogue font-semibold text-sm text-white uppercase">Donations</h4> 
        </div>

         <div className="mt-5 flex flex-col gap-4">
          {donators.lenght > 0 ? donators.map((item,index) =>(
            <div>
              donators
            </div>
          )) : (
            <p className="font-epilogue text-base text-white">
            No Donators yet
          </p>

          )}
         </div>
        </div>

     </div>
     <div className="flex-1">
     <h4 className="font-epilogue font-semibold text-sm text-white uppercase">Fund</h4>
     <div className="mt-5 flex flex-col p-4 bg-slate-700 rounded-lg">
      <p className="font-epilogue text-xl text-center text-slate-500">
        Fund The Campaign
      </p>

      <div className="mt-7">
        <input type="number" placeholder="ETH 0.1" step="0.01" className="w-full py-2 sm:px-5 px-4 outline-none border-[1px] border-teal-200 bg-transparent font-epilogue text-white text-lg" 
        value={amount} onChange={(e) => setamount(e.target.value)}/>

         <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
         </div>
         <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}/>
      </div>

     </div>
     </div>

     </div>
    </div>
    
  )
}

export default CampaignDetails