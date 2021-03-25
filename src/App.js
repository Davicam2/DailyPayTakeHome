import './App.css';
import api from './Api/Api'
import Catagory from './Components/Category/Category';
import Modal from './Components/modal/modal';
import React, {useState, useEffect} from 'react';

function App() {
  const [selectedNoms, setSelectedNoms] = useState({selections: []});
  const [submitState, setSubmitState] = useState(false);
  const [showModal, setModalState] = useState(false);
  const [ballots, setBallots] = useState([]);
  let nominations = [];
  
  useEffect(() => {
    api.getBallotData()
    .then(res => {
      setBallots(res.items)
    })
  }, [])

  function updateNominations(nomination){
    let index = nominations.findIndex(nom => nom.category === nomination.category);
    if(index === -1){
      nominations.push(nomination);
    } else{
      nominations[index] = nomination;
    }
    if(nominations.length === ballots.length){
      setSelectedNoms(nominations);
      setSubmitState(true);
    }
  }

  function closeModal() {
    //very not happy about this but not sure 
    //how to get the grandchild to rerender
    window.location.reload();
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          AWARDS 2021
        </p>
      </header>
      <div className="App-content">
      {ballots.map((cat,i) => 
      <Catagory 
        key={i}
        id={cat.id}
        category={cat.title}
        nominiees={cat.items}
        reportNomination={updateNominations}
        >
      </Catagory>)}
      </div>
      <button 
        className='submit-ballots font-med' 
        onClick={() => setModalState(true)}
        disabled={!submitState}
      >SUBMIT BALLOTS</button>
      <Modal 
      show={showModal} 
      nominations={selectedNoms} 
      onClose={closeModal}
      ></Modal>
    </div>
  );
}

export default App;
