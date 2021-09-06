function speedCalculator(): void {

    let fastest: boolean = true;
    let blueBikers: number[] = [3, 6, 7, 2, 1];
    let redBikers: number[] = [5, 5, 3, 9, 2];
    let maxSpeed: number;
    let tandemBikeTeam: Array<number[]> = [];
    let speed: number = 0;

    const blueBikersSorted = blueBikers.sort((a, b) => { return b - a; });
    const redBikersSorted = redBikers.sort((a, b) => { return a - b; });

    for (let index = 0; index < blueBikersSorted.length; index++) {
        tandemBikeTeam.push([blueBikersSorted[index], redBikersSorted[index]]);
    }


    tandemBikeTeam.forEach(team => {
        if (fastest) {
            speed += Math.max(...team);
        } else {
            speed += Math.min(...team);
        }
    });

    if (speed > 0) {
        maxSpeed = speed;
    }

    console.log(maxSpeed);
}

speedCalculator();