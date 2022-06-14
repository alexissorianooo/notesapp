import React from 'react'

export default function Modal(props){
    return(
        <>
            <div className='absolute bg-zinc-500 bg-opacity-60 h-screen w-screen z-30 flex justify-center items-center' onClick={props.handleButton}>
            </div>
            <div className='h-5/6 w-5/6 bg-white rounded-2xl flex flex-col justify-between z-40 fixed right-0 left-0 top-0 bottom-0 m-auto '>
                <div className='h-1/5 flex flex-col justify-center'>
                    <input 
                        placeholder='Note title...' 
                        className='font-bold text-2xl sm:text-4xl lg:text-6xl p-5 w-4/5 focus:outline-0'
                        name="noteTitle"
                        onChange={props.handleChange}
                    />
                    <hr />
                </div>
                <textarea 
                    placeholder='Enter notes here...'
                    className=' h-3/5 p-8 lg:p-20 text-lg focus:outline-0 focus:bg-slate-100'
                    name="noteContent"
                    onChange={props.handleChange}
                />
                <div className='h-1/5 flex justify-end items-center'>
                    <button 
                        className='button bars-texts bg-green-400 mr-5 p-2'
                        onClick={props.handleSave}
                    >
                        Save Note
                    </button>
                </div>
            </div>
        </>
    )
}