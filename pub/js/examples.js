'use strict'

const headerList = new ListExtender()
headerList.setPlaceholder('Try Me! Add more here!')
headerList.addFromArray(['It\'s intuitive for end users!', 'It\'s easy to implement!', 'It\'s easy to style!'])
headerList.addListItem()
headerList.appendTo('#header')

const groceryList = new ListExtender()
const groceryUL = groceryList.element
groceryList.setPlaceholder('Add an item here')
groceryList.addListItem()
groceryList.addValidation(value => {
  for (let i = 0; i < groceryUL.children.length; i++) {
    const childEl = groceryUL.children[i]
    if (childEl.tagName === 'LI' && childEl.innerText === value) {
      return false
    }
  }
  return true
}, 'Duplicates not allowed')
groceryList.appendTo('#example1')

const skillList = new ListExtender()
skillList.setPlaceholder('add a skill')
skillList.maxSize = 10
skillList.addListItem()
skillList.appendTo('#employerSide')

const academicList = new ListExtender()
academicList.setPlaceholder('School: Major (yyyy-mm : yyyy-mm)')
academicList.addListItem()
academicList.addValidation(value => {
  return (value.match(/[A-Za-z -]+: [A-Za-z ]+ \(\d{4}-\d{2} : \d{4}-\d{2}\)/) !== null)
}, 'Please follow specified format')
academicList.appendTo('#employeeSide')
