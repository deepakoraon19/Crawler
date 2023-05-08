// const puppeteer = require("puppeteer");
import puppeteer from "puppeteer";
function flipkart() {
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.flipkart.com/");
    await page.evaluate(() => {
      let searchBox = document.querySelector("._3704LK");
      searchBox.value = "Iphone 14";
      let searchBtn = document.querySelector(".L0Z3Pu");
      searchBtn.click();
    });
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    let res = await page.evaluate(() => {
      let results = [];
      let itemName = document.querySelectorAll("_4rR01T");
      let itemPrice = document.querySelectorAll("._30jeq3 _1_WHN1");
      itemName.forEach((i) => {
        results.push({ item: i.innerText });
      });
      itemPrice.forEach((i, inc) => {
        results[inc] = { ...results[inc], price: i.innerText };
      });
      return results;
    });

    await browser.close();
    resolve(res);
  });
}

export default flipkart;
