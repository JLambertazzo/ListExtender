'use strict'

const heroList = new ListExtender()
heroList.setPlaceholder('Try me! Add more here.')
heroList.addFromArray(['Easy to implement!', 'Easy to style!', 'Intuitive for end users!'])
heroList.addListItem()
heroList.addAfter('#hero h4')