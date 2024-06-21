import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeartPulse} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (<>
  <div className='flex flex-row justify-between items-center bg-blue-200'>
    <div className='font-bold'>Disease:</div>
    <div className=''>
    <FontAwesomeIcon icon={faHeartPulse} size='4x' /></div>
  </div>
  </>
  )
}

export default Header