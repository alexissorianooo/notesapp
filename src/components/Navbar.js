import React from 'react'

export default function Navbar(props){
    return(
        <div className="w-full pt-[16px] flex flex-row justify-end relative xl:fixed right-8 top-2 xl:w-0">
            <button 
                className={`bars bars-texts bar-buttons sm:ml-7 rounded-full p-5 flex justify-center items-center  ${!props.darkMode ? 'bg-gray-700' : 'bg-[#FFEBD9]'}`}
                onClick={props.handleDarkButton}
            >
            <i className={`fa-solid ${!props.darkMode ? `fa-moon text-white` : 'fa-cloud-sun text-gray-700' }`}></i>
          </button>
        </div>
    )
}