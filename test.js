'use strict'

const log = console.log

const myUL = ExtendingList('class1 class2', 'myID')
log('UL - Given classes: ' + myUL.classList)
log('UL - Given id: ' + myUL.id)
document.body.appendChild(myUL)
myUL.setInputType('email')
myUL.setPlaceholder('name@domain.com')
myUL.addListItem()
