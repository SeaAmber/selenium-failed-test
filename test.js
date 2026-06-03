const { Builder, By, until } = require("selenium-webdriver");

(async function loginBugTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:5500/index.html");

    await driver.findElement(By.id("username")).sendKeys("wrongUser");
    await driver.findElement(By.id("password")).sendKeys("wrongPass");

    await driver.findElement(By.id("login-btn")).click();

    let status = await driver.findElement(By.id("status"));
    let text = await status.getText();

    console.log("Status text:", text);

    if (text !== "Invalid login!") {
      throw new Error("BUG DETECTED: Login succeeded with wrong credentials");
    }

  } catch (error) {
    console.log("❌ TEST FAILED — Selenium caught the bug");
    console.log(error);
  } finally {
    await driver.quit();
  }
})();
