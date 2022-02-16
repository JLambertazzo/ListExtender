"use strict";

const heroList = new ListExtender();
heroList.addFromArray([
  "Easy to implement!",
  "Easy to style!",
  "Intuitive for end users!",
]);
heroList.addAfter("#hero h4");
heroList.maxSize = 10;
heroList.setPlaceholder("Try me! Add more here.");
