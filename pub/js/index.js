'use strict'

const heroList = new ListExtender()
heroList.setPlaceholder('Try me! Add more here.')
heroList.addFromArray(['It\'s easy to implement!', 'It\'s easy to style!', 'It\'s intuitive for end users!'])
heroList.addListItem()
heroList.appendTo('#whyUse')