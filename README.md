# ListExtender.js
## https://jlambertazzo.github.io/ListExtender/

## Getting Started
1. Import the library into your HTML file using the following script tag. Make sure you import it before any code that will use/depend on it.
```html
<script defer type="text/javascript" src="https://jlambertazzo.github.io/ListExtender/js/ListExtender.js"></script>
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
https://jlambertazzo.github.io/ListExtender/documentation.html