import React from 'react';
import { useDisconnect } from "@thirdweb-dev/react";

const Logout = () => {
const disconnect = useDisconnect();

  return (
    <div className="flex justify-center items-center">
        <button className="w-full h-[100px] bg-red-300 text-white text-2xl"
        onClick={disconnect}>Logout
        </button>
    </div>
  )
}

export default Logout