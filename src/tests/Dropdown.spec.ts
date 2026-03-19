import { test, expect } from '@playwright/test';
import { DropdownPage } from '../page/Dropdown';

/**
 * Test Suite: Kiểm thử trang Dropdown
 * 
 * Bộ test này xác minh tất cả chức năng dropdown trên the-internet.herokuapp.com/dropdown
 * Các test bao gồm:
 * - Khả năng hiển thị và trạng thái bật/tắt của dropdown
 * - Chọn option theo value và label
 * - Chọn nhiều option theo thứ tự
 * - Trạng thái chọn mặc định
 */
test.describe('The Internet - Dropdown POM Tests (TypeScript)', () => {
    let dropdownPage: DropdownPage;

    /**
     * beforeEach Hook - Chạy trước mỗi test
     * - Tạo một instance DropdownPage mới
     * - Điều hướng đến trang dropdown
     * - Đảm bảo trạng thái sạch cho mỗi test
     */
    test.beforeEach(async ({ page }) => {
        dropdownPage = new DropdownPage(page);
        await dropdownPage.goto();
    });

    /**
     * TC01 - Xác minh Dropdown hiển thị và được bật
     * 
     * Mục đích: Xác thực rằng phần tử dropdown tồn tại và có thể tương tác
     * 
     * Kết quả dự kiến:
     * ✓ Dropdown nên hiển thị trên trang
     * ✓ Dropdown nên được bật để chọn
     */
    test('TC01 - Verify Dropdown is Visible and Enabled', async () => {
        const visible = await dropdownPage.isDropdownVisible();
        const enabled = await dropdownPage.isDropdownEnabled();

        expect(visible).toBeTruthy();
        expect(enabled).toBeTruthy();
    });

    /**
     * TC02 - Xác minh Dropdown có nhiều Option
     * 
     * Mục đích: Xác minh rằng dropdown chứa các option mong đợi
     * 
     * Kết quả dự kiến:
     * ✓ Nên có nhiều hơn 2 option (placeholder + 2 option thực)
     * ✓ Nên in tất cả các option có sẵn ra console
     */
    test('TC02 - Verify Dropdown Has Multiple Options', async () => {
        const options = await dropdownPage.getAllOptions();
        console.log(`Tổng số option trong dropdown: ${options.length}`);
        console.log(`Các option: ${options.join(', ')}`);

        expect(options.length).toBeGreaterThan(2);
    });

    /**
     * TC03 - Xác minh Chọn Option theo Value
     * 
     * Mục đích: Kiểm thử chọn option bằng cách sử dụng thuộc tính value
     * 
     * Kết quả dự kiến:
     * ✓ Nên chọn Option 1 (value='1')
     * ✓ Giá trị được chọn nên là '1'
     */
    test('TC03 - Verify Select Option By Value', async () => {
        await dropdownPage.selectOptionByValue('1');
        const selectedValue = await dropdownPage.getSelectedOption();

        expect(selectedValue).toBe('1');
    });

    /**
     * TC04 - Xác minh Chọn Option theo Label
     * 
     * Mục đích: Kiểm thử chọn option bằng cách sử dụng text/label hiển thị
     * 
     * Kết quả dự kiến:
     * ✓ Nên chọn option theo text hiển thị của nó
     * ✓ Text được chọn nên khớp với option đích
     */
    test('TC04 - Verify Select Option By Label', async () => {
        const options = await dropdownPage.getAllOptions();
        const targetOption = options[1]; // Chọn option thứ hai (option thực đầu tiên)

        await dropdownPage.selectOptionByLabel(targetOption);
        const selectedText = await dropdownPage.getSelectedOptionText();

        expect(selectedText).toBe(targetOption);
    });

    /**
     * TC05 - Xác minh Option Two có thể được chọn
     * 
     * Mục đích: Xác minh rằng Option 2 có thể được chọn và được xác định chính xác
     * 
     * Kết quả dự kiến:
     * ✓ Option 2 (value='2') nên có thể được chọn
     * ✓ Giá trị được chọn nên là '2'
     * ✓ Text được chọn nên chứa 'Option 2'
     */
    test('TC05 - Verify Option Two is Selectable', async () => {
        await dropdownPage.selectOptionByValue('2');
        const selectedValue = await dropdownPage.getSelectedOption();
        const selectedText = await dropdownPage.getSelectedOptionText();

        expect(selectedValue).toBe('2');
        expect(selectedText).toContain('Option 2');
    });

    /**
     * TC06 - Xác minh Option One có thể được chọn
     * 
     * Mục đích: Xác minh rằng Option 1 có thể được chọn và được xác định chính xác
     * 
     * Kết quả dự kiến:
     * ✓ Option 1 (value='1') nên có thể được chọn
     * ✓ Giá trị được chọn nên là '1'
     * ✓ Text được chọn nên chứa 'Option 1'
     */
    test('TC06 - Verify Option One is Selectable', async () => {
        await dropdownPage.selectOptionByValue('1');
        const selectedValue = await dropdownPage.getSelectedOption();
        const selectedText = await dropdownPage.getSelectedOptionText();

        expect(selectedValue).toBe('1');
        expect(selectedText).toContain('Option 1');
    });

    /**
     * TC07 - Xác minh Lựa chọn mặc định (Trước khi có bất kỳ lựa chọn)
     * 
     * Mục đích: Xác minh text placeholder mặc định khi trang tải
     * 
     * Kết quả dự kiến:
     * ✓ Nên có một option placeholder bị vô hiệu hóa
     * ✓ Text placeholder nên chứa 'Please select an option'
     */
    test('TC07 - Verify Default Selection (Before Any Selection)', async ({ page }) => {
        // Tìm phần tử option placeholder bị vô hiệu hóa
        const placeholder = page.locator('#dropdown option[disabled]');
        const placeholderText = await placeholder.textContent();

        expect(placeholderText).toContain('Please select an option');
    });

    /**
     * TC08 - Xác minh Chọn nhiều Option theo thứ tự
     * 
     * Mục đích: Kiểm thử rằng việc chuyển đổi giữa các option hoạt động chính xác
     * 
     * Kết quả dự kiến:
     * ✓ Nên chọn Option 1 thành công
     * ✓ Nên chọn Option 2 thành công (chuyển từ Option 1)
     * ✓ Nên chọn lại Option 1 thành công (chuyển từ Option 2)
     * ✓ Mỗi lựa chọn nên cập nhật giá trị được chọn một cách chính xác
     */
    test('TC08 - Verify Multiple Sequential Selections', async () => {
        // Lựa chọn đầu tiên: Option 1
        await dropdownPage.selectOptionByValue('1');
        let selectedValue = await dropdownPage.getSelectedOption();
        expect(selectedValue).toBe('1');

        // Chuyển sang Option 2
        await dropdownPage.selectOptionByValue('2');
        selectedValue = await dropdownPage.getSelectedOption();
        expect(selectedValue).toBe('2');

        // Chuyển lại Option 1
        await dropdownPage.selectOptionByValue('1');
        selectedValue = await dropdownPage.getSelectedOption();
        expect(selectedValue).toBe('1');
    });
});
