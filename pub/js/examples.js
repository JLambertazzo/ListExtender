'use strict'

const log = console.log

const headerList = ExtendingList('', 'headerList')
headerList.setPlaceholder('Try Me! Add more here!')
headerList.addListItem()
document.querySelector('#header').appendChild(headerList)

const groceryList = ExtendingList('', 'groceryList')
groceryList.setPlaceholder('Add an item here')
groceryList.addListItem()
groceryList.addValidation(value => {
  for (let i = 0; i < groceryList.children.length; i++) {
    const childEl = groceryList.children[i]
    return (childEl.tagName === 'LI' && childEl.innerText !== value)
  }
}, 'Duplicates not allowed')
document.querySelector('#example1 code').before(groceryList)

const skillList = ExtendingList('', 'skillList')
skillList.setPlaceholder('add required skills here')
skillList.maxSize = 10
skillList.addListItem()
document.querySelector('#employerSide').appendChild(skillList)

const academicList = ExtendingList('', 'academicList')
academicList.setPlaceholder('School: Major (yyyy-mm-dd : yyyy-mm-dd)')
academicList.addListItem()
academicList.addValidation(value => {
  return (value.match(/[A-Za-z -]+: [A-Za-z ]+ \(\d{4}-\d{2}-\d{2} : \d{4}-\d{2}-\d{2}\)/) !== null)
}, 'Please follow specified format')
document.querySelector('#employeeSide').appendChild(academicList)
