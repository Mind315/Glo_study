"use strict";

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}
let item;
DomElement.prototype.newBlock = function () {
  if (this.selector[0] === ".") {
    item = document.createElement("div");
    item.className = this.selector.slice(1);
    console.log(item);
  }
  if (this.selector[0] === "#") {
    item = document.createElement("p");
    item.id = this.selector.slice(1);
    console.log(item);
  }
  item.textContent = "Можно писать"; // переместить в блок если надо.

  item.style.cssText = 
  `height: ${this.height}px; 
   width: ${this.width}px;
   background: ${this.bg};
   font-size: ${this.fontSize}px;`;

  return item;
};

let div = new DomElement(".block", 222, 333, "cyan", 22);
let paragraph = new DomElement("#best", 100, 700, "silver", 52);
console.log(div);
console.log(paragraph);

document.body.appendChild(div.newBlock());
document.body.appendChild(paragraph.newBlock());
