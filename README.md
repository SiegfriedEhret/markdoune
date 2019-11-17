# markdoune

A textarea pimper.

Demo: https://dev.ehret.me/markdoune/

## install

`npm install --save markdoune`

## configuration

You will apply a configuration to a container which contains your textarea and your action buttons.

You will have to configure the actions for the buttons.

```javascript
import markdoune, { Markdown } from "./markdoune.js";

markdoune(".text", {
  onChange: function(newValue, oldValue) {
    console.log("content has been modified", newValue, oldValue);
  }
})
  .button(".mark-bold", { transform: Markdown.bold })
  .button(".mark-italic", { transform: Markdown.italic })
  .button(".mark-quote", { transform: Markdown.quote })
  .button(".mark-list-bullets", { transform: Markdown.bulletedList })
  .button(".mark-list-numbers", { transform: Markdown.numberedList })
  .button(".mark-link", { transform: Markdown.link })
  .button(".mark-image", { transform: Markdown.image })
  .button(".mark-code", { transform: Markdown.code })
  .button(".mark-inlinecode", { transform: Markdown.inlineCode });
````

See the [example](./example/) folder.

The `markdoune(...)` function needs:

- A `selector`, used to target the textarea.
- An option object, with:
  - `onChange`: a function with the following parameters: `newValue` and `oldValue`.

The result can chain `button` function to add super powers to buttons. The `button(...)` function needs:

- A `selector`, used to target a button.
- An option object, with:
  - `transform`: a function with the following parameters: `data` for the string to transform, and an object (SelectionOptions) to understand the user interaction with the data.

The `SelectionOptions` contains:

- `lineStart`: the number of the first selected line.
- `lineEnd`: the number of the last selected line.
- `lineMax`: the total number of lines.
- `selectionStart`: the number of the first selected position.
- `selectionEnd`: the number of the last selected position.

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
