import { test, expect } from '@playwright/test';
import { readExcel } from '../utils/readExcel.js';
const config = require('../config/envManager.js');
console.log(config.baseURL);
let testData = [];

test.describe('Verify Web Elements', () => {
    test.beforeAll(async () => {
        testData = await readExcel('./data/testData.xlsx', 'WebElements');
    });

    test('should verify web elements on the page', async ({ page }) => {

    });
});