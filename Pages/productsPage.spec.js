import { test, expect } from "@playwright/test";
class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productTitle = page.getByText('Products');
        this.addToCartButton = page.getByText('Add to Cart');
        this.emptyCartButton = page.locator('//*[@id="shopping_cart_container"]/a');
        this.cartItemCount = page.locator('//*[@id="shopping_cart_container"]/a/span');
        this.DropDownList = page.locator('[data-test="product-sort-container"]');
        this.dropdownBox = page.getByText('Name (A to Z)Name (A to Z)');
        this.listOfFirstItem = page.locator('//*[@id="inventory_container"]/div/div[1]/div[2]/div[2]/div')
        this.lowPriceFirstItem = page.getByText('Sauce Labs Onesie');
        this.highPriceFirstItem = page.getByText('Sauce Labs Fleece Jacket');
        this.calNoOfItems = page.locator('//*[@id="cart_contents_container"]/div/div[1]/div[3]/div[2]/div[2]/div');

    }

    async verifyProductTitle() {
        const title = await this.productTitle.textContent();
        expect(title).toContain('Products')
        console.log(`Product title is verified: ${title}`);
        expect(await this.emptyCartButton).toBeVisible();
        console.log(`Empty cart button is visible`);
        // 
        expect(await this.dropdownBox).toBeVisible();
        console.log(`Dropdown box is visible`);
    }
    async verifyDropDownList() {
        let optValue = '';
        let priceOfRandamItemOrder = await this.listOfFirstItem.textContent();
        console.log(`First item in the list is visible: ${priceOfRandamItemOrder}`);
        const options1 = await this.DropDownList.locator('option').elementHandles();
        for (const option of options1) {
            const value = await option.getAttribute('value');
            const label = await option.textContent();
            console.log(`Value:-> ${value}, Label:-> ${label}`);
            if (label == 'Price (high to low)') {
                optValue = label;
                break;
            }
        }
        console.log('-------------' + await options1[2].getAttribute('value'));
        console.log('-------------' + await options1[2].textContent());
        await this.DropDownList.selectOption(optValue);
        await this.page.waitForTimeout(1000);
        let priceOfFirstItem = await this.listOfFirstItem.textContent();
        console.log(`First item after sorting by high price is visible: ${priceOfFirstItem}`);

        await this.page.waitForTimeout(1000);
        const options = await this.DropDownList.locator('option').all();
        for (const option of options) {
            const value = await option.getAttribute('value');
            const label = await option.textContent();
            console.log(`Value: ${value}, Label: ${label}`);
            if (label == 'Price (low to high)') {
                optValue = label;
                break;
            }
        }
        await this.DropDownList.selectOption(optValue);
        await this.page.waitForTimeout(1000);
        let priceOfFirstItem2 = await this.listOfFirstItem.textContent();
        console.log(`Low price: ${priceOfFirstItem2.split('$')[1]} and High price: ${priceOfRandamItemOrder.split('$')[1]}`);

        if (parseInt(priceOfFirstItem2.split('$')[1]) < parseInt(priceOfRandamItemOrder.split('$')[1])) {
            console.log(`First item after sorting by low price is visible: ${priceOfFirstItem2}`);
        }
    }

    async verifyItemQuantityByaddToCart() {
        let emptyCartCount = await this.emptyCartButton.textContent();
        console.log(`Empty cart item count is: ${emptyCartCount}`);
        await this.emptyCartButton.screenshot({ path: `screenshots/emptyCartCount.png` });
        let cartItemCount1 = '';
        if (await this.cartItemCount.isVisible()) {
            console.log(`Empty cart item count`);
        } else {
            console.log(`Cart item count is empty`);
        }
        const locator = await this.addToCartButton
        const count = await locator.count();
        console.log(`Number of Add to Cart buttons found: ${count}`);
        for (let i = 0; i < count; i++) {
            await this.addToCartButton.nth(i).click();
            await this.page.waitForTimeout(1000);
            if (await this.cartItemCount.isVisible()) {
                cartItemCount1 = await this.cartItemCount.textContent();
                console.log(`Cart item count after adding item ${i + 1} is: ${cartItemCount1}`);
            } else {
                console.log(`Cart item count is empty after adding item ${i + 1}`);
            }
        }
        await this.addToCartButton.nth(0).click();
        await this.page.waitForTimeout(1000);
        if (await this.cartItemCount.isVisible()) {
            cartItemCount1 = await this.cartItemCount.textContent();
            console.log(`Cart item count after adding first item is: ${cartItemCount1}`);
        } else {
            console.log(`Cart item count is empty after adding first item`);
        }
        await this.addToCartButton.nth(1).click();
        if (await this.cartItemCount.isVisible()) {
            cartItemCount1 = await this.cartItemCount.textContent();
            console.log(`Cart item count after adding first item is: ${cartItemCount1}`);
        } else {
            console.log(`Cart item count is empty after adding first item`);
        }
    }

    async calculateAddCartPrice(itemsCnt) {
        let cartItemCount1 = '';
        const locator = await this.addToCartButton
        const count = await locator.count();
        console.log(`Number of Add to Cart buttons found: ${count}, expected: ${itemsCnt}`);
        if (count > itemsCnt) {
            for (let i = 0; i < itemsCnt; i++) {
                await this.addToCartButton.nth(i).click();
                await this.page.waitForTimeout(1000);
            }
            await this.emptyCartButton.click();
            await this.page.waitForTimeout(1000);
            let totalPrice = 0;
            for (let i = 3; i <= 3 + itemsCnt - 1; i++) {
                let itemPrice = await this.page.locator('//*[@id="cart_contents_container"]/div/div[1]/div[' + i + ']/div[2]/div[2]/div').textContent();
                console.log(`Price of item ${i}: ${itemPrice}`);
                totalPrice += parseFloat(itemPrice.split('$')[1]);
            }
            console.log(`Total price of items in the cart: $${totalPrice}`);
            await this.page.waitForTimeout(2000);

        }

    }
}
export default { ProductsPage };