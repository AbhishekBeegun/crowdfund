import React from 'react'

const CustomButton = ({btnType,title,handleClick,styles}) => {
  return (
    <button
    type={btnType}
    className={`font-epilogue font-semibold text-[16px] leading-6 text-white min-[52px] h-10 px-4 rounded-lg ${styles}`}
    onClick={handleClick}>
      {title}

    </button>
  )
}

export default CustomButton