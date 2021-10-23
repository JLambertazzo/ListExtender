'use strict';

(function (global, document) {
  // Create element, set classis and id
  function ListExtender (options = {}) {
    this.options = {
      // set default options and overwrite using what's given
      isUnordered: true,
      allowReorder: true,
      showDeleteButton: false,
      ...options
    }

    this.element = (this.options.isUnordered ? document.createElement('UL') : document.createElement('OL'))
    this.maxSize = 100
    this.listSize = 0

    // following are available, but no reason to be used so are not listed in documentation
    this.inputChecks = []
    this.attr = {
      type: 'text',
      placeholder: ''
    }

    this.element.addEventListener('focusout', event => {
      validateAndTurn(event, this)
    })

    this.element.addEventListener('keypress', event => {
      if (event.key === 'Enter' && !canRemove(event.target, this)) {
        if (event.target.parentElement.nextSibling) {  // if list has not reached maxlength
          try {
            event.target.parentElement.nextSibling.children[0].focus()
            // when focus moves out of event.target and to the next input, validateAndTurn(event, this) is run by above focusout event and that adds the new list item
          }
          catch (error) {
            event.target.blur()
          }
        }

        // if list has reached maxlength
        else {
          event.target.blur()
        }

      }
    })

    this.element.addEventListener('dblclick', event => {
      if (document.activeElement.tagName === 'INPUT' && !(validate(document.activeElement) && customChecks(document.activeElement, this))) {
        event.preventDefault()
        return false
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
          let ulElement = event.target.parentElement.parentElement
          this.element.removeChild(event.target.parentElement)
          let listElements = [...ulElement.getElementsByTagName('li')]
          listElements.map((el, i) => el.setAttribute('key', i))
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
    console.log(li)
    li.removeChild(input)
    li.appendChild(document.createTextNode(input.value))
    if (listObj.options.showDeleteButton) {
      li.appendChild(getDeleteButton())
    }
  }

  function validateAndTurn (input, thing) {
    // Validate, and turn to list.
    if (input.target.getAttribute('type') === 'submit') {
      // ignore submit item
      return
    }
    if (input.target.parentElement.nextSibling || input.target.value !== '') {
      if (canRemove(input.target, thing) && thing.listSize > 1) {
        console.log(input.target)
        thing.element.removeChild(input.target.parentElement)
        thing.listSize--
      } else if (validate(input.target) && customChecks(input.target, thing)) {
        turnToList(input.target, thing)
      }
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
    return (input.value === '') && (inputCount(listObj) >= 2 || listObj.listSize > listObj.maxSize)
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

  function handleDragStart (event) {
    if (event.target.firstElementChild && event.target.firstElementChild.getAttribute('type') === 'text') {
      event.preventDefault()
    } else {
      event.target.classList.add('dragging')
      event.target.setAttribute('style', 'opacity: 0.5;')
    }
  }

  function handleDragEnd (event) {
    event.target.classList.remove('dragging')
    event.target.setAttribute('style', 'opacity: 1;')
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
      if (this.listSize > this.maxSize) {
        return
      }
      const li = document.createElement('LI')
      const input = getInputElement(this)
      li.appendChild(input)
      li.setAttribute('key', this.listSize)
      if (this.options.allowReorder) {
        li.setAttribute('draggable', true)
        li.addEventListener('dragstart', handleDragStart)
        li.addEventListener('dragend', handleDragEnd)
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
      let addNewItem = false
      if (this.element.lastElementChild.firstElementChild &&
        this.element.lastElementChild.firstElementChild.getAttribute('type') !== 'submit' &&
        this.element.lastElementChild.firstElementChild.value === '') {
        this.element.removeChild(this.element.lastElementChild)
        addNewItem = true
      }
      for (let i = 0; i < data.length; i++) {
        this.addListItem()
        this.element.lastElementChild.firstChild.value = data[i]
        turnToList(this.element.lastElementChild.firstChild, this)
      }
      if (addNewItem) {
        this.addListItem()
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
      color: 'teal',
      'list-style': '\'\\1F449\''
    },
    // Want to make your own theme? define it below!
    // Then check examples.html to display it!
    fire: {
      background: 'red',
      color: 'orange',
      'list-style': '\'\\1F525\''
    },

    elegant: {
      color: 'black',
      'list-style': '\'\\261E \'',
      'font-family': 'cursive, Brush Script MT',
    },

    typewriter: {
      background: 'rgb(255, 253, 249)',
      color: 'black',
      'list-style': 'inside \'> \'',
      'font-family': 'Courier New, Courier, monospace',
      'text-transform': 'lowercase'
    },

    checklist: {
      color: 'green',
      'list-style': 'inside \'\\2714\''
    },

    softSkyblue: {
      background: '#50b8e7',
      color: '#edf7fc',
      'list-style': 'inside \'> \'',
    },

    hacktoberfest: {
      background: '#e65339',
      color: '#fff',
      'list-style': '\'\\1F338\''
    },

    halloween: {
      background: '#FFA500',
      color: '#00008B',
      'font-weight': 'bold',
      'list-style': '\'\\1F383\''
    },



    Love: {
      background: '#f7005f',
      color: '#f700eb',
      'font-weight': 'bold',
      'list-style': '\'\\2764\''
    },
    Scissors: {
      background: '#D2691E',
      color: '#000000',
      'list-style': '\'\\2704\''
    },

    Spiderman: {
      background: '#ff0000',
      color: '#005eff',
      'font-weight': 'bold',
      'list-style': '\'\\01F577\''
    },
    batman: {
            background: '#141413',
            color: '#e6e637',
            'font-weight': 'bold',

            'list-style-image': '\'\\1F987\''

    },
    Sunflower: {
      background:'#f8b414',
      color:'#e13423',
      'font-weight': 'bold',
      'list-style':'\'\\1F33B\''
    },

    matte: {
      background: '#4a4e69',
      color: '#f2e9e4',
      'list-style': 'inside \'~ \''
    },

    Alien: {
      background: '#000000',
      color: '#1eff00',
      'font-weight': 'bold',
      'list-style': '\'\\1F47D\'',
    },

    Dog: {
      background: '#8a4a12',
      color: '#452203',
      'font-weight': 'bold',
      'list-style': '\'\\1F436\'',
    },
    
    Folders: {
      color: '#171717',
      'list-style': 'inside \'\\1F4C2\'',
      'font-family': 'Courier New, Courier, monospace'
    }

  }

  global.ListExtender = global.ListExtender || ListExtender
})(window, window.document)
