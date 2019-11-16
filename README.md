# markdoune

A textarea pimper.

Demo: https://dev.ehret.me/markdoune/

## install

`npm install --save markdoune`

## configuration

You will apply a configuration to a container which contains your textarea and your action buttons.

You will have to configure the actions for the buttons.

```javascript
import markdoune from "./markdoune.js";

const config = {
  textareaSelector: ".text",
  onActionCallback: function() {
    console.log("content has been modified");
  },
  buttons: [
    {
      buttonSelector: ".mark-bold",
      before: "**",
      after: "**",
      multi: false
    },
    {
      buttonSelector: ".mark-italic",
      before: "_",
      after: "_",
      multi: false
    },
    {
      buttonSelector: ".mark-quote",
      before: "> ",
      multi: true
    },
    {
      buttonSelector: ".mark-list-bullets",
      before: "- ",
      multi: true
    },
    {
      buttonSelector: ".mark-list-numbers",
      before: ". ",
      multi: true,
      count: true
    },
    {
      buttonSelector: ".mark-link",
      before: "[",
      after: "]()",
      multi: false
    },
    {
      buttonSelector: ".mark-code",
      before: "\n```\n",
      after: "\n```\n",
      multi: false
    }
  ]
};

markdoune(".text-container", config);
````

See the [example](./example/) folder.

## tests

Tests use [Cypress](https://www.cypress.io/).

Run `npm test`.

## license

Licensed under the [MIT](http://opensource.org/licenses/MIT) license.

```
The MIT License (MIT)

Copyright (c) 2016-2019 Siegfried Ehret <siegfried@ehret.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
