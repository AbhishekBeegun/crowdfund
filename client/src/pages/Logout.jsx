import React from 'react';
import { useDisconnect } from "@thirdweb-dev/react";

const Logout = () => {
const disconnect = useDisconnect();

  return (
    <div className="flex justify-center items-center">
        <button className="w-1/2 h-[100px] rounded-lg bg-red-500 text-white text-2xl"
        onClick={disconnect}>Logout put btn in nav
        </button>
    </div>
  )
}

export default Logout