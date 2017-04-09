import React, { PropTypes } from 'react'
import './Tag.css'

const Tag = ({ label, value, onRemove, onMouseDown, onMouseUp }) => (
  <div className='tag' onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
    {label && <div className='tag__label'>{label}</div>}
    <div className='tag__value'>{value}</div>
    <div className='tag__remove' onClick={() => onRemove()}>
      <svg viewBox='0 0 16 16' className='tag__remove-icon'>
        <polyline points='4,4 12,12'/>
        <polyline points='4,12 12,4'/>
      </svg>
    </div>
  </div>
)

Tag.propTypes = {

}

export default Tag
