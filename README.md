# CDTSuite
Configuration driven testing suite for protractor. Tool for writing modular, expandable, flexible, configurable tests based on [Protractor](https://github.com/angular/protractor).

## Installation
Clone repo or `npm install cdtsuite`.Verify Java installed. Then run `npm install`.

## Execute
`npm start` will update and start webdriver. `npm test` will start protractor with `protractor.config.js`.

## Usage
Write page objects with related configurations. Configurations contains all elements tests interacts with and defining way to fill them with data. Helpers will provide mixins with methods used to easily set test data in elements that are input fields or special handlers. Storage will provide singleton object where you can store some data needed (e.g. previous url of created user by test scenario). Example below.

**BEFORE:**
```
describe('Protractor Demo App', function() {
  it('should add one and two', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
    element(by.model('first')).sendKeys(1);
    element(by.model('second')).sendKeys(2);

    element(by.id('gobutton')).click();

    expect(element(by.binding('latest')).getText()).
        toEqual('5'); // This is wrong!
  });
});
```
**AFTER:**
```
import examplePage from './pages/examplePage';

describe('Protractor Demo App', () => {
  it('should add one and two', () => {
    examplePage.login();
    examplePage.first = '1';
    examplePage.second = '2';

    examplePage.gobutton.click();

    expect(examplePage.latest.getText()).toEqual('5'); // This is wrong!
  });
});
```

### Config file
Example of configuration file:
```
export default {
    elements: [
        {
            name: 'first',
            model: 'first',
            type: 'input'
        }
    ]
};
```
Element **SHOULD** contain `name` and *CAN* contain `type` and look up proterty as `model`.

List of possible properties:
- `selector`
- `repeater`
- `multiModel`
- `multiSelector`
- `binding`

Look up properties represents method that will be used when retreaving property of page object. For example `selector` is alias to `$(selector)` and `model` is alias `element(by.model(model))`.

### Index file (page object)
Example of creating page object as module:
```
import TestObjectClass from '../../core/TestObjectClass';
import config from './config';

class ExamplePage extends TestObjectClass {
    constructor (config) {
        super(config);
    }
}


export default new ExamplePage(config);
```
Page class **SHOULD** be inherited from `TestObjectClass`. During inheritance all elements from configuration file are assigned to page object properties with same name as `name` property in element configuration.
Getter of property will return Proptractor `element` instance, but in cases of usage `multiSelector`, will return instance of `element.all`.
Setter of property instead of updating value calls dedicated method from `TestObjectClass` based on `type` of element in configuration. For example `type: input` will call:
```
// conf.type === 'input', this[conf.name] calling getter ther retrieves element from page
this[conf.type](this[conf.name], val);
```
```
helper.input = function ($element, val) {
    $element.clear().sendKeys(val);
};
```
Page object *CAN* contain methods for incapsulating steps that can be combined in action.

Page object is sealed after creation that restricts from using *unknown* elements that are not yet configured. As well it forses to use `testDataStorage` module to store data needed during tests lifecycle.

### Helper files
Core folder contains different types of helpers that are mixins for `TestObjectClass`. This allows to:
- use any helper directly from any page object when needed
- re-use helper methods for different types of fields
- consolidate navigation and common buttons/actions

Have fun!
