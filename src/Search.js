import React, { Component } from 'react'
import Tag from './Tag'
import Menu from './Menu'
import { uniqueKey } from './utils'
import './Search.css'


class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      tags: [],
      currentValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleTagMouseDown = this.handleTagMouseDown.bind(this)
  }
  componentDidUpdate() {
    this.ignoreOpen = false
    this.ignoreBlur = false
  }
  handleChange(e) {
    this.setState({ currentValue: e.target.value })
  }
  handleKeyDown(e) {
    switch (e.key) {
      case 'Escape':
        this.setState({ open: false, currentValue: '' })
        this.input.blur()
        break
      default:
        return
    }
  }
  handleBlur() {
    if (this.ignoreBlur) return
    this.setState({ open: false })
  }
  handleSearchClick(e) {
    console.log('search click', this.ignoreOpen)
    if (this.ignoreOpen) return
    this.setState({ open: true })
    this.input.focus()
  }
  handleRemoveTag(tagId) {
    this.setState(state => ({
      tags: state.tags.filter(tag => tag.id !== tagId)
    }))
  }
  handleItemClick({ label, value }) {
    this.setState(state => ({
      tags: [...state.tags, { label, value, id: uniqueKey() }],
      currentValue: ''
    }))
    this.ignoreBlur = false
  }
  handleMouseDown() {
    this.ignoreBlur = true
  }
  handleTagMouseDown() {
    this.ignoreBlur = true
    if (this.state.open) return
    this.ignoreOpen = true
  }
  render() {
    const { open, tags, currentValue } = this.state

    return (
      <div className={`search${open ? ' has-focus' : ''}`} onClick={this.handleSearchClick}>
        {tags.map(tag =>
          <Tag
            {...tag}
            key={tag.id}
            onRemove={() => this.handleRemoveTag(tag.id)}
            onMouseDown={() => this.handleTagMouseDown()}
          />
        )}
        <input
          className='search__input'
          ref={c => this.input = c}
          value={currentValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
          placeholder='Type to search...'
        />
        {open &&
          <Menu
            value={currentValue}
            onItemClick={this.handleItemClick}
            onMouseDown={() => this.handleMouseDown()}
            selectedTags={tags}
          />
        }
      </div>
    )
  }
}

export default Search
