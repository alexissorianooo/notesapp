import React from 'react'

export default function Notes(props){

    let favorite = JSON.parse(localStorage.getItem("note"+props.noteID)).noteFavorite

    return(
        <div className='bg-white w-72 min-h-72 my-2 sm:h-full sm:justify-self-center'>
            <div className='min-h-1/5 p-4 font-bold text-lg flex '>
                <div className='w-4/5'>{props.noteTitle}</div>
                <br/>
                <button
                    className='w-1/5'
                    onClick={props.handleFavoriteNotes}
                >
                    <i className={`${favorite ? "fa-solid text-red-500" : "fa-regular"} fa-heart`}></i>
                </button>
            </div>
            <hr />
            <div className='h-3/5 p-4'>
                {props.noteContent}
            </div>
        </div>
    )
}