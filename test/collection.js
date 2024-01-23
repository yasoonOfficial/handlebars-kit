const assert = require('assert');
const hbs = require('handlebars').create();
const helpers = require('..');
helpers.array({ handlebars: hbs });
helpers.collection({ handlebars: hbs });
helpers.string({ handlebars: hbs });

const context = {array: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']};

describe('collection', function() {
  describe('isEmpty block helper', function() {
    it('should render the first block when an array is empty', function() {
      const fn = hbs.compile('{{#isEmpty array}}AAA{{else}}BBB{{/isEmpty}}');
      assert.equal(fn({array: []}), 'AAA');
    });

    it('should render the first block when the value is null', function() {
      const fn = hbs.compile('{{#isEmpty}}AAA{{else}}BBB{{/isEmpty}}');
      assert.equal(fn({array: []}), 'AAA');
    });

    it('should render the first block when the value is explizitly set to null', function() {
      const fn = hbs.compile('{{#isEmpty null}}AAA{{else}}BBB{{/isEmpty}}');
      assert.equal(fn({array: []}), 'AAA');
    });

    it('should render the first block when the value is explizitly set to undefined', function() {
      const fn = hbs.compile('{{#isEmpty null}}AAA{{else}}BBB{{/isEmpty}}');
      assert.equal(fn({array: []}), 'AAA');
    });

    it('should render the first block when the value is an empty string', function() {
      const fn = hbs.compile('{{#isEmpty ""}}AAA{{else}}BBB{{/isEmpty}}');
      assert.equal(fn({array: []}), 'AAA');
    });

    it('should render the second block when the value is an string', function() {
      const fn = hbs.compile('{{#isEmpty "test"}}AAA{{else}}BBB{{/isEmpty}}');
      assert.equal(fn({array: []}), 'BBB');
    });

    it('should render the second block when an array is not empty', function() {
      const fn = hbs.compile('{{#isEmpty array}}AAA{{else}}BBB{{/isEmpty}}');
      assert.equal(fn(context), 'BBB');
    });

    it('should render the second block when an object is not empty', function() {
      const fn = hbs.compile('{{#isEmpty object}}AAA{{else}}BBB{{/isEmpty}}');
      assert.equal(fn({object: {foo: 'bar'}}), 'BBB');
    });

    it('should render the first block when an object is empty', function() {
      const fn = hbs.compile('{{#isEmpty object}}AAA{{else}}BBB{{/isEmpty}}');
      assert.equal(fn({object: {}}), 'AAA');
    });
  });

  describe('isEmpty inline helper', function() {
    it('should render the first block when an array is empty', function() {
      const fn = hbs.compile('{{isEmpty array}}');
      assert.equal(fn({array: []}), 'true');
    });

    it('should render the first block when the value is null', function() {
      const fn = hbs.compile('{{isEmpty}}');
      assert.equal(fn({array: []}), 'true');
    });

    it('should render the first block when the value is explizitly set to null', function() {
      const fn = hbs.compile('{{isEmpty null}}');
      assert.equal(fn({array: []}), 'true');
    });

    it('should render the first block when the value is explizitly set to undefined', function() {
      const fn = hbs.compile('{{isEmpty null}}');
      assert.equal(fn({array: []}), 'true');
    });

    it('should render the first block when the value is an empty string', function() {
      const fn = hbs.compile('{{isEmpty ""}}');
      assert.equal(fn({array: []}), 'true');
    });

    it('should render the second block when the value is an string', function() {
      const fn = hbs.compile('{{isEmpty "test"}}');
      assert.equal(fn({array: []}), 'false');
    });

    it('should render the second block when an array is not empty', function() {
      const fn = hbs.compile('{{isEmpty array}}');
      assert.equal(fn(context), 'false');
    });

    it('should render the second block when an object is not empty', function() {
      const fn = hbs.compile('{{isEmpty object}}');
      assert.equal(fn({object: {foo: 'bar'}}), 'false');
    });

    it('should render the first block when an object is empty', function() {
      const fn = hbs.compile('{{isEmpty object}}');
      assert.equal(fn({object: {}}), 'true');
    });
  });

  describe('length', function() {
    it('should return the length of the array', function() {
      const fn = hbs.compile('{{length array}}');
      assert.equal(fn(context), '8');
    });

    it('should return zero when undefined', function() {
      assert.equal(hbs.compile('{{length}}')(), '0');
    });

    it('should return the length of a string', function() {
      const fn = hbs.compile('{{length "foo"}}');
      assert.equal(fn(context), '3');
    });

    it('should work with arrays passed via subexpression', function() {
      const fn = hbs.compile('{{length (split "b,c,a")}}');
      assert.equal(fn(context), '3');
    });

    it('should return 0 when the array is invalid:', function() {
      const fn = hbs.compile('{{length foo}}');
      assert.equal(fn(context), '0');
    });

    it('should return 0 when the value is not an array:', function() {
      const fn = hbs.compile('{{length foo}}');
      assert.equal(fn({foo: {}}), '0');
    });
  });
});
