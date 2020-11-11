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
  _self.inputFields = []

  _self.addInputField = (type = 'text', placeholder = '') => {
    const newInput = document.createElement('INPUT')
    newInput.setAttribute('type', type)
    newInput.setAttribute('placeholder', placeholder)
    _self.inputFields.push(newInput)
  }

  _self.removeInputField = fieldNum => {
    _self.inputFields = _self.inputFields.slice(fieldNum - 1, fieldNum)
  }

  _self.addListItem = () => {
    const li = document.createElement('LI')
    for (let i = 0; i < _self.inputFields.length; i++) {
      li.appendChild(_self.inputFields[i])
    }
    li.setAttribute('key', _self.listItems.length)
    _self.appendChild(li)
  }

  return _self
}
