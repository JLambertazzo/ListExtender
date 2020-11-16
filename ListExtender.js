'use strict'
console.log('----------')
console.log('list extender loaded')

function ExtendingList (classes = '', id = null) {
  // Create element, set classis and id
  const _self = document.createElement('UL')
  classes.split(' ').forEach(c => {
    _self.classList.add(c)
  })
  if (id) {
    _self.id = id
  }

  let listSize = 0
  _self.inputChecks = []
  _self.maxSize = 100
  _self.attr = {
    type: 'text',
    placeholder: ''
  }

  /* === Helper Functions === */
  const getInputElement = () => {
    const input = document.createElement('INPUT')
    input.setAttribute('type', _self.attr.type)
    input.setAttribute('placeholder', _self.attr.placeholder)
    if (_self.attr.minLength) {
      input.setAttribute('minLength', _self.attr.minLength)
    }
    if (_self.attr.maxLength) {
      input.setAttribute('maxLength', _self.attr.maxLength)
    }
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

  const customChecks = input => {
    for (let i = 0; i < _self.inputChecks.length; i++) {
      if (!_self.inputChecks[i].callback(input.value)) {
        input.setCustomValidity(_self.inputChecks[i].message)
        return false
      } else {
        input.setCustomValidity('')
      }
    }
    return true
  }
  /* ========================= */

  _self.setInputType = type => {
    _self.attr.type = type
  }

  _self.setPlaceholder = placeholder => {
    _self.attr.placeholder = placeholder
  }

  _self.setMinLength = minLength => {
    _self.attr.minLength = minLength
  }

  _self.setMaxLength = maxLength => {
    _self.attr.maxLength = maxLength
  }

  _self.addListItem = () => {
    if (listSize === _self.maxSize) {
      return
    }
    const li = document.createElement('LI')
    const input = getInputElement()
    li.appendChild(input)
    li.setAttribute('key', _self.listSize)
    _self.appendChild(li)
    listSize++
  }

  _self.addEventListener('focusout', event => {
    // Validate, and turn to list
    console.log(event.target)
    if (validate(event.target) && customChecks(event.target)) {
      turnToList(event.target)
    } else {
      event.preventDefault()
    }
  })

  _self.addEventListener('mousedown', event => {
    if (event.target.tagName === 'LI') {
      turnToInput(event.target)
    }
  })

  _self.addEventListener('input', event => {
    // if all inputs are valid, add another to list
    const inputs = _self.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) {
      if (!customChecks(inputs[i]) ||
      !inputs[i].checkValidity()) {
        return
      }
    }

    _self.addListItem()
  })

  _self.addValidation = (callback, errorMessage = 'Invalid input') => {
    _self.inputChecks.push({
      callback: callback,
      message: errorMessage
    })
  }

  return _self
}
