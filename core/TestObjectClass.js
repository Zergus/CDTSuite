import elementControlHelper from './elementControlHelper';
import navigationHelper from './navigationHelper';
import commonActions from './commonActionsHelper';

export default class TestObjectClass {
    constructor (config) {

        Object.assign(this, elementControlHelper);
        Object.assign(this, navigationHelper);
        Object.assign(this, commonActions);

        config.elements.forEach((conf) => {
            Object.defineProperty(this, conf.name, {
                get () {
                    let $el = null;

                    if (conf.model) {
                        $el = element(by.model(conf.model));
                    } else if (conf.selector) {
                        $el = $(conf.selector);
                    } else if (conf.repeater) {
                        $el = element.all(by.repeater(conf.repeater));
                    } else if (conf.multiModel) {
                        $el = element.all(by.model(conf.multiModel));
                    } else if (conf.multiSelector) {
                        $el = $$(conf.multiSelector);
                    } else if (conf.binding) {
                        $el = element(by.binding(conf.binding));
                    }

                    return $el;
                },
                set (val) {
                    this[conf.type](this[conf.name], val);
                }
            });
        });

        Object.seal(this);
    }

    static switchToTab (position) {
        return browser.getAllWindowHandles().then(function (tabs) {
            browser.driver.close();
            return browser.switchTo().window(tabs[position]);
        });
    }

}
