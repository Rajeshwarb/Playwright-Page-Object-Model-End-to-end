const { expect } = require("@playwright/test");

class SwagLabLoginPage {
    constructor(page) {
        this.page = page;
        this.userNameTextBox = page.locator('[data-test="username"]')
        this.passwordTextBox = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')
        this.headerText = page.getByText('Swag Labs')
        this.menuButton = page.locator('[id="react-burger-menu-btn"]')
    }

    async gotoPage(url) {
        await this.page.goto(url)
    }
    async enterloginCredentials(paramUserName, paramPassword) {
        console.log(`Entering credentials for user: ${paramUserName}`);
        await this.userNameTextBox.fill(paramUserName);
        await this.passwordTextBox.fill(paramPassword);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
        const headerText = await this.headerText.textContent();
        console.log(`Header Text: ${headerText}`);
        expect(await this.menuButton).toBeVisible({ timeout: 5000 });

        console.log(`Taking screenshot after login for user: ${paramUserName}`);
        await this.page.screenshot({ path: `screenshots/${paramUserName}_login.png` });
        if (headerText !== 'Swag Labs') {
            throw new Error(`Login failed, expected header text 'Swag Labs' but got '${headerText}'`);
        }
        console.log(`Login successful for user: ${paramUserName}`);
    }


}
module.exports = { SwagLabLoginPage };