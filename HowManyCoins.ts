function HowManyCoins(): void {

    let coinDenomination: number[] = [1, 5, 10];
    let amountToChange: number = 7;
    let changeGiven: number = -1;

    let change = amountToChange;
    let coinQuantity = 0;
    let remainingAmout = amountToChange;

    coinDenomination.sort((a, b) => { return b - a; }).forEach(denomination => {
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
    } else {
        changeGiven = coinQuantity;
    }

    console.log(changeGiven);

}

HowManyCoins();