import markdoune from "markdoune";

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
