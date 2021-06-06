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
                //{
                //    name: "Munich",
                //    population: 1471508
                //},
                {
                    name: "Stuttgart",
                    population: 634830
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
                //{
                //    name: "Salzburg",
                //    population: 156872
                //},
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

    function getMaxCitiesCount(countries) {
        return countries.reduce(function (max, currentCountry) {
            return Math.max(max, currentCountry.cities.length);
        }, 0);
    }

    function getCountryWithMaxCitiesCount(countries) {
        var maxCitiesInCountryCount = getMaxCitiesCount(countries);

        return countries.filter(function (country) {
            return country.cities.length === maxCitiesInCountryCount;
        });
    }

    console.log("Страны с максимальным количеством городов:");
    console.log(getCountryWithMaxCitiesCount(countries));
})();
