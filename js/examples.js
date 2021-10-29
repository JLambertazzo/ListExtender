'use strict'

const simpleList = new ListExtender()
simpleList.addAfter('#simpleList p')
simpleList.setPlaceholder('Type here!')

const themeList = new ListExtender()
themeList.addBefore('#themeList details')
themeList.setPlaceholder('Type here!')
themeList.addFromArray(['Try', 'The', 'Buttons', 'Above'])

const commList = new ListExtender()
commList.addBefore('#commList details')
commList.setPlaceholder('Type here!')
commList.addFromArray(['Try', 'The', 'Buttons', 'Above'])

const delThemeList = new ListExtender({ showDeleteButton: true })
delThemeList.addBefore('#delThemeList details')
delThemeList.setPlaceholder('Type here!')
delThemeList.addFromArray(['Try', 'The', 'Buttons', 'Above'])

const setTheme = event => {
  themeList.setTheme(themeList[event.target.getAttribute('theme')])
}

const setCommTheme = event => {
  commList.setTheme(commList[event.target.getAttribute('theme')])
}

const setDelTheme = event => {
  delThemeList.setDelBtnTheme(delThemeList.delBtnThemes[event.target.getAttribute('theme')])
}

const deleteList = new ListExtender({ showDeleteButton: true })
deleteList.addAfter('#deleteButton p')
deleteList.setPlaceholder('Type Here!')
deleteList.addFromArray(['Delete', 'These', 'Elements!!'])

const validateOne = new ListExtender({ showDeleteButton: true })
validateOne.addAfter('#validationOne p')
validateOne.setPlaceholder('yyyy-mm-dd || mm/dd/yyyy || ddmmyyyy')
validateOne.addValidation(value => {
  return (value.match(/\d{4}-\d{2}-\d{2}/) && value.match(/\d{4}-\d{2}-\d{2}/)[0] === value) ||
  (value.match(/\d{2}\/\d{2}\/\d{4}/) && value.match(/\d{2}\/\d{2}\/\d{4}/)[0] === value) || 
  (value.match(/\d{8}/) && value.match(/\d{8}/)[0] === value)
}, 'Please follow specified format!!')

const validateTwo = new ListExtender()
validateTwo.addAfter('#validationTwo p')
validateTwo.setInputType('date')
validateTwo.addValidation(value => {
  const vals = validateTwo.getData()
  for (let i = 0; i < vals.length; i++) {
    if (vals[i] === value) {
      return false
    }
  }
  return true
}, 'Duplicates not allowed!')

const addItems = new ListExtender()
addItems.addAfter('#addItems form')
addItems.setPlaceholder('Use form above!')

const handleSubmit = event => {
  event.preventDefault()
  const items = event.target.firstElementChild.value.split(' ').filter(val => val !== '')
  addItems.addFromArray(items)
  event.target.firstElementChild.value = ''
}

const getItems = new ListExtender()
getItems.addAfter('#getItems h3')
getItems.setPlaceholder('Type Here!')

const handleGetItems = event => {
  const p = event.target.previousElementSibling
  p.innerText = ''
  const data = getItems.getData()
  p.appendChild(document.createTextNode(`The items given in the list are: ${data.toString()}`))
}

const markedLists = new ListExtender({ showDeleteButton: true })
markedLists.addAfter('#markedLists p')
const dataMarkedList = ['bug fixing', 'implement new feature']
markedLists.addFromArray(dataMarkedList)
markedLists.element.addEventListener('mouseenter', event => {
  const children = [...markedLists.element.children]
  children.forEach(child => {
    if (child.querySelector('input[type="submit"]')) {
      child.querySelector('input[type="submit"]').value = 'DONE'
      child.querySelector('input[type="submit"]').style.visibility = 'visible'
      child.querySelector('input[type="submit"]').style.background = 'green'
    }
  })
})
markedLists.element.addEventListener('mousedown', event => {
  if (event.target.tagName === 'INPUT' && event.target.getAttribute('type') === 'submit') { 
    let ulElement = event.target.parentElement
    markedLists.element.insertBefore(ulElement, markedLists.element.children[0])
    ulElement.style['text-decoration'] = 'line-through'
  }
})