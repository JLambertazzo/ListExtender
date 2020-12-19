# ListExtender.js
## https://mysterious-wave-81486.herokuapp.com/

## Getting Started
1. Download and import the ListExtender library along with any code that uses it into your html file. Make sure you import the library before any code that uses it.
```html
<script defer type="text/javascript" src="js/ListExtender.js"></script>
<script defer type="text/javascript" src="js/myScript.js"></script>
```
2. Create a ListExtender object
```javascript
const myList = new ListExtender()
```
3. Append your list to some parent container in the DOM
```javascript
myList.appendTo('#containerId')
```
And that's it! You now have a working extending list in your website!  
From here you can customize the list however you see fit. A good place to start would be setting the placeholder and input type.
```javascript
myList.setPlaceholder('Placeholder Text')
myList.setInputType('email')
```
### For more instructions on using the library, visit:  
https://mysterious-wave-81486.herokuapp.com/documentation 