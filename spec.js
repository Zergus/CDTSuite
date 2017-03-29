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