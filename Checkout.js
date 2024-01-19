const checkOut = (a, b, c, giftWrap) => {
    let aPrice = 20;
    let bPrice = 40;
    let cPrice = 50;
    let totalUnits = a + b + c;
    let giftWrapFee = 0;
    let shippingPackages;
    let shippingFees = 0;
    let availableDiscounts = [];
    let discountDetails = {
        name: "No discount available",
        amount: 0
    };

    let total = (a * aPrice) + (b * bPrice) + (c * cPrice);

    if (total > 200) availableDiscounts.push({ name: "flat_10_discount", amount: 10 });

    if (a > 10) availableDiscounts.push({ name: "bulk_5_discount", amount: ((a * aPrice) / 100) * 5 })
    if (b > 10) availableDiscounts.push({ name: "bulk_5_discount", amount: ((b * bPrice) / 100) * 5 })
    if (c > 10) availableDiscounts.push({ name: "bulk_5_discount", amount: ((c * cPrice) / 100) * 5 })

    if (totalUnits > 20) availableDiscounts.push({ name: "bulk_10_discount", amount: (total / 100) * 10 });

    if (totalUnits > 30 && (a > 15 || b > 15 || c > 15)) {

        let tierDiscount = 0;

        if (a > 15) tierDiscount += tiered_50_discount(a, aPrice);
        if (b > 15) tierDiscount += tiered_50_discount(b, bPrice);
        if (c > 15) tierDiscount += tiered_50_discount(c, cPrice);

        availableDiscounts.push({ name: "tiered_50_discount", amount: tierDiscount });
    }

    if (availableDiscounts.length > 0) {
        let sortedDiscounts = availableDiscounts.sort((a, b) => b.amount - a.amount);
        discountDetails = sortedDiscounts[0];
    }

    if (giftWrap) {
        giftWrapFee = totalUnits
    }

    if (totalUnits > 0) {
        shippingPackages = Math.ceil(totalUnits / 10);
        shippingFees = shippingPackages * 5;
    }

    console.log(`
         Product A    : Quantity - ${a} Amount - ${a * aPrice}
         Product B    : Quantity - ${b} Amount - ${b * bPrice}
         Product C    : Quantity - ${c} Amount - ${c * cPrice}
         Subtotal     :                        ${total}
         Discount     : ${discountDetails.name} - ${discountDetails.amount}
         Shipping Fee : ${shippingFees}
         GiftWrap Fee : ${giftWrapFee}
         Total        : ${total - discountDetails.amount + shippingFees + giftWrapFee}
         `
    )
    console.log(discountDetails, shippingFees);

}

const tiered_50_discount = (units, price) => {
    let discount = (((units - 15) * price) / 100) * 50;
    return discount;
}
// checkOut(16, 16, 30) without giftwrap
// checkOut(16, 16, 30, true); with giftwrap
