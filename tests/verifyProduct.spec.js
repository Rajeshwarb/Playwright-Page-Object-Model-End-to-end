import { test, expect } from '@playwright/test';
import { readExcel } from '../utils/readExcel.js';
import { SwagLabLoginPage } from '../Pages/swagLabsLoginPage.js';
const config = require('../config/envManager.js');
import { ProductsPage } from '../Pages/ProductsPage.spec.js';
console.log(config.baseURL);
let testData = [];
test.describe('Login Page Tests', () => {
    test.beforeAll(async () => {
        testData = await readExcel('./data/testData.xlsx', 'Products');
    });

    test('verify prodcts page tittle and elements', async ({ page }) => {
        const swagLabLoginPage = new SwagLabLoginPage(page);
        const productsPage = new ProductsPage(page);
        for (const row of testData) {
            console.log(`Test data--->${row.UserId}, ${row.Password}`);
            console.log(`Navigating to URL: ${config.baseURL}`);
            await swagLabLoginPage.gotoPage(config.baseURL);
            await swagLabLoginPage.enterloginCredentials(row.UserId, row.Password);
            await productsPage.verifyProductTitle();
        }
    });
    test('verify Item Price sorting by changing dropdown list', async ({ page }) => {
        const swagLabLoginPage = new SwagLabLoginPage(page);
        const productsPage = new ProductsPage(page);
        for (const row of testData) {
            console.log(`Test data--->${row.UserId}, ${row.Password}`);
            console.log(`Navigating to URL: ${config.baseURL}`);
            await swagLabLoginPage.gotoPage(config.baseURL);
            await swagLabLoginPage.enterloginCredentials(row.UserId, row.Password);
            await productsPage.verifyDropDownList();
        }
    });
    test('verify Add to Cart Items count', async ({ page }) => {
        const swagLabLoginPage = new SwagLabLoginPage(page);
        const productsPage = new ProductsPage(page);
        for (const row of testData) {
            console.log(`Test data--->${row.UserId}, ${row.Password}`);
            console.log(`Navigating to URL: ${config.baseURL}`);
            await swagLabLoginPage.gotoPage(config.baseURL);
            await swagLabLoginPage.enterloginCredentials(row.UserId, row.Password);
            await productsPage.verifyItemQuantityByaddToCart();
        }
    });
    test.only('Calculate price of Items', async ({ page }) => {
        const swagLabLoginPage = new SwagLabLoginPage(page);
        const productsPage = new ProductsPage(page);
        for (const row of testData) {
            console.log(`Test data--->${row.UserId}, ${row.Password}`);
            console.log(`Navigating to URL: ${config.baseURL}`);
            await swagLabLoginPage.gotoPage(config.baseURL);
            await swagLabLoginPage.enterloginCredentials(row.UserId, row.Password);
            await productsPage.calculateAddCartPrice(2);
        }
    });


});