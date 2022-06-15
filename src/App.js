import React from 'react';
import Modal from './components/Modal';
import Notes from './components/Notes';

function App() {
  const [showModal, setShowModal] = React.useState(false)
  const [favorite, setFavorite] = React.useState(false)

  let noteKeyNumber = 0
  if(localStorage.getItem("noteNumber") === null){
    noteKeyNumber = localStorage.setItem("noteNumber", 0)
  }else{
    noteKeyNumber = localStorage.getItem("noteNumber")
  }

  const [note, setNote] = React.useState({
    noteID: parseInt(noteKeyNumber) || 0,
    noteTitle: '',
    noteContent: '',
    noteFavorite: favorite
  })

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
    if(favorite){
      setNote(prevState => {
        return{
          ...prevState,
          noteFavorite: favorite
        }
      })
    }
    if(note.noteContent !== '' && note.noteTitle !== ''){
      localStorage.setItem("note"+note.noteID, JSON.stringify(note))
      localStorage.setItem("noteNumber", parseInt(noteKeyNumber)+1)
      resetNote()
    }
    setFavorite(false) // reset the favorite to false
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

  function handleFavorite(){
    setFavorite(prevState => {
      return !prevState
    })
  }

  function handleFavoriteNotes(noteIDNumber){
    let noteID = "note"+noteIDNumber
    console.log(noteID)
    let parsedlocalStorage = JSON.parse(localStorage.getItem(noteID))
    let updatedFavorite = {...parsedlocalStorage, noteFavorite: !parsedlocalStorage.noteFavorite}
    localStorage.setItem(noteID, JSON.stringify(updatedFavorite))
    // localStorage.setItem("note"+notesID)
    resetNote()
  }

  return (
    <div className='h-screen w-screen'>
      {showModal && <Modal 
        handleButton={handleAddButton}
        handleChange={(event) => handleInput(event)}
        handleSave={handleSaveButton}
        isFavorite={favorite}
        handleFavorite={handleFavorite}
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
      <div className='notes-container notes-container-responsive mt-8'>
        {Object.keys(localStorage)
          .filter((items) => items!=="noteNumber")
          .map(items => items.substring(4))
          .sort((a,b) => {return a-b})
          .map(items => <Notes 
                          key={JSON.parse(localStorage.getItem("note"+items)).noteID}
                          noteID={JSON.parse(localStorage.getItem("note"+items)).noteID}
                          noteTitle={JSON.parse(localStorage.getItem("note"+items)).noteTitle}
                          noteContent={JSON.parse(localStorage.getItem("note"+items)).noteContent}
                          noteFavorite={JSON.parse(localStorage.getItem("note"+items)).noteFavorite}
                          handleFavoriteNotes={() => handleFavoriteNotes(JSON.parse(localStorage.getItem("note"+items)).noteID)}
                        />
          )}
      </div>
      {/* End of div for Notes */}
      
    </div>
  );
}

export default App;
