import { test, expect } from '@playwright/test';
import { readExcel } from '../utils/readExcel.js';
import { SwagLabLoginPage } from '../Pages/swagLabsLoginPage.js';
const config = require('../config/envManager.js');
console.log(config.baseURL);

let testData = [];

test.describe('Login Page Tests', () => {
  test.beforeAll(async () => {
    testData = await readExcel('./data/testData.xlsx', 'LoginData');

  });

  test('should login with all users', async ({ page }) => {
    const swagLabLoginPage = new SwagLabLoginPage(page);
    const productsPage = new ProductsPage(page);
    for (const row of testData) {
      console.log(`Test data--->${row.UserId}, ${row.Password}`);
      console.log(`Navigating to URL: ${config.baseURL}`);
      await swagLabLoginPage.gotoPage(config.baseURL);
      await swagLabLoginPage.enterloginCredentials(row.UserId, row.Password);
    }
  });
});