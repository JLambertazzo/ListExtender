'use strict';

(function (global, document) {
  // Create element, set classis and id
  function ListExtender (options = {}) {
    this.options = {
      // set default options and overwrite using what's given
      isUnordered: true,
      allowReorder: true,
      showDeleteButton: false,
      id: '',
      classList: [],
      ...options
    }
    // element set up
    this.element = this.options.isUnordered ? document.createElement('UL') : document.createElement('OL')
    if (this.options.id) {
      this.element.id = this.options.id
    }
    if (this.options.classList.length > 0) {
      this.element.classList.add([...this.options.classList])
    }

    this.maxSize = 100
    this.listSize = 0
    this.inputChecks = []
    this.attr = {
      type: 'text',
      placeholder: ''
    }

    this.element.addEventListener('focusout', event => {
      // Validate, and turn to list.
      if (event.target.getAttribute('type') === 'submit') {
        // ignore submit item
        return
      }
      if (event.target.parentElement.nextSibling || event.target.value !== '') {
        if (canRemove(event.target, this) && this.listSize > 1) {
          this.element.removeChild(event.target.parentElement)
          this.listSize--
        } else if (validate(event.target) && customChecks(event.target, this)) {
          turnToList(event.target, this)
        }
      }
    })

    this.element.addEventListener('dblclick', event => {
      if (event.target.firstChild) {
        event.preventDefault()
      }
      if (event.target.tagName === 'LI' &&
      event.target.firstChild &&
      event.target.firstChild.tagName !== 'INPUT') {
        turnToInput(event.target, this)
        event.target.firstElementChild.select()
        if (['text', 'password', 'url'].includes(this.attr.type)) {
          event.target.firstElementChild.selectionStart = event.target.firstElementChild.selectionEnd
        }
      }
    })

    this.element.addEventListener('input', event => {
      // if all inputs are valid, add another to list
      const inputs = [...this.element.querySelectorAll('input')].filter(element => element.getAttribute('type') !== 'submit')
      for (let i = 0; i < inputs.length; i++) {
        if (!customChecks(inputs[i], this) ||
        !inputs[i].checkValidity()) {
          return
        }
      }

      this.addListItem()
    })

    /*
      Following function uses external code
      Title: How To Build Sortable Drag & Drop With Vanilla Javascript
      Author: Web Dev Simplified
      Date: 17 March 2020
      Availability: https://www.youtube.com/watch?v=jfYWwQrtzzY
    */
    if (this.options.allowReorder) {
      this.element.addEventListener('dragover', event => {
        event.preventDefault()
        const dragging = document.querySelector('.dragging')
        if (!this.element.contains(dragging)) {
          return
        }
        let closestEl = null
        let smallestDist = window.outerHeight * -1
        const children = ([...this.element.children]).filter(el => el !== dragging)
        children.forEach(child => {
          const y = child.getBoundingClientRect().y
          if (event.clientY - y > smallestDist && event.clientY - y < 0) {
            closestEl = child
            smallestDist = y - event.clientY
          }
        })
        if (closestEl) {
          closestEl.before(dragging)
        } else {
          this.element.appendChild(dragging)
        }
      })
    }

    if (this.options.showDeleteButton) {
      this.element.addEventListener('mouseenter', event => {
        const children = [...this.element.children]
        children.forEach(child => {
          if (child.querySelector('input[type="submit"]')) {
            child.querySelector('input[type="submit"]').style.visibility = 'visible'
          }
        })
      })

      this.element.addEventListener('mouseleave', event => {
        const children = [...this.element.children]
        children.forEach(child => {
          if (child.querySelector('input[type="submit"]')) {
            child.querySelector('input[type="submit"]').style.visibility = 'hidden'
          }
        })
      })

      this.element.addEventListener('mousedown', event => {
        if (event.target.tagName === 'INPUT' && event.target.getAttribute('type') === 'submit') {
          this.element.removeChild(event.target.parentElement)
          this.listSize--
          if (inputCount(this) < 1) {
            this.addListItem()
          }
        }
      })
    }

    this.addListItem()
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

  function turnToList (input, listObj) {
    // Turns the active input to a list element
    const li = input.parentElement
    li.removeChild(input)
    li.appendChild(document.createTextNode(input.value))
    if (listObj.options.showDeleteButton) {
      li.appendChild(getDeleteButton())
    }
  }

  function turnToInput (li, listObj) {
    const input = getInputElement(listObj)
    const button = li.querySelector('input[type="submit"]')
    if (listObj.options.showDeleteButton && button) {
      li.removeChild(button)
    }
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

  function canRemove (input, listObj) {
    // allow deleting if input is empty and list has 2+ inputs
    return (input.value === '') && inputCount(listObj) >= 2
  }

  function inputCount (listObj) {
    const children = [...listObj.element.children]
    return children.reduce((numInputs, child) => {
      if (child.firstElementChild && child.firstElementChild.getAttribute('type') !== 'submit') {
        return ++numInputs
      }
      return numInputs
    }, 0)
  }

  function getDeleteButton () {
    const button = document.createElement('INPUT')
    button.setAttribute('type', 'submit')
    button.setAttribute('value', 'DEL')
    button.setAttribute('style', 'background: firebrick; color: white; font-size: 0.7em; visibility: hidden; float: right; border: none;')
    return button
  }
  /* ========================= */

  ListExtender.prototype = {
    setInputType: function (type) {
      if (['email', 'date', 'month', 'number', 'time', 'week', 'text', 'password', 'url'].includes(type)) {
        this.attr.type = type
        const inputs = [...this.element.querySelectorAll('input')].filter(element => element.getAttribute('type') !== 'submit')
        inputs.forEach(input => {
          input.setAttribute('type', type)
        })
      }
    },

    setPlaceholder: function (placeholder) {
      this.attr.placeholder = placeholder
      const inputs = [...this.element.querySelectorAll('input')].filter(element => element.getAttribute('type') !== 'submit')
      inputs.forEach(input => {
        input.setAttribute('placeholder', placeholder)
      })
    },

    setMinLength: function (minLength) {
      this.attr.minLength = minLength
      const inputs = [...this.element.querySelectorAll('input')].filter(element => element.getAttribute('type') !== 'submit')
      inputs.forEach(input => {
        input.setAttribute('minLength', minLength)
      })
    },

    setMaxLength: function (maxLength) {
      this.attr.maxLength = maxLength
      const inputs = [...this.element.querySelectorAll('input')].filter(element => element.getAttribute('type') !== 'submit')
      inputs.forEach(input => {
        input.setAttribute('maxLength', maxLength)
      })
    },

    setId: function (id) {
      this.element.id = id
    },

    addClasses: function (classList) {
      this.element.classList.add([...classList])
    },

    removeClasses: function (classList) {
      this.element.classList.remove([...classList])
    },

    addListItem: function () {
      if (this.listSize === this.maxSize) {
        return
      }
      const li = document.createElement('LI')
      const input = getInputElement(this)
      li.appendChild(input)
      li.setAttribute('key', this.listSize)
      if (this.options.allowReorder) {
        li.setAttribute('draggable', true)
        li.addEventListener('dragstart', this.handleDragStart)
        li.addEventListener('dragend', this.handleDragEnd)
      }
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
      for (let i = 0; i < data.length; i++) {
        this.addListItem()
        this.element.lastElementChild.firstChild.value = data[i]
        turnToList(this.element.lastElementChild.firstChild, this)
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
    },

    getData: function () {
      const data = []
      for (let i = 0; i < this.element.children.length; i++) {
        if (!this.element.children[i].firstElementChild) {
          data.push(this.element.children[i].innerText)
        }
      }
      return data
    },

    getAllData: function () {
      const data = []
      for (let i = 0; i < this.element.children.length; i++) {
        if (!this.element.children[i].firstElementChild) {
          data.push(this.element.children[i].innerText)
        } else {
          data.push(this.element.children[i].firstElementChild.value)
        }
      }
      if (data[this.element.children.length - 1] === '') {
        data.pop()
      }
      return data
    },

    handleDragStart: function (event) {
      if (event.target.firstElementChild && event.target.firstElementChild.getAttribute('type') === 'text') {
        event.preventDefault()
      } else {
        event.target.classList.add('dragging')
        event.target.setAttribute('style', 'opacity: 0.5;')
      }
    },

    handleDragEnd: function (event) {
      event.target.classList.remove('dragging')
      event.target.setAttribute('style', 'opacity: 1;')
    },

    setTheme: function (theme) {
      const cssText = Object.keys(theme).reduce((text, curr) => {
        const prop = curr
        const val = theme[curr]
        return `${text} ${prop}: ${val};`
      }, '')
      this.element.style.cssText = cssText
    },

    // THEMES
    simpleLight: {
      background: 'white',
      color: 'darkslategray',
      'list-style': 'inside square'
    },

    simpleDark: {
      background: 'darkslategray',
      color: 'ivory',
      'list-style': 'inside square'
    },

    cream: {
      background: 'antiquewhite',
      color: 'darkolivegreen',
      'list-style': 'inside \'-\''
    },

    hacker: {
      background: 'black',
      color: 'lime',
      'list-style': 'inside \'> \''
    },

    underwater: {
      background: 'blue',
      color: 'aquamarine',
      'list-style': 'inside \'~~~\''
    },

    MLA: {
      'line-height': '2em',
      background: 'white',
      color: 'black'
    },

    PuTTY: {
      background: 'black',
      color: 'white',
      'list-style': 'inside \'$ \''
    },

    emoji: {
      background: 'white',
      color: 'teal',
      'list-style': '\'\\1F449\''
    }
  }

  global.ListExtender = global.ListExtender || ListExtender
})(window, window.document)
