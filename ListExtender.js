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
    input.setAttribute('required', '')
    return input
  }

  const validate = input => {
    // Validates the current active input
    if (input.checkValidity()) {
      return true
    } else {
      input.reportValidity()
      return false
    }
  }

  const turnToList = input => {
    // Turns the active input to a list element
    const li = input.parentElement
    li.removeChild(input)
    li.appendChild(document.createTextNode(input.value))
  }

  const turnToInput = li => {
    const input = getInputElement()
    input.value = li.innerText
    li.removeChild(li.firstChild)
    li.appendChild(input)
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

  _self.addEventListener('focusout', event => {
    // Validate, and turn to list
    if (validate(event.target)) {
      turnToList(event.target)
    } else {
      event.preventDefault()
    }
  })

  _self.addEventListener('mousedown', event => {
    console.log(event.target)
    if (event.target.tagName === 'LI') {
      turnToInput(event.target)
    }
  })

  _self.addEventListener('input', event => {
    // if all inputs are valid, add another to list
    // TODO don't check newly added element
    const inputs = _self.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].checkValidity()) {
        return
      }
    }

    _self.addListItem()
  })

  return _self
}
