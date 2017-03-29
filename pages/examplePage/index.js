import TestObjectClass from '../../core/TestObjectClass';
import config from './config';

class ExamplePage extends TestObjectClass {
    constructor (config) {
        super(config);
    }
}


export default new ExamplePage(config);
