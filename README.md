# ListExtender.js
## https://julienbl.me/ListExtender/

## Install

### Static
```html
<script defer type="text/javascript" src="https://julienbl.me/ListExtender/lib/ListExtender.min.js"></script>
```

### Node 
```bash
npm i list-extender
```

## Getting Started
1. Create a ListExtender object
```javascript
const myList = new ListExtender()
```
2. Append your list to some parent container in the DOM
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
https://julienbl.me/ListExtender/documentation.html

## Contributing
To contribute to this project please follow the following steps
* Fork this project
* Make the necessary changes on the forked project in lib/ListExtender.js
* Minify the javascript style with `npm run build`
* Commit and push your changes and create a pull request to merge with this repository
* For more help on this process please click [here](https://hacktoberfest.digitalocean.com/resources)