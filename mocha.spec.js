require('babel/register');

const expect = require('expect.js');
const TestObjectClass = require('./core/TestObjectClass');
const examplePage = require('./pages/examplePage');

const conf = {
  elements: [
    {
      name: 'Test',
      selector: '.test'
    }
  ]
};

class TestPageObj extends TestObjectClass {
  constructor(config) {
    super(config);
  }
}

describe('TestObjectClass test', () => {
  it('should return imported object', () => {
    expect(TestObjectClass).to.a('function');
  });

  it('should fail as configuration is missing', (done) => {
    try {
      new TestPageObj();
      expect().fail('Should not create an instance');
    } catch(err) {
      done();
    }
  });

  it('should create page object', () => {
    expect(new TestPageObj(conf)).to.be.an('object');
  });

});