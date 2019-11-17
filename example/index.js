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
