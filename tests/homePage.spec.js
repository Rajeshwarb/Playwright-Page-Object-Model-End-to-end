import { test, expect } from '@playwright/test';
const config = require('../config/envManager.js');
import { SwagLabLoginPage } from '../Pages/swagLabsLoginPage.js';
import { HomePagePractice } from '../Pages/homePagePractice.js';
console.log(config.baseURL);

let testData = [];

test.describe('Login Page Tests', () => {
    test('verify home page web elements', async ({ page }) => {
        const swagLabLoginPage = new SwagLabLoginPage(page);
        const homePage = new HomePagePractice(page);
        console.log(`Navigating to URL: ${config.baseURL}`);
        await swagLabLoginPage.gotoPage(config.baseURL1);
        await homePage.verifyWebElements();
    });
});