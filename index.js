import amazon from "./services/amazon.js";
import flipkart from "./services/flipkart.js";

amazon().then((d) => {
  console.log("Res : ");
  console.log(d);
});
flipkart().then((d) => {
	console.log("Res : ");
	console.log(d);
  });
