/*
Language: Backus–Naur Form
Website: https://en.wikipedia.org/wiki/Backus–Naur_form
Category: syntax
Author: Oleg Efimov <efimovov@gmail.com>
*/

/** @type LanguageFn */
export default function(hljs) {
  const ATTRIBUTE = {
    scope: 'attribute',
    relevance: "minor",
    match: /<[a-z][a-z-]*>/
  }

  const TAG = {
    relevance: "minor",
    match: /<[a-z][a-z-]*>/
  }

  const OPERATOR = {
    scope: "operator",
    match: /\|/
  }

  return {
    name: 'Backus–Naur Form',
    contains: [
      ATTRIBUTE,
      // Specific
      {
        begin: /::=/,
        beginScope: "operator",
        relevance: "low",
        end: /$/,
        contains: [
          TAG,
          OPERATOR,
          // Common
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE
        ]
      }
    ]
  };
}
