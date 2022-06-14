import React from 'react'

export default function Notes(props){
    return(
        <div className='bg-white w-72 min-h-72 my-2 sm:h-full sm:justify-self-center'>
            <div className='min-h-1/5 p-4 font-bold text-lg'>
                {props.noteTitle}
                <br/>
                favorite: {(false).toString()}
            </div>
            <hr />
            <div className='h-3/5 p-4'>
                {props.noteContent}
            </div>
        </div>
    )
}