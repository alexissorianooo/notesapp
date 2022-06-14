import React from 'react'

export default function Notes(props){
    return(
        <div className='bg-slate-400 w-60 h-60 my-2'>
            <div>{props.noteTitle}</div>
            <div>{props.noteContent}</div>
        </div>
    )
}