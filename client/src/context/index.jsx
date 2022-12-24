//for web3 interact with smart contracts
 import React,{useContext,createContext} from "react";
 import {useAddress,useContract,useMetamask,useContractWrite} from "@thirdweb-dev/react";

 import {ethers} from 'ethers';

 const StateContext = createContext();

{/*children allow use pu ggn access a nu statecontextprovider dn entire APP in main.jsx */}
 export const StateContextProvider = ({children}) =>{
    {/*contract => acesss for account with deployed contracts on thirdwen dashbnoard */}
    const { contract} = useContract("0xbc70773bF059C3c413a0F7473F17fF4600cD41ca");
    {/*Pulling write function eg:CreateCampaign ek donatetocampaign ref => CrowdFunding.sol */}
    const { mutateAsync : createCampaign} = useContractWrite(contract,'createCampaign');
    {/*address pu wallet */}
    const address = useAddress();

    const connect = useMetamask();

    {/*bien imprtant publish campaign pu consist form submited in create campaign in following ORDER ref=>CrowdFunding.sol line 21 same ORDER */}
    const publishCampaign = async (form) => {

        try{
            const data = await createCampaign([
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ])
            console.log("SMART CONTACT PULLED SUCESS",data)

        }catch(error){
            console.log("SMART CONTACT PULLED FAIL",error)
            
        }

    }
    {/*data fetch en vin BIGNUMBER =v convert to uman lang */}
    {/*in our SMRT CONTract nu call getCampaigns <= data CrowdFunding.sol line58  */}
    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');
        {/* code below takes data in campaigns */}
        const parsedCampaigns = campaigns.map((campaign) => ({
            owner: campaign.owner,
            title:campaign.title,
            description:campaign.description,
            target:ethers.utils.formatEther(campaign.target.toString()),
            deadline:(campaign.deadline.toNumber()),
            amountCollected:ethers.utils.formatEther(campaign.amountCollected.toString()),
            image:campaign.image,
            pId:1                        
        }));
        return (parsedCampaigns)
    }
 

    {/*Campaign created by owners PROFILE----fiter can be use for search campaign also or search by category */}
    const getuserCampaigns = async () => {
        const allCampaigns = await getCampaigns();
        const filteredCampaigns = allCampaigns.filter((campaign) =>
        campaign.owner === address);

        return filteredCampaigns;

    }

    {/**to accept doanation pId =>project Id given by thirdweb--- donateToCampaign dn smart contract*/}
    const donate = async (pId,amount) => {
        const data = await contract.call('donatetoCampaign' , pId,{value: ethers.utils.parseEther(amount)});

        return data;
    }

    const getDonations = async(pId) => {
        const donations = await contract.call('getDonators', pId);
        const numberofDonations = donations[0].length;

        const parsedDonations = [];

        for( let i = 0; i < numberofDonations; i++){
            parsedDonations.push({
                donator : donations[0][i],
                donation : ethers.utils.formatEther(donations[1][i].toString())
            })
        }
        return parsedDonations;
    }

 return (
     <StateContext.Provider
      value={{ address,contract,connect,createCampaign:publishCampaign,getCampaigns,getuserCampaigns,donate,getDonations}}
      >
        {children}
     </StateContext.Provider>
     
     )

 }

 export const useStateContext = () => useContext(StateContext)