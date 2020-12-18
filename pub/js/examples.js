'use strict'

const simpleList = new ListExtender()
simpleList.setPlaceholder('Type here!')
simpleList.addListItem()
simpleList.appendTo('#simpleList')

const themeList = new ListExtender()
themeList.setPlaceholder('Type here!')
themeList.addListItem()
themeList.appendTo('#themeList')

const setTheme = event => {
  themeList.setTheme(themeList[event.target.getAttribute('theme')])
}

const deleteList = new ListExtender({ showDeleteButton: true })
deleteList.setPlaceholder('Type Here!')
deleteList.addListItem()
deleteList.appendTo('#deleteButton')

const validateOne = new ListExtender({ showDeleteButton: true })
validateOne.setPlaceholder('yyyy-mm-dd || mm/dd/yyyy || ddmmyyyy')
validateOne.addListItem()
validateOne.addValidation(value => {
  return (value.match(/\d{4}-\d{2}-\d{2}/) && value.match(/\d{4}-\d{2}-\d{2}/)[0] === value) ||
  (value.match(/\d{2}\/\d{2}\/\d{4}/) && value.match(/\d{2}\/\d{2}\/\d{4}/)[0] === value) || 
  (value.match(/\d{8}/) && value.match(/\d{8}/)[0] === value)
}, 'Please follow specified format!!')
validateOne.appendTo('#validationOne')

const validateTwo = new ListExtender()
validateTwo.setPlaceholder('Type Here!')
validateTwo.addListItem()
validateTwo.addValidation(value => {
  const vals = validateTwo.getData()
  for (let i = 0; i < vals.length; i++) {
    if (vals[i] === value) {
      return false
    }
  }
  return true
}, 'Duplicates not allowed!')
validateTwo.appendTo('#validationTwo')

const addItems = new ListExtender()
addItems.setPlaceholder('Use form above!')
addItems.addListItem()
addItems.appendTo('#addItems')

const handleSubmit = event => {
  event.preventDefault()
  const items = event.target.firstElementChild.value.split(' ').filter(val => val !== '')
  addItems.addFromArray(items)
  event.target.firstElementChild.value = ''
}

const getItems = new ListExtender()
getItems.setPlaceholder('Type Here!')
getItems.addListItem()
getItems.addAfter('#getItems details')

const handleGetItems = event => {
  const p = event.target.previousElementSibling
  p.innerText = ''
  const data = getItems.getData()
  p.appendChild(document.createTextNode(`The items given in the list are: ${data.toString()}`))
}
