import React from 'react'

function App() {
  return (
    <>
      {/* Div for Search and Add notes */}
      <div className="bg-red-500 flex flex-row w-screen justify-around items-center md:mt-[62px] mt-[31px]">
        <div className='w-3/5 relative flex flex-row'>
          <input placeholder='Search notes...' className='bars bars-texts w-full px-5'/>
          <button 
            className='bars bars-texts min-w-[10%] absolute right-0 bg-[#E8E8E8]'
            
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <button 
          className='bars w-1/5 bars-texts bg-white max-w-[162px]'
        >
          Add notes
        </button>
      </div>
      {/* End for div of Search and Add notes */}
      <div className=''>Notes should be here</div>
    </>
  );
}

export default App;
