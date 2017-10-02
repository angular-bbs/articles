/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/* eslint no-console: "off" */

const Package = require('dgeni').Package;
const contentPackage = require('../angular-content-package');
const { readFileSync } = require('fs');
const { resolve } = require('canonical-path');
const { CONTENTS_PATH } = require('../config');

function createPackage(blogName) {

  const blogFilePath = `${CONTENTS_PATH}/blog/${blogName}.md`;
  const blogFile = readFileSync(blogFilePath, 'utf8');
  const examples = [];
  blogFile.replace(/<code-(?:pane|example) [^>]*path="([^"]+)"/g, (_, path) => examples.push('blog-examples/' + path));

  if (examples.length) {
    console.log('The following example files are referenced in this blog:');
    console.log(examples.map(example => ' - ' + example).join('\n'));
  }

  return new Package('author-blog', [contentPackage])
    .config(function(readFilesProcessor) {
      readFilesProcessor.sourceFiles = [
        {
          basePath: CONTENTS_PATH,
          include: blogFilePath,
          fileReader: 'contentFileReader'
        },
        {
          basePath: CONTENTS_PATH,
          include: examples.map(example => resolve(CONTENTS_PATH, example)),
          fileReader: 'exampleFileReader'
        }
      ];
    });
}

module.exports = { createPackage };
