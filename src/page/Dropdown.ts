import { Page, Locator } from '@playwright/test';

/**
 * DropdownPage - Mô hình trang cho trang Dropdown
 * 
 * Lớp này đại diện cho trang dropdown từ the-internet.herokuapp.com/dropdown
 * Nó cung cấp các phương thức để tương tác và xác minh chức năng dropdown
 * 
 * @example
 * const dropdownPage = new DropdownPage(page);
 * await dropdownPage.goto();
 * await dropdownPage.selectOptionByValue('1');
 */
export class DropdownPage {
    readonly page: Page;
    readonly url: string = '/dropdown';
    readonly dropdownSelect: Locator;
    readonly mainHeading: Locator;

    /**
     * Constructor - Khởi tạo page object với các locator
     * @param page - Đối tượng page của Playwright
     */
    constructor(page: Page) {
        this.page = page;
        // Phần tử select dropdown chính với id 'dropdown'
        this.dropdownSelect = page.locator('#dropdown');
        // Phần tử heading chính (h1)
        this.mainHeading = page.locator('h1');
    }

    /**
     * Điều hướng đến trang dropdown
     * Sử dụng baseURL từ playwright.config.ts + đường dẫn /dropdown
     * Chờ DOM được tải xong trước khi tiếp tục
     */
    async goto() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    }

    /**
     * Chọn một option từ dropdown theo giá trị value của nó
     * @param value - Giá trị value của option cần chọn (ví dụ: '1', '2')
     * @example await dropdownPage.selectOptionByValue('1');
     */
    async selectOptionByValue(value: string) {
        await this.dropdownSelect.selectOption(value);
    }

    /**
     * Chọn một option từ dropdown theo text hiển thị của nó
     * @param label - Text hiển thị của option cần chọn (ví dụ: 'Option 1')
     * @example await dropdownPage.selectOptionByLabel('Option 1');
     */
    async selectOptionByLabel(label: string) {
        await this.dropdownSelect.selectOption({ label });
    }

    /**
     * Lấy giá trị của option đang được chọn
     * @returns Giá trị value của option được chọn hoặc null nếu không có option nào được chọn
     * @example const value = await dropdownPage.getSelectedOption(); // Trả về '1'
     */
    async getSelectedOption(): Promise<string | null> {
        return await this.dropdownSelect.inputValue();
    }

    /**
     * Lấy text hiển thị của option đang được chọn
     * @returns Text hiển thị của option được chọn hoặc chuỗi rỗng nếu không có option nào được chọn
     * @example const text = await dropdownPage.getSelectedOptionText(); // Trả về 'Option 1'
     */
    async getSelectedOptionText(): Promise<string> {
        const selectedValue = await this.getSelectedOption();
        if (selectedValue) {
            const option = this.page.locator(`#dropdown option[value="${selectedValue}"]`);
            const text = await option.textContent();
            return text ? text.trim() : '';
        }
        return '';
    }

    /**
     * Lấy tất cả các option có sẵn từ dropdown
     * Lặp qua tất cả các phần tử option và thu thập text của chúng
     * @returns Mảng chứa text của tất cả các option (ví dụ: ['Please select an option', 'Option 1', 'Option 2'])
     * @example const options = await dropdownPage.getAllOptions();
     */
    async getAllOptions(): Promise<string[]> {
        const options = this.page.locator('#dropdown option');
        const count = await options.count();
        const optionTexts: string[] = [];

        // Lặp qua từng option và trích xuất text của nó
        for (let i = 0; i < count; i++) {
            const text = await options.nth(i).textContent();
            if (text) {
                optionTexts.push(text.trim());
            }
        }

        return optionTexts;
    }

    /**
     * Kiểm tra xem dropdown có hiển thị trên trang không
     * @returns true nếu dropdown hiển thị, false nếu không
     * @example const visible = await dropdownPage.isDropdownVisible();
     */
    async isDropdownVisible(): Promise<boolean> {
        return await this.dropdownSelect.isVisible();
    }

    /**
     * Kiểm tra xem dropdown có được bật/có thể tương tác không
     * @returns true nếu dropdown được bật, false nếu bị vô hiệu hóa
     * @example const enabled = await dropdownPage.isDropdownEnabled();
     */
    async isDropdownEnabled(): Promise<boolean> {
        return await this.dropdownSelect.isEnabled();
    }
}
