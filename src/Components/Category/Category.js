import './Category.css'

import React, {useState} from 'react';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';

import Ballot from '../Ballot/Ballot';



const Catagory = (props) => {

  let title = props.category;
  let mediaClasses = {
    categoryBase: 'category-block',
    medScreen: 'group-med',
    smScreen: 'group-sm'
  }
  let categoryClasses = mediaClasses.categoryBase;
  const isMedScreen = useMediaQuery({
    maxDeviceWidth: 1000
  })
  const isSmScreen = useMediaQuery({
    maxDeviceWidth: 600
  })

  if(isSmScreen){
    categoryClasses = `${mediaClasses.categoryBase} ${mediaClasses.smScreen}`
  } else if (isMedScreen){
    categoryClasses = `${mediaClasses.categoryBase} ${mediaClasses.medScreen}`
  }

  //set initial state of ballot objects and add isSelected property
  const [noms, setNominees] = useState(props.nominiees.map((nom) => {
    return {
      ...nom,
      isSelected: false
    }
  }));

  //on child function update, rerender the sections ballots
  function onBalletSelected(evt) {
    noms.forEach(nom => {
      
      if(nom.id === evt.target.value){
        nom.isSelected = true;
        props.reportNomination({category:props.category, nomination: nom });
      } else {
        nom.isSelected = false;
      }
      
    });
    setNominees([...noms]);
  }

  return (
    <div role='group' className={categoryClasses}>
        <div className='category-title font-med'>{title}</div>
        <div className='category-content'>
          {noms.map((nom,i) => 
          <Ballot 
            name={nom.title} 
            image={nom.photoUrL} 
            id={nom.id} 
            key={i} 
            isSelected={nom.isSelected}
            onBalletSelected={onBalletSelected}
          /> )}
        </div>
    </div>
  )
}

export default Catagory;