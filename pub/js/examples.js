'use strict'

const log = console.log

const headerList = ExtendingList('', 'headerList')
headerList.setPlaceholder('Try Me! Add more here!')
headerList.addFromArray(['It\'s intuitive for end users!', 'It\'s easy to implement!', 'It\'s easy to style!'])
headerList.addListItem()
document.querySelector('#header').appendChild(headerList)

const groceryList = ExtendingList('', 'groceryList')
groceryList.setPlaceholder('Add an item here')
groceryList.addListItem()
groceryList.addValidation(value => {
  for (let i = 0; i < groceryList.children.length; i++) {
    const childEl = groceryList.children[i]
    if (childEl.tagName === 'LI' && childEl.innerText === value) {
      return false
    }
  }
  return true
}, 'Duplicates not allowed')
document.querySelector('#example1').appendChild(groceryList)

const skillList = ExtendingList('', 'skillList')
skillList.setPlaceholder('add a skill')
skillList.maxSize = 10
skillList.addListItem()
document.querySelector('#employerSide').appendChild(skillList)

const academicList = ExtendingList('', 'academicList')
academicList.setPlaceholder('School: Major (yyyy-mm : yyyy-mm)')
academicList.addListItem()
academicList.addValidation(value => {
  return (value.match(/[A-Za-z -]+: [A-Za-z ]+ \(\d{4}-\d{2} : \d{4}-\d{2}\)/) !== null)
}, 'Please follow specified format')
document.querySelector('#employeeSide').appendChild(academicList)
