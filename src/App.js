import React from 'react'

function App() {
  return (
    <>
      {/* Div for Search and Add notes */}
      <div className="flex flex-row w-screen justify-center items-center md:mt-[62px] mt-[31px]">
        <div className='w-3/5 relative flex flex-row'>
          <input placeholder='Search notes...' className='bars bars-texts w-full px-5'/>
          <button 
            className='bars bars-texts min-w-[10%] w-1/5 lg:w-[10%] absolute right-0 bg-[#E8E8E8]'
            
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <button 
          className='bars w-1/5 bars-texts bg-white max-w-[162px] ml-7'
        >
          Add notes
        </button>
      </div>
      {/* End of div for Search and Add notes */}
      {/* Div for Notes */}
      <div className=''>Notes should be here</div>
      {/* End of div for Notes */}
    </>
  );
}

export default App;
