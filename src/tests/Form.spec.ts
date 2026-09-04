import { test, expect } from '@playwright/test';
import { Form } from '../page/Form';
import path from 'path';

test.describe('DemoQA - Practice Form', () => {
  let form: Form;

  test.beforeEach(async ({ page }) => {
    form = new Form(page);
    await page.goto('/');
    await form.form.click();
    await page.getByText('Practice Form', { exact: true }).click();
    await expect(page).toHaveURL(/automation-practice-form/);
  });

  test('TC01 - Submit form with valid data', async ({ page }) => {
    const data = {
      firstName: 'Nguyen',
      lastName: 'Van A',
      email: 'nguyenvana@example.com',
      gender: 'Male',
      mobile: '0987654321',
      subject: 'Maths',
      hobby: 'Sports',
      address: '123 Nguyen Trai, Quan 1, TP.HCM',
      state: 'NCR',
      city: 'Delhi',
    };

    await form.firstNameInput.fill(data.firstName);
    await form.lastNameInput.fill(data.lastName);
    await form.emailInput.fill(data.email);
    await page.getByRole('radio', { name: data.gender, exact: true }).check({ force: true });
    await form.mobileNumberInput.fill(data.mobile);

    await form.dateOfBirthInput.click();
    await page.locator('.react-datepicker__month-select').selectOption('4');
    await page.locator('.react-datepicker__year-select').selectOption('1995');
    await page
      .locator('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)')
      .first()
      .click();

    // Subjects: do NOT blindly press Enter, since the input lives inside a <form>
    // -> if the dropdown option hasn't rendered yet, Enter will submit the form prematurely.
    // Wait for the option to render, then click it directly instead.
    await form.subjectsInput.fill(data.subject);
    await page.locator('.subjects-auto-complete__option', { hasText: data.subject }).first().click();

    // Hobby: use getByRole + exact to avoid substring matches (Sports/Reading/Music don't overlap,
    // but keeping this pattern consistent with gender above)
    await page.getByRole('checkbox', { name: data.hobby, exact: true }).check({ force: true });

    const filePath = path.resolve(__dirname, '..', 'data', 'images', 'simple.png');
    await form.uploadPictureButton.setInputFiles(filePath);

    await form.currentAddressTextarea.fill(data.address);

    await form.stateDropdown.click();
    await page.locator('#react-select-3-input').fill(data.state);
    await page.keyboard.press('Enter');

    await form.cityDropdown.click();
    await page.locator('#react-select-4-input').fill(data.city);
    await page.keyboard.press('Enter');

    await form.submitButton.scrollIntoViewIfNeeded();
    await form.submitButton.click({ force: true });

    // 1. Confirmation modal shows up with correct data
    await expect(form.ConfirmationModalTitle).toHaveText('Thanks for submitting the form');
    await expect(form.ConfirmationModalBody).toContainText(`${data.firstName} ${data.lastName}`);
    await expect(form.ConfirmationModalBody).toContainText(data.email);
    await expect(form.ConfirmationModalBody).toContainText(data.gender);
    await expect(form.ConfirmationModalBody).toContainText(data.mobile);
    await expect(form.ConfirmationModalBody).toContainText(data.subject);

    // 2. Modal is closed after verifying the data
    await form.ClickCloseModalButton();
    //await expect(form.ConfirmationModalTitle).not.toBeVisible();
  });

  test('TC02 - Submit form with required fields left empty', async () => {
    // Submit immediately without filling anything
    await form.submitButton.scrollIntoViewIfNeeded();
    await form.submitButton.click({ force: true });

    // Confirmation modal must NOT show up
    await expect(form.ConfirmationModalTitle).not.toBeVisible();

    // Required fields must be highlighted in red (CSS :invalid border)
    await expect(form.firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(form.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(form.mobileNumberInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('TC03 - Submit form with invalid email', async ({ page }) => {
    await form.firstNameInput.fill('Nguyen');
    await form.lastNameInput.fill('Van A');
    await form.emailInput.fill('email-khong-hop-le'); // missing @ and domain
    await page.getByRole('radio', { name: 'Male', exact: true }).check({ force: true });
    await form.mobileNumberInput.fill('0987654321');

    await form.submitButton.scrollIntoViewIfNeeded();
    await form.submitButton.click({ force: true });

    await expect(form.ConfirmationModalTitle).not.toBeVisible();
    await expect(form.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('TC04 - Submit form with invalid phone number (fewer than 10 digits)', async ({ page }) => {
    await form.firstNameInput.fill('Nguyen');
    await form.lastNameInput.fill('Van A');
    await page.getByRole('radio', { name: 'Male', exact: true }).check({ force: true });
    await form.mobileNumberInput.fill('12345'); // only 5 digits, invalid

    await form.submitButton.scrollIntoViewIfNeeded();
    await form.submitButton.click({ force: true });

    await expect(form.ConfirmationModalTitle).not.toBeVisible();
    await expect(form.mobileNumberInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
});