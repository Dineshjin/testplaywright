import { chromium ,test, expect, firefox, webkit } from '@playwright/test';




test('Test Scenario 1', async({page}) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/');

  await page.getByText('Simple Form Demo').click();

  await expect(page).toHaveURL(/.*simple-form-demo/);
  const FirtsInput = "Welcome to LambdaTest"
  await page.getByPlaceholder('Please enter your Message').fill(FirtsInput)
  await page.getByRole('button', { name: 'Get Checked Value' }).click();
  await page.waitForTimeout(5000)
  expect(page.locator("//div[@id='user-message']//p[@id='message']")).toContainText(FirtsInput)
  await page.waitForTimeout(5000)

});




test('Test Scenario 2', async ({page}) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/');
  await page.click("text=Drag & Drop Sliders")

  const s = await page.locator("//h4[text()=' Default value 15']/../div/input")
  if(s){
   let sbound =await s.boundingBox();
   if(sbound){
    await page.waitForTimeout(1000);
    await page.mouse.move(sbound.x + sbound.width /2, sbound.y + sbound.height /2);
    await page.mouse.down();
    await page.waitForTimeout(1000);
    await page.mouse.move(sbound.x + sbound.width /2 + 214 , sbound.y + sbound.height /2);
    await page.mouse.up();
 }
}
  await expect(page.locator("//h4[text()=' Default value 15']/../div/output")).toContainText('95');
  //console.log(await page.locator("//h4[text()=' Default value 15']/../div/output").innerText());
  await page.waitForTimeout(5000)
  
});

test('Test Scenario 3', async ({page}) => {

  await page.goto('https://www.lambdatest.com/selenium-playground/');
  await page.click("text=Input Form Submit")

  await page.locator("//button[text()='Submit']").click()

  const nameField = page.locator("//input[@id='name']");
  const validationMsg = await nameField.evaluate(el => el.validationMessage);
  expect(validationMsg).toBe('Please fill out this field.');

  await page.locator("//input[@id='name']").fill("xxxxxx")
  await page.locator("//input[@placeholder='Email']").fill("abcd@gmail.com")
  await page.locator("//input[@placeholder='Password']").fill("ABCcde@1234")
  await page.locator("//input[@placeholder='Company']").fill("ABC")
  await page.locator("//input[@placeholder='Website']").fill("www.xyz.com")
  await page.locator("//select[@name='country']").selectOption("United States")
  await page.locator("//input[@placeholder='City']").fill("Arizona")
  await page.locator("//input[@placeholder='Address 1']").fill("ABC")
  await page.locator("//input[@placeholder='Address 2']").fill("DEF")
  await page.locator("//input[@placeholder='State']").fill("AZ")
  await page.locator("//input[@placeholder='Zip code']").fill("666555")
  await page.locator("//button[text()='Submit']").click()

  await expect(page.locator("//p[@class='success-msg hidden']")).toBeVisible
  await expect(page.locator("//p[@class='success-msg hidden']")).toContainText('Thanks for contacting us, we will get back to you shortly.')
  await page.waitForTimeout(5000)

  
});