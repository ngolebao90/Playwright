import { Page, Locator,expect } from '@playwright/test';

export class Form {

    readonly page: Page;
    readonly form: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly genderRadioButtons: Locator;
    readonly mobileNumberInput: Locator;
    readonly dateOfBirthInput: Locator;
    readonly subjectsInput: Locator;
    readonly hobbiesCheckboxes: Locator;
    readonly uploadPictureButton: Locator;
    readonly currentAddressTextarea: Locator;
    readonly stateDropdown: Locator;
    readonly cityDropdown: Locator;
    readonly submitButton: Locator;
    readonly ConfirmationModalTitle: Locator;
    readonly ConfirmationModalBody: Locator;
    readonly closeModalButton: Locator;
    

    constructor( page: Page) {
        this.page = page;
        this.form = page.getByText('Forms', { exact: true });
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.genderRadioButtons = page.locator('input[type="radio"]');
        this.mobileNumberInput = page.locator('#userNumber');
        this.dateOfBirthInput = page.locator('#dateOfBirthInput');
        this.subjectsInput = page.locator('#subjectsContainer input');
        this.hobbiesCheckboxes = page.locator('input[type="checkbox"]');
        this.uploadPictureButton = page.locator('#uploadPicture');
        this.currentAddressTextarea = page.locator('#currentAddress');
        this.stateDropdown = page.locator('#state');
        this.cityDropdown = page.locator('#city');
        this.submitButton = page.locator('#submit');
        this.ConfirmationModalTitle = page.locator('#example-modal-sizes-title-lg');
        this.ConfirmationModalBody = page.locator('.modal-body');
        this.closeModalButton = page.locator('#closeLargeModal');
    }

    async fillForm(data: { firstName: string; lastName: string; email: string; gender: string; mobileNumber: string; dateOfBirth: string; subjects: string[]; hobbies: string[]; picturePath: string; currentAddress: string; state: string; city: string }) {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.emailInput.fill(data.email);
        await this.genderRadioButtons.filter({ hasText: data.gender }).first().check();
    }

    async submitForm() {
        await this.submitButton.click();
    }   

    async verifyFormSubmission() {
        await this.page.waitForSelector('#example-modal-sizes-title-lg');
    }   

    async closeFormSubmissionModal() {
        await this.page.locator('#closeLargeModal').click();
    }

    async verifyFormSubmissionData(expectedData: { firstName: string; lastName: string; email: string; gender: string; mobileNumber: string; dateOfBirth: string; subjects: string[]; hobbies: string[]; picturePath: string; currentAddress: string; state: string; city: string }) {
        const modalContent = this.page.locator('.table-responsive');
        await expect(modalContent).toContainText(expectedData.firstName);
        await expect(modalContent).toContainText(expectedData.lastName);
        await expect(modalContent).toContainText(expectedData.email);
        await expect(modalContent).toContainText(expectedData.gender);
        await expect(modalContent).toContainText(expectedData.mobileNumber);
        await expect(modalContent).toContainText(expectedData.dateOfBirth);
        for (const subject of expectedData.subjects) {
            await expect(modalContent).toContainText(subject);
        }
        for (const hobby of expectedData.hobbies) {
            await expect(modalContent).toContainText(hobby);
        }
        await expect(modalContent).toContainText(expectedData.picturePath.split('/').pop() || '');
        await expect(modalContent).toContainText(expectedData.currentAddress);
        await expect(modalContent).toContainText(expectedData.state);
        await expect(modalContent).toContainText(expectedData.city);
    }   

    async ClickCloseModalButton() {
        await this.closeModalButton.click();
    }


}