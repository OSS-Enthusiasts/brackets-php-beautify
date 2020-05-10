/*
* For tests to do with the structure of this project, files, folders etc.
*/

const fs = require('fs');

describe('Project Structure', () => {
  describe('src folder', () => {
    it('should contain a main.js file', () => {
      const srcFolder = fs.readdirSync(`${__dirname}/../src`);
      expect(srcFolder).toContain('main.js');
    });
  });
});
