// const puppeteer = require("puppeteer");
import puppeteer from "puppeteer";
function amazon() {
    return new Promise(async (resolve, reject) => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto("https://www.amazon.in/");
      await page.evaluate(() => {
        let searchBox = document.querySelector("#twotabsearchtextbox");
        searchBox.value = "Oneplus 11R";
        let searchBtn = document.querySelector("#nav-search-submit-button");
        searchBtn.click();
      });
      await page.waitForNavigation({ waitUntil: "domcontentloaded" });
      let res = await page.evaluate(() => {
        let results = [];
        let itemName = document.querySelectorAll(
          "h2 > .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal > span"
        );
        let itemPrice = document.querySelectorAll("span.a-price-whole");
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

  export default amazon;