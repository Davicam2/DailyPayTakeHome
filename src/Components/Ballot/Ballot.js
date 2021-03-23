import React from 'react';
import './Ballot.css';

const Ballot = (props) => {

  let ballotClass = props.isSelected ? 'ballot ballot-selected' : 'ballot'
  let buttonText = props.isSelected ? 'Nominated' : 'Nominate'
  return (
    <div  className={ballotClass}>
      <div className='ballot-title'>{props.name}</div>
      <img className='ballot-img' src={props.image} alt='Nominee' />
      <button 
        onClick={props.onBalletSelected} 
        value={props.id}  
        className='ballot-submit'
      >{buttonText}</button>
    </div>
  )

}

export default Ballot;