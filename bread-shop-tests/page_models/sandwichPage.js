const { By, Select, until } = require('selenium-webdriver');

class SandwichPage {
    constructor(driver) {
        this.driver = driver;
    }

    async validatePage() {
        let title = await this.driver.getTitle();

        if(title != "Order a Sandwich | BreadShop") {
            throw Error("You are on the wrong page.");
        }
    }

    getBreadTypeOverview() {
        return this.driver.findElement(By.className('bread-type-value')).getText();
    }

    async selectTofuFillingOption() {
        const selectElement = await this.driver.findElement(By.id('form-select-main-filling'));
        const select = new Select(selectElement);
        await select.selectByValue('tofu');
    }

    getMainFillingOverview() {
        return this.driver.findElement(By.className('main-filling-value')).getText();
    }

    getTotalPrice() {
        return this.driver.wait(until.elementLocated(By.className('total-price')), 1000, "Total price was not located", 6).getText();
    }

    setValidPromoCode() {
        return this.driver.findElement(By.className('form-input-promo-code')).sendKeys('SPRING10');
    }
 
    redeemPromoCode() {
        return this.driver.findElement(By.className('redeem-promo-code')).click();
    }

    getSpinner() {
        return this.driver.findElement(By.css('.redeem-promo-code .spinner-border'));
    }
}

module.exports = { SandwichPage }
