import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';

/**
 * Utility để đọc dữ liệu test từ Excel/CSV
 * 
 * Sử dụng để chạy data-driven tests với dữ liệu từ file
 */

interface TestCaseData {
    id: string;
    description: string;
    action: string;
    value: string;
    expectedResult: string;
    status?: string;
}

/**
 * Đọc dữ liệu test từ CSV file
 * @param filePath - Đường dẫn đến file CSV
 * @returns Mảng chứa các test case data
 * 
 * @example
 * const testData = readTestDataFromCsv('data/DropdownTestData.csv');
 * testData.forEach(test => {
 *   console.log(test.id, test.description);
 * });
 */
export function readTestDataFromCsv(filePath: string): TestCaseData[] {
    try {
        const fileContent = readFileSync(filePath, 'utf-8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
        });

        return records.map((record: any) => ({
            id: record['Test Case ID']?.trim() || '',
            description: record['Description']?.trim() || '',
            action: record['Action']?.trim() || '',
            value: record['Value/Label']?.trim() || '',
            expectedResult: record['Expected Result']?.trim() || '',
            status: record['Status']?.trim() || '',
        }));
    } catch (error) {
        console.error(`Lỗi khi đọc file: ${filePath}`, error);
        throw error;
    }
}

/**
 * Lọc test cases theo action type
 * @param allTests - Mảng tất cả test cases
 * @param actionType - Loại action cần lọc (ví dụ: 'selectOptionByValue')
 * @returns Mảng test cases có action khớp
 * 
 * @example
 * const selectTests = filterTestsByAction(allTests, 'selectOptionByValue');
 */
export function filterTestsByAction(
    allTests: TestCaseData[],
    actionType: string
): TestCaseData[] {
    return allTests.filter(test => test.action.includes(actionType));
}

/**
 * Lấy test case theo ID
 * @param allTests - Mảng tất cả test cases
 * @param testId - ID của test case cần tìm
 * @returns Test case data hoặc undefined
 * 
 * @example
 * const test = getTestById(allTests, 'TC001');
 */
export function getTestById(
    allTests: TestCaseData[],
    testId: string
): TestCaseData | undefined {
    return allTests.find(test => test.id === testId);
}

/**
 * Chuyển đổi Excel file sang CSV
 * Ghi chú: Cần phải chạy script Python để tạo file CSV từ Excel
 * 
 * Hoặc có thể sử dụng xlsx library trong Node.js
 */
export function excelToCsv(excelPath: string): void {
    console.log(`Vui lòng chuyển đổi ${excelPath} sang CSV format bằng Excel hoặc Python`);
}