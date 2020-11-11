'use strict'
console.log('----------')
console.log('list extender loaded')

function exlUnordered (classes = '', id = null) {
  const _self = document.createElement('UL')
  classes.split(' ').forEach(c => {
    _self.classList.add(c)
  })
  if (id) {
    _self.id = id
  }

  return _self
}
