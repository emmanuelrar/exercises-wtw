function HowManyCoins() {
    var coinDenomination = [1, 5, 10];
    var amountToChange = 7;
    var changeGiven = -1;
    var change = amountToChange;
    var coinQuantity = 0;
    var remainingAmout = amountToChange;
    coinDenomination.sort(function (a, b) { return b - a; }).forEach(function (denomination) {
        while (change > 0) {
            change -= denomination;
            if (change >= 0) {
                remainingAmout = change;
                coinQuantity++;
            }
        }
        if (change < 0) {
            change = remainingAmout;
        }
    });
    if (remainingAmout > 0) {
        changeGiven = 0;
    }
    else {
        changeGiven = coinQuantity;
    }
    console.log(changeGiven);
}
HowManyCoins();
