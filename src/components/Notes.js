import React from 'react'

export default function Notes(props){

    let favorite = JSON.parse(localStorage.getItem("note"+props.noteID)).noteFavorite

    return(
        <div 
            className='bg-white w-72 min-h-72 my-2 sm:h-full sm:justify-self-center drop-shadow-sm hover:drop-shadow-lg flex flex-col'
        >
            <div className='min-h-1/5 p-4 font-bold text-2xl flex'>
                <div className='w-4/5' onClick={props.handleShowEditModal}>{props.noteTitle}</div>
                <br/>
                <button
                    className='w-1/5 text-2xl z-10'
                    onClick={props.handleFavoriteNotes}
                >
                    <i className={`${favorite ? "fa-solid text-red-500" : "fa-regular"} fa-heart hover:text-red-500`}></i>
                </button>
            </div>
            <hr />
            <div className='min-h-3/5 p-4 pb-12 text-lg' onClick={props.handleShowEditModal}>
                {props.noteContent}
            </div>
            
            <div className='absolute bottom-4 right-8 flex'> 
                {/* currently the trash icon is at the bottom most part of the note div */}
                {/* min-h-1/5 pb-4 px-4 */}
                {/* this will make the trash icon at the bottom of the note content */}
                <div className='w-4/5' onClick={props.handleShowEditModal}></div>
                <button 
                    className='w-1/5 text-2xl'
                    onClick={props.handleTrash}
                >
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
    )
}