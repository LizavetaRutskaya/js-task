const assert = require('chai').assert;
const webdriver = require('selenium-webdriver');
const Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;
const capabilities = Capabilities.firefox();
capabilities.set('marionette', false);

var By = webdriver.By;
var until = webdriver.until;

let driver;

before(async() => {
    driver = await new webdriver.Builder()
            .withCapabilities(capabilities).build();
    driver.get("https://www.epam.com/careers");
});

describe('EPAM careers tests', async () => {
    describe('When verifying the EPAM careers title', () => {
        it('should be equal to Explore Professional Growth title', async() => {
            const title = await driver.getTitle();
            assert.equal(title, 'Explore Professional Growth Opportunities | EPAM Careers');
        });
    });
    
    describe('When verifying Find Job Form', () => {
        it('should lead to search results', async() => {
            await driver.wait(until.elementLocated(By.className('button__content')));
            driver.findElement(By.className('button__content')).click();
            await driver.wait(until.elementLocated(By.className('job-search__form')));
            await driver.findElement(By.className('recruiting-search__input')).sendKeys('Test Automation Engineer');
            await driver.findElement(By.className('recruiting-search__submit')).click();
            
            const title = await driver.getTitle();
            assert.equal(title, 'Join our Team');
        })
    })
});

after(async() => {
    await driver.quit();
});