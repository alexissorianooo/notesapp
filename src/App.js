import React from 'react';
import Modal from './components/Modal';
import Notes from './components/Notes';

function App() {
  const [showModal, setShowModal] = React.useState(false)

  let noteKeyNumber = 0
  if(localStorage.getItem("noteNumber") === null){
    noteKeyNumber = localStorage.setItem("noteNumber", 0)
  }else{
    noteKeyNumber = localStorage.getItem("noteNumber")
  }

  const [note, setNote] = React.useState({
    noteID: parseInt(noteKeyNumber) || 0,
    noteTitle: '',
    noteContent: ''
  })
  console.log("localStorage:", noteKeyNumber)

  function handleAddButton(){
    setShowModal(prevState => !prevState)
    if(!showModal){
      setNote(prevState => {
        return{
          ...prevState,
          noteID: prevState.noteID+=1
        }
      })
    }
  }

  function resetNote(){
    setNote(prevState => {
      return{
        ...prevState,
        noteTitle: '',
        noteContent: ''
      }
    })
  }

  function handleSaveButton(){
    if(note.noteContent !== '' && note.noteTitle !== ''){
      localStorage.setItem("note"+note.noteID, JSON.stringify(note))
      localStorage.setItem("noteNumber", parseInt(noteKeyNumber)+1)
      resetNote()
    }
    setShowModal(prevState => !prevState)
  }

  function handleInput(event){
    let {name, value} = event.target
    setNote(prevState => {
      return{
        ...prevState,
        [name]: value
      }
    })
  }

  return (
    <div className='h-screen w-screen'>
      {showModal && <Modal 
        handleButton={handleAddButton}
        handleChange={(event) => handleInput(event)}
        handleSave={handleSaveButton}
        />}
      {/* Div for Search and Add notes */}
      <div className="flex flex-row w-screen justify-center items-center md:pt-[62px] pt-[31px]">
        <div className='w-3/5 relative flex flex-row'>
          <input placeholder='Search notes...' className='bars bars-texts w-full px-5'/>
          <button 
            className='bars bars-texts min-w-[10%] w-1/5 lg:w-[10%] absolute right-0 bg-[#E8E8E8]'
            
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <button 
          className='bars w-1/5 bars-texts bg-white max-w-[162px] ml-7'
          onClick={handleAddButton}
        >
          Add notes
        </button>
      </div>
      {/* End of div for Search and Add notes */}
      {/* Div for Notes */}
      <div className='notes-container bg-red-300 mt-8'>
        {Object.keys(localStorage)
          .filter((items) => items!=="noteNumber")
          .map(items => <Notes 
                          noteID={JSON.parse(localStorage.getItem(items)).noteID}
                          noteTitle={JSON.parse(localStorage.getItem(items)).noteTitle}
                          noteContent={JSON.parse(localStorage.getItem(items)).noteContent}
                        />
          )}
      </div>
      {/* End of div for Notes */}
      
    </div>
  );
}

export default App;
