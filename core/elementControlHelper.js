let helper = {};

helper.typeahead = function ($element, val) {
    if (Array.isArray(val)) {
        val.forEach(function (item) {
            helper.selectFromTypeahead($element, item);
        });
    } else {
        helper.selectFromTypeahead($element, val);
    }
};

helper.input = function ($element, val) {
    $element.clear().sendKeys(val);
};

helper.select = function ($element, val) {
    if (Number.isInteger(val)) {
        helper.selectOption($element, val);
    } else if (typeof val === 'string') {
        helper.findOption($element, val);
    }
};

helper.multiselect = function ($element, val) {
    if (Array.isArray(val)) {
        val.forEach(function (item) {
            helper.selectTag($element, item);
        });
    } else {
        helper.selectTag($element, val);
    }
};

helper.richText = function ($element, val) {
    $element.all(by.model('html')).get(0).click();
    browser.actions().sendKeys(val).perform();
};

// ******************************************************

helper.selectFromTypeahead = function ($element, val) {
    $element.clear().sendKeys(val);
    element.all(by.repeater('match in matches track by $index')).first().click();
};

helper.findOption = function ($element, val) {
    $element.$(`option[value="${val}"]`).click();
};

helper.selectOption = function ($element, val) {
    $element.all(by.tagName('option')).get(val).click();
};

helper.selectTag = function ($element, val) {
    $element.element(by.tagName('input')).sendKeys(val);
    $element.all(by.css('.suggestion-item')).get(0).click();
    expect($element.element(by.cssContainingText('.tag-item', val)).isPresent()).toBeTruthy();
};


export default helper;
