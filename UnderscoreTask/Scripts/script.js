(function () {
    "use strict";

    var actors = [
        {
            name: "Paul",
            lastname: "Walker",
            age: 28
        },
        {
            name: "Vin",
            lastname: "Diesel",
            age: 40
        },
        {
            name: "Dwayne",
            lastname: "Johnson",
            age: 45
        },
        {
            name: "Michelle",
            lastname: "Rodriguez",
            age: 43
        },
        {
            name: "Jordana",
            lastname: "Brewster",
            age: 41
        },
        {
            name: "Tyrese",
            lastname: "Gibson",
            age: 41
        },
        {
            name: "Lucas",
            lastname: "Black",
            age: 38
        },
        {
            name: "Gal",
            lastname: "Gadot",
            age: 37
        },
        {
            name: "Kurt",
            lastname: "Russell",
            age: 70
        },
        {
            name: "Charlize",
            lastname: "Theron",
            age: 50
        }
    ];

    function getAverageAge(actors) {
        var sum = _.chain(actors)
            .pluck("age")
            .reduce(function (sum, currentAge) {
                return sum + currentAge;
            }, 0)
            .value();

        return sum / _.size(actors);
    }

    function getPeopleAgeFrom20To30(actors) {
        var sortedList = _.chain(actors)
            .filter(function (person) {
                return person.age >= 20 && person.age <= 30;
            })
            .value();

        return _.sortBy(sortedList, "age");
    }

    function addFullName(actors) {
        return _.each(actors, function (item) {
            item.fullName = item.name + " " + item.lastname;
        });
    }

    console.log("Средний возраст людей из списка равен: ");
    console.log(getAverageAge(actors));

    console.log("Список людей с возрастом от 20 до 30 лет: ");
    console.log(getPeopleAgeFrom20To30(actors));

    console.log("Добавить поле fullName: ");

    console.log(addFullName(actors));
})();