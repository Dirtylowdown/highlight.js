/*
Language: HTTP
Description: HTTP request and response headers with automatic body highlighting
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Category: protocols, web
Website: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
*/

export default function(hljs) {
  const regex = hljs.regex;
  const VERSION = 'HTTP/([32]|1\\.[01])';
  const HEADER_NAME = /[A-Za-z][A-Za-z0-9-]*/;
  const HEADER = {
    begin: [
      regex.concat('^', HEADER_NAME),
      /\:/
    ],
    scope: {
      1: "attribute",
      2: "punctuation"
    },
    end: /$/
  };
  const HEADERS_AND_BODY = [
    HEADER,
    {
      begin: /\n\n/,
      end: hljs.MATCH_NOTHING_RE
    }
  ];

  return {
    name: 'HTTP',
    aliases: [ 'https' ],
    illegal: /\S/,
    contains: [
      // response
      {
        begin: '^(?=' + VERSION + " \\d{3})",
        end: /$/,
        contains: [
          {
            className: "meta",
            begin: VERSION
          },
          {
            className: 'number',
            begin: '\\b\\d{3}\\b'
          }
        ],
        starts: {
          end: /\b\B/,
          illegal: /\S/,
          contains: HEADERS_AND_BODY
        }
      },
      // request
      {
        begin: '(?=^[A-Z]+ \/(.*?) ' + VERSION + '$)',
        end: /$/,
        contains: [
          {
            className: 'string',
            begin: ' ',
            end: ' ',
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "meta",
            begin: VERSION
          },
          {
            className: 'keyword',
            begin: '[A-Z]+'
          }
        ],
        starts: {
          end: /\b\B/,
          illegal: /\S/,
          contains: HEADERS_AND_BODY
        }
      },
      // to allow headers to work even without a preamble
      HEADER
    ]
  };
}
