(function () {
    "use strict";

    var countries = [
        {
            name: "Russia",
            cities: [
                {
                    name: "Moskow",
                    population: 12678079
                },
                {
                    name: "Nowosibirsk",
                    population: 1625631
                },
                {
                    name: "Saint-Petersburg",
                    population: 5398064
                }
            ]
        },
        {
            name: "Germany",
            cities: [
                {
                    name: "Berlin",
                    population: 3644826
                },
                {
                    name: "Munich",
                    population: 1471508
                },
                {
                    name: "Stuttgart",
                    population: 634830
                },
                {
                    name: "Hannover",
                    population: 537000
                }
            ]
        },
        {
            name: "Austria",
            cities: [
                {
                    name: "Innsbruck",
                    population: 131961
                },
                {
                    name: "Vienna",
                    population: 1897491
                }
            ]
        },
        {
            name: "Norway",
            cities: [
                {
                    name: "Bergen",
                    population: 271949
                },
                {
                    name: "Oslo",
                    population: 697549
                },
                {
                    name: "Stavanger",
                    population: 130754
                }
            ]
        }
    ];

    function getCountriesWithMaxCitiesCount(countries) {
        var maxCitiesCount = countries.reduce(function (max, country) {
            return Math.max(max, country.cities.length);
        }, 0);

        return countries.filter(function (country) {
            return country.cities.length === maxCitiesCount;
        });
    }

    console.log("Страны с максимальным количеством городов:");
    console.log(getCountriesWithMaxCitiesCount(countries));

    function getCountriesPopulation(countries) {
        var countriesPopulation = {};

        countries.forEach(function (country) {
            countriesPopulation[country.name] = country.cities.reduce(function (sum, city) {
                return sum + city.population;
            }, 0);
        });

        return countriesPopulation;
    }

    console.log(getCountriesPopulation(countries));
})();