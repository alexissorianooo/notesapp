import React from 'react';
// import Background from './components/Background';
import BackgroundStatic from './components/BackgroundStatic';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import Notes from './components/Notes';

function App() {
  const [showModal, setShowModal] = React.useState(false)
  const [favorite, setFavorite] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [showFavorite, setShowFavorite] = React.useState(false)
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(false)
  
  let noteKeyNumber = 0
  if(localStorage.getItem("noteNumber") === null){
    noteKeyNumber = localStorage.setItem("noteNumber", 1)
  }else{
    noteKeyNumber = localStorage.getItem("noteNumber")
  }
  const [note, setNote] = React.useState({
    noteID: parseInt(noteKeyNumber) || 0,
    noteTitle: '',
    noteContent: '',
    noteFavorite: favorite,
  })

  function handleAddButton(){
    setShowModal(prevState => !prevState)
    setShowEditModal(false)
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
        noteContent: '',
        noteID: parseInt(noteKeyNumber) || 0
      }
    })
  }

  function handleSaveButton(){
    if(note.noteContent !== '' && note.noteTitle !== ''){
      localStorage.setItem("note"+note.noteID, JSON.stringify({...note, noteFavorite: favorite})) // set the noteFavorite to localStorage setItem
      localStorage.setItem("noteNumber", parseInt(noteKeyNumber)+1)
      resetNote() 
    }
    setFavorite(false)
    setShowModal(false)
    setShowEditModal(false)
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

  function handleFavorite(edit,favorite){
    if(edit){
      setFavorite(!favorite)
    }else{
      setFavorite(prevState => {
        return !prevState
      })
    }
  }

  function handleFavoriteNotes(noteIDNumber){
    let noteID = "note"+noteIDNumber
    let parsedlocalStorage = JSON.parse(localStorage.getItem(noteID))
    let updatedFavorite = {...parsedlocalStorage, noteFavorite: !parsedlocalStorage.noteFavorite}
    localStorage.setItem(noteID, JSON.stringify(updatedFavorite))
    // localStorage.setItem("note"+notesID)
    resetNote()
  }

  function handleTrash(noteIDNumber){
    console.log(noteIDNumber)
    let noteID = "note"+noteIDNumber
    localStorage.removeItem(noteID)
    resetNote()
  }

  function handleSearch(event){
    let {value} = event.target
    setSearch(value)
  }
  
  let regexSearch = ''
  if(search){
    regexSearch = new RegExp(`${search}`, "i")
  }

  function handleShowFavorite(){
    setShowFavorite(prevState => !prevState)
  }

  function handleTransferToState(noteObject){
    setFavorite(noteObject.noteFavorite)
    setNote(prevState => {
      return{
        ...prevState,
        noteID: noteObject.noteID,
        noteTitle: noteObject.noteTitle,
        noteContent: noteObject.noteContent,
        noteFavorite: noteObject.noteFavorite,
      }
    })
  }

  function handleShowEditModal(){ // shows the modal for edit
    setShowModal(true)
    setShowEditModal(prevState => !prevState)
  }

  function handleDarkButton(){
    setDarkMode(prevState => !prevState)
  }

  return (
    <div className={`h-screen w-screen ${darkMode ? 'bg-gray-700' : 'bg-[#FFEBD9]'}`}>
      <BackgroundStatic />
      {showModal && <Modal 
        handleButton={handleAddButton}
        handleChange={(event) => handleInput(event)}
        handleSave={handleSaveButton}
        isFavorite={favorite}
        handleFavorite={() => {handleFavorite(false);}}
        />}
      {showEditModal && <Modal 
        handleButton={() => {handleAddButton();resetNote();}}
        handleChange={(event) => handleInput(event)}
        handleSave={handleSaveButton}
        isFavorite={favorite}
        handleFavorite={() => {handleFavorite(true,note.noteFavorite);}}
        noteID={note.noteID} 
        noteTitle={note.noteTitle}
        noteContent={note.noteContent}
      />}
      <Navbar 
        darkMode={darkMode}
        handleDarkButton={handleDarkButton}
      />
      {/* Div for Search and Add notes */}
      <div className="flex flex-col w-full justify-center items-center pt-[31px] xl:pt-[62px] sm:flex-row ">
        <div className='sm:w-3/5 w-4/5 relative flex flex-row sm:ml-7'>
          <input 
            placeholder='Search notes...' 
            className='bars bars-texts w-full px-5 focus:outline-none focus:drop-shadow-xl'
            onChange={handleSearch}
          />
          
        </div>
        <div className='w-full sm:w-2/5 lg:w-1/5 xl:w-1/6 sm:mt-0 flex flex-row justify-center items-center mt-3 sm:justify-start'>
          <button 
            className={`bars bars-texts bar-buttons sm:ml-7 rounded-full p-5 flex justify-center items-center ${showFavorite && `bg-red-500`}`}
            onClick={handleShowFavorite}
          >
            <i className={`fa-solid text-red-500 fa-heart ${showFavorite && `text-white`}`}></i>
          </button>
          <button 
            className='bars bars-texts bar-buttons sm:ml-7 sm:w-2/4 w-3/5 xl:rounded-2xl sm:max-w-[162px] ml-4'
            onClick={handleAddButton}
          >
            Add Notes
          </button>
        </div>
      </div>
      {/* End of div for Search and Add notes */}
      {/* Div for Notes */}
      <div className='notes-container notes-container-responsive mt-8 mb-8'>
        {Object.keys(localStorage)
          .filter((items) => items!=="noteNumber" )
          .map(items => items.substring(4))
          .sort((a,b) => {return a-b})
          .filter(items => search ? regexSearch.test(JSON.parse(localStorage.getItem("note"+items)).noteTitle) || regexSearch.test(JSON.parse(localStorage.getItem("note"+items)).noteContent) : items)
          .filter(items => showFavorite ? JSON.parse(localStorage.getItem("note"+items)).noteFavorite === true : items) // for favorite
          .map(items => <Notes 
                          key={JSON.parse(localStorage.getItem("note"+items)).noteID}
                          noteID={JSON.parse(localStorage.getItem("note"+items)).noteID}
                          noteTitle={JSON.parse(localStorage.getItem("note"+items)).noteTitle}
                          noteContent={JSON.parse(localStorage.getItem("note"+items)).noteContent}
                          noteFavorite={JSON.parse(localStorage.getItem("note"+items)).noteFavorite}
                          handleFavoriteNotes={() => handleFavoriteNotes(JSON.parse(localStorage.getItem("note"+items)).noteID)}
                          handleTrash={() => handleTrash(JSON.parse(localStorage.getItem("note"+items)).noteID)}
                          handleShowEditModal={() => {handleTransferToState(JSON.parse(localStorage.getItem("note"+items))); handleShowEditModal();}}
                        />
          )}
      </div>
      {/* End of div for Notes */}
    </div>
  );
}

export default App;
