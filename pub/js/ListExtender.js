'use strict';

(function (global, document) {
  // Create element, set classis and id
  function ListExtender () {
    this.element = document.createElement('UL')
    this.maxSize = 100
    this.listSize = 0
    this.inputChecks = []
    this.attr = {
      type: 'text',
      placeholder: ''
    }

    this.element.addEventListener('focusout', event => {
      // Validate, and turn to list.
      if (event.target.parentElement.nextSibling || event.target.value !== '') {
        if (checkEmpty(event.target, this) && this.listSize > 1) {
          this.element.removeChild(event.target.parentElement)
          this.listSize--
        } else if (validate(event.target) && customChecks(event.target, this)) {
          turnToList(event.target)
        }
      }
    })

    this.element.addEventListener('mousedown', event => {
      if (event.target.firstChild) {
        event.preventDefault()
      }
      if (event.target.tagName === 'LI' &&
      event.target.firstChild &&
      event.target.firstChild.tagName !== 'INPUT') {
        turnToInput(event.target, this)
        event.target.firstElementChild.select()
        event.target.firstElementChild.selectionStart = event.target.firstElementChild.selectionEnd
      }
    })

    this.element.addEventListener('input', event => {
      // if all inputs are valid, add another to list
      const inputs = this.element.querySelectorAll('input')
      for (let i = 0; i < inputs.length; i++) {
        if (!customChecks(inputs[i], this) ||
        !inputs[i].checkValidity()) {
          return
        }
      }

      this.addListItem()
    })
  }

  /* === Helper Functions === */
  function getInputElement (listObj) {
    const input = document.createElement('INPUT')
    input.setAttribute('type', listObj.attr.type)
    input.setAttribute('placeholder', listObj.attr.placeholder)
    if (listObj.attr.minLength) {
      input.setAttribute('minLength', listObj.attr.minLength)
    }
    if (listObj.attr.maxLength) {
      input.setAttribute('maxLength', listObj.attr.maxLength)
    }
    input.setAttribute('required', '')
    return input
  }

  function validate (input) {
    // Validates the current active input
    if (input.checkValidity()) {
      return true
    } else {
      input.reportValidity()
      return false
    }
  }

  function turnToList (input) {
    // Turns the active input to a list element
    const li = input.parentElement
    li.removeChild(input)
    li.appendChild(document.createTextNode(input.value))
  }

  function turnToInput (li, listObj) {
    const input = getInputElement(listObj)
    input.value = li.innerText
    li.removeChild(li.firstChild)
    li.appendChild(input)
  }

  function customChecks (input, listObj) {
    for (let i = 0; i < listObj.inputChecks.length; i++) {
      if (!listObj.inputChecks[i].callback(input.value)) {
        input.setCustomValidity(listObj.inputChecks[i].message)
        return false
      } else {
        input.setCustomValidity('')
      }
    }
    return true
  }

  function checkEmpty (input, listObj) {
    return (input.value === '') &&
    (parseInt(input.parentElement.getAttribute('key')) !== listObj.listSize - 1)
  }
  /* ========================= */

  ListExtender.prototype = {
    setInputType: function (type) {
      this.attr.type = type
    },

    setPlaceholder: function (placeholder) {
      this.attr.placeholder = placeholder
    },

    setMinLength: function (minLength) {
      this.attr.minLength = minLength
    },

    setMaxLength: function (maxLength) {
      this.attr.maxLength = maxLength
    },

    addListItem: function () {
      if (this.listSize === this.maxSize) {
        return
      }
      const li = document.createElement('LI')
      const input = getInputElement(this)
      li.appendChild(input)
      li.setAttribute('key', this.listSize)
      this.element.appendChild(li)
      this.listSize++
    },

    addValidation: function (callback, errorMessage = 'Invalid input') {
      this.inputChecks.push({
        callback: callback,
        message: errorMessage
      })
    },

    addFromArray: function (data) {
      if (this.element.children.length === 0) {
        for (let i = 0; i < data.length; i++) {
          this.addListItem()
          this.element.children[i].firstChild.value = data[i]
          turnToList(this.element.children[i].firstChild)
        }
      }
    },

    appendTo: function (query) {
      const parent = document.querySelector(query)
      if (parent) {
        parent.appendChild(this.element)
      }
    },

    addBefore: function (query) {
      const nextSibling = document.querySelector(query)
      if (nextSibling) {
        nextSibling.before(this.element)
      }
    },

    addAfter: function (query) {
      const prevSibling = document.querySelector(query)
      if (prevSibling) {
        prevSibling.after(this.element)
      }
    }
  }

  global.ListExtender = global.ListExtender || ListExtender
})(window, window.document)
