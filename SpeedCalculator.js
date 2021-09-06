function speedCalculator() {
    var fastest = true;
    var blueBikers = [3, 6, 7, 2, 1];
    var redBikers = [5, 5, 3, 9, 2];
    var maxSpeed;
    var tandemBikeTeam = [];
    var speed = 0;
    var blueBikersSorted = blueBikers.sort(function (a, b) { return b - a; });
    var redBikersSorted = redBikers.sort(function (a, b) { return a - b; });
    for (var index = 0; index < blueBikersSorted.length; index++) {
        tandemBikeTeam.push([blueBikersSorted[index], redBikersSorted[index]]);
    }
    tandemBikeTeam.forEach(function (team) {
        if (fastest) {
            speed += Math.max.apply(Math, team);
        }
        else {
            speed += Math.min.apply(Math, team);
        }
    });
    if (speed > 0) {
        maxSpeed = speed;
    }
    console.log(maxSpeed);
}
speedCalculator();
