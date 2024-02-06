
class DiscountName {
  constructor(discount, name) {
    this.discount = discount;
    this.name = name;
  }

  getDiscount() {
    return this.discount;
  }

  getName() {
    return this.name;
  }
}

function calculateTotal(price, quantity) {
  return price * quantity;
}

function calculateDiscount(itemA, itemB, itemC, subtotal, priceA, priceB, priceC) {
  let discount = 0.0;
  let discountName = "No discount applied";
  let discountTier = 0.0;

  // Tiered 50% discount
  if (itemA + itemB + itemC > 30) {
    if (itemA > 15) {
      discountTier += (itemA - 15) * priceA * 0.5;
    }
    if (itemB > 15) {
      discountTier += (itemB - 15) * priceB * 0.5;
    }
    if (itemC > 15) {
      discountTier += (itemC - 15) * priceC * 0.5;
    }
  }

  discount = Math.max(discount, discountTier);
  if (discount === discountTier) {
    discountName = "Tiered 50% Discount";
  }

  if (itemA + itemB + itemC > 20) {
    let discountBulk = subtotal * 0.1;
    discount = Math.max(discount, discountBulk);
    if (discount === discountBulk) {
      discountName = "Bulk 10% Discount";
    }
  }


  let discountBulk50 = 0.0;
  if (itemA > 10 || itemB > 10 || itemC > 10) {
    if (itemA > 10) {
      discountBulk50 += itemA * priceA * 0.05;
    }
    if (itemB > 10) {
      discountBulk50 += itemB * priceB * 0.05;
    }
    if (itemC > 10) {
      discountBulk50 += itemC * priceC * 0.05;
    }
    discount = Math.max(discount, discountBulk50);
    if (discount === discountBulk50) {
      discountName = "Bulk 5% Discount";
    }
  }


  if (subtotal > 200) {
    let discountFlat = 10.0;
    discount = Math.max(discount, discountFlat);
    if (discount === discountFlat) {
      discountName = "Flat $10 Discount";
    }
  }

  return new DiscountName(discount, discountName);
}


const priceA = 20.0;
const priceB = 40.0;
const priceC = 50.0;
const giftWrapFee = 1.0;
const shipping = 5.0;
const packages = 10;

function getUserInput() {
  let itemA, itemB, itemC, giftA, giftB, giftC;

  while (true) {
    try {
      itemA = parseInt(prompt("Enter quantity of Product A: "));
      itemB = parseInt(prompt("Enter quantity of Product B: "));
      itemC = parseInt(prompt("Enter quantity of Product C: "));
      giftA = prompt("Is Product A gift wrapped? (y/n): ").toLowerCase() === "y";
      giftB = prompt("Is Product B gift wrapped? (y/n): ").toLowerCase() === "y";
      giftC = prompt("Is Product C gift wrapped? (y/n): ").toLowerCase() === "y";

      if (isNaN(itemA) || isNaN(itemB) || isNaN(itemC)) {
        throw new Error("Invalid input: Please enter numerical values for quantities.");
      }

      return { itemA, itemB, itemC, giftA, giftB, giftC };
    } catch (error) {
      console.error(error.message);
    }
  }
}

const userInput = getUserInput();

let productA = calculateTotal(priceA, userInput.itemA);
let productB = calculateTotal(priceB, userInput.itemB);
let productC = calculateTotal(priceC, userInput.itemC);
let subtotal = productA + productB + productC;
let discount = calculateDiscount(
  userInput.itemA,
  userInput.itemB,
  userInput.itemC,
  subtotal,
  priceA,
  priceB,
  priceC
);
let giftWrap = (userInput.giftA ? userInput.itemA : 0) * giftWrapFee +
  (userInput.giftB ? userInput.itemB : 0) * giftWrapFee +
  (userInput.giftC ? userInput.itemC : 0) * giftWrapFee;
let numPackages = Math.ceil((userInput.itemA + userInput.itemB + userInput.itemC) / packages);
let shippingFee = numPackages * shipping;
let total = subtotal - (discount.getDiscount() + giftWrap + shippingFee);

console.log(`Product A\t${userInput.itemA}\t$${productA}`);
console.log(`Product B\t${userInput.itemB}\t$${productB}`);
console.log(`Product C\t${userInput.itemC}\t$${productC}`);
console.log(`Subtotal:\t\t$${subtotal}`);
console.log(`Discount:\t\t${discount.getName()} ${discount.getDiscount()}`);
console.log(`Gift Wrap:\t\t$${giftWrap}`);
console.log(`Shipping:\t\t$${shippingFee}`);
console.log(`Total:\t\t$${total}`);