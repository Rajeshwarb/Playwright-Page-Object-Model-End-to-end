import { test, expect } from '@playwright/test';
class HomePagePractice {
    constructor(page) {
        this.page = page;
        this.logoImage = page.getByRole('img');
        this.radioButton1 = page.locator(('input.radioButton').nth(0));
        this.radioButton2 = page.locator('input.radioButton').nth(1);
        this.radioButton3 = page.locator('input.radioButton').nth(2);
        this.autocompletetextBox = page.locator('#autocomplete');
        this.dropdown = page.locator('#dropdown-class-example');
        this.checkbox1 = page.locator('#checkBoxOption1');
        this.checkbox2 = page.locator('#checkBoxOption2');
        this.checkbox2 = page.locator('#checkBoxOption3');
        this.opennewWindButton = page.locator('#openwindow');
        this.opennewTab = page.locator('#opentab');
        this.name = page.locator('#name');
        this.alertbtn = page.locator('#alertbtn');
        this.confirmbtn = page.locator('#confirmbtn');
        this.table = page.locator('table.table-display');

    }
    async verifyHomePageElements() {
        await expect(this.logoImage).toBeVisible();
        await expect(this.radioButton1).toBeVisible();
        await expect(this.radioButton2).toBeVisible();
        await expect(this.radioButton3).toBeVisible();
        await expect(this.autocompletetextBox).toBeVisible();
        await expect(this.dropdown).toBeVisible();
        await expect(this.checkbox1).toBeVisible();
        await expect(this.checkbox2).toBeVisible();
        await expect(this.opennewWindButton).toBeVisible();
        await expect(this.opennewTab).toBeVisible();
        await expect(this.name).toBeVisible();
        await expect(this.alertbtn).toBeVisible();
        await expect(this.confirmbtn).toBeVisible();
        await expect(this.table).toBeVisible();

    }

};
module.exports = { HomePagePractice };