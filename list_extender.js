'use strict'
console.log('----------')
console.log('list extender loaded')

function ExtendingList (classes = '', id = null) {
  const _self = document.createElement('UL')
  classes.split(' ').forEach(c => {
    _self.classList.add(c)
  })
  if (id) {
    _self.id = id
  }

  _self.listItems = []
  _self.inputType = 'text'
  _self.inputPlaceholder = ''

  /* === Helper Functions === */
  const getInputElement = () => {
    const input = document.createElement('INPUT')
    input.setAttribute('type', _self.inputType)
    input.setAttribute('placeholder', _self.inputPlaceholder)
    input.setAttribute('key', _self.listItems.length)
    return input
  }

  const validate = () => {
    // Validates the current active input
  }

  const turnToList = () => {
    // Turns the active input to a list element
  }
  /* ========================= */
  
  _self.setInputType = type => {
    _self.inputType = type
  }

  _self.setPlaceholder = placeholder => {
    _self.inputPlaceholder = placeholder
  }

  _self.addListItem = () => {
    const li = document.createElement('LI')
    const input = getInputElement()
    li.appendChild(input)
    _self.appendChild(li)
  }

  _self.addEventListener('mousedown', event => {
    // If target is not input, force focus out event
  })

  _self.addEventListener('focusout', () => {
    // Validate, and turn to list
  })

  return _self
}
