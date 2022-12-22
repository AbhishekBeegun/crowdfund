import React , {useState} from 'react';
import { Link , useNavigate} from "react-router-dom";

import {CustomButton} from './';
import{logo,menu,search,thirdweb} from '../assets';
import { navlinks} from '../constants';
import { useStateContext } from "../context";


const Navbar = () => {
    {/*address pu connect oubien create campaign  data from useStatecontext*/}

  const{ connect ,address} = useStateContext();

  {/*navigate used kan bzn nav directly no oading to next page */}
  const navigate = useNavigate();

  const [isActive, setisActive] = useState('dashboard');
  const [toggleDrawer, settoggleDrawer] = useState(false);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      {/*navbar content */}
     <div className="lg:flex-1 flex max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
      {/*for search input => Campaign */}
      <input type="text" placeholder="Search for Campaign" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />
      <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
        <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/> 
      </div>
     </div>

     {/*Custom Button Component login or logout */}
     {/*address ? => si ena 1 address display create a campgin sinon display connnect*/}
     <div className="sm:flex hidden flex-row justify-end gap-4">
      <CustomButton
      btnType="button"
      title={address ? 'Create a campaign' : 'Connect'}
      styles={address ? 'bg-[#1dc071]': 'bg-[#8c6dfd]'}
      handleClick={() => {
        if(address) navigate('create-campaign')
        else connect();
      }}/>
     

     <Link to="/profile">
      <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
        <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
      </div>
     </Link>
    </div>

    {/*phone navbar burger instead of using onClick={() => settoggleDrawer(!toggleDrawer)}/> use prevState below */}

    <div className="sm:hidden flex justify-between items-center">
      <div className="w-[40px] h-[40px] rounded-lg bg-[#2c2f32] flex justify-center items-center cursor-pointer">
        <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain"/>
      </div>
      <img src={menu} alt="menu" className="w-[40px] h-[34px] object-contain cursor-pointer"
      onClick={() => settoggleDrawer((prev) => !prev)}/>

      <div className={`absolute top-16 right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
        <ul className="mb-4">
          {navlinks.map((Link) => (
            <li key={Link.name} className={`flex p-4 ${isActive === Link.name && 'bg-[#3a3a43]'}`}
            onClick={() => {
              setisActive(Link.name);
              settoggleDrawer(false);
              navigate(Link.link);
            }}>
              <img src={Link.imgUrl}   alt={Link.name} className={`w-[24px] h-[24px] object-contain ${isActive === Link.name ? 'grayscale-0' : 'grayscale'}`}/>
              <p className={`ml-[20px] font-epilogue font-semibold text-xs ${isActive === Link.name ? 'text-[#1dc071]' : 'text-[#8080191]'}`}>
                {Link.name}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex mx-4">
        <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-[#1dc071]': 'bg-[#8c6dfd]'}
          handleClick={() => {
          if(address) navigate('create-campaign')
          else connect();
        }}/>

        </div>
      </div>
    </div>


    </div>
  )
}

export default Navbar