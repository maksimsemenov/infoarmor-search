import React, { PropTypes } from 'react'
import sections from './items'
import { capitalize } from './utils'
import './Menu.css'

const Menu = ({ value, selectedTags, onItemClick, onMouseDown }) => {
  const filteredSections = Object.keys(sections)
    .map(section => {
      const sectionTags = selectedTags
        .filter(tag => tag.label === section)
        .map(tag => tag.value)

      return {
        section,
        cols: sections[section]
        .filter(item => value ? item.indexOf(value.toLowerCase()) !== -1 : true)
        .filter(item => sectionTags.indexOf(item) === -1)
        .sort()
        .slice(0, 12)
        .reduce((cols, item, i) => {
          let colIndex = Math.floor(i / 4)
          cols[colIndex] = cols[colIndex] ? [...cols[colIndex], item] : [item]
          return cols
        }, [])
      }
    })
    .filter(s => s.cols.length)


  return (
    <div className='menu' onMouseDown={onMouseDown}>
      {filteredSections.length ? (
        filteredSections.map(({ section, cols }, index) =>
          <div className='menu__section' key={index}>
            <div className='menu__section-name'>{capitalize(section + 's')}</div>
            <div className='menu__section-items'>
              {cols.map((items, i) =>
                <div key={i} className='menu__col'>
                  {items.map((item, i) =>
                    <div
                      key={i}
                      className='menu__item'
                      onClick={() => onItemClick({ value: item, label: section})}
                    >{capitalize(item)}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <div className='menu__empty-state'>No sugestions were found</div>
      )}
    </div>
  )
}

Menu.propTypes = {

}

export default Menu
