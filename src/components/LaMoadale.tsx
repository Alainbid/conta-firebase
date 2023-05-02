import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

// interface LaMoadale {
//   open:boolean,
//   onClose:boolean
// }
const LaMoadale = (onClose:any , open:boolean) => {
  if(!open) return(null);
  
  return (
    <div>
      <h3>la modale</h3>
      <Button onClick={onClose}>fermer</Button>
      
    </div>
  )
}

LaMoadale.propTypes = {
open:PropTypes.bool,
onClose:PropTypes.func
}

export default LaMoadale
