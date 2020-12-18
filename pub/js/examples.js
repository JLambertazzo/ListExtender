'use strict'

const simpleList = new ListExtender()
simpleList.setPlaceholder('Type here!')
simpleList.addAfter('#simpleList p')

const themeList = new ListExtender()
themeList.setPlaceholder('Type here!')
themeList.addBefore('#themeList details')

const setTheme = event => {
  themeList.setTheme(themeList[event.target.getAttribute('theme')])
}

const deleteList = new ListExtender({ showDeleteButton: true })
deleteList.setPlaceholder('Type Here!')
deleteList.addAfter('#deleteButton p')

const validateOne = new ListExtender({ showDeleteButton: true })
validateOne.setPlaceholder('yyyy-mm-dd || mm/dd/yyyy || ddmmyyyy')
validateOne.addValidation(value => {
  return (value.match(/\d{4}-\d{2}-\d{2}/) && value.match(/\d{4}-\d{2}-\d{2}/)[0] === value) ||
  (value.match(/\d{2}\/\d{2}\/\d{4}/) && value.match(/\d{2}\/\d{2}\/\d{4}/)[0] === value) || 
  (value.match(/\d{8}/) && value.match(/\d{8}/)[0] === value)
}, 'Please follow specified format!!')
validateOne.addAfter('#validationOne p')

const validateTwo = new ListExtender()
validateTwo.setPlaceholder('Type Here!')
validateTwo.addValidation(value => {
  const vals = validateTwo.getData()
  for (let i = 0; i < vals.length; i++) {
    if (vals[i] === value) {
      return false
    }
  }
  return true
}, 'Duplicates not allowed!')
validateTwo.addAfter('#validationTwo p')

const addItems = new ListExtender()
addItems.setPlaceholder('Use form above!')
addItems.addAfter('#addItems form')

const handleSubmit = event => {
  event.preventDefault()
  const items = event.target.firstElementChild.value.split(' ').filter(val => val !== '')
  addItems.addFromArray(items)
  event.target.firstElementChild.value = ''
}

const getItems = new ListExtender()
getItems.setPlaceholder('Type Here!')
getItems.addAfter('#getItems h3')

const handleGetItems = event => {
  const p = event.target.previousElementSibling
  p.innerText = ''
  const data = getItems.getData()
  p.appendChild(document.createTextNode(`The items given in the list are: ${data.toString()}`))
}
