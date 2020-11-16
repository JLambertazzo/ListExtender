'use strict'

const log = console.log

const myUL = ExtendingList('class1 class2', 'myID')
document.body.appendChild(myUL)
myUL.setInputType('text')
myUL.setPlaceholder('VALID')
myUL.addListItem()
myUL.maxSize = 4
myUL.addValidation(value => (value === 'VALID'), 'Please enter "VALID"')
