(function () {
    "use strict";

    var array = [3, 2, 1, 5, 8, -2, 0, 6, 12, 9, 5, 7, 1, -4, -1, -8];

    function sortByDescending(array) {
        return array.sort(function (e1, e2) {
            return e2 - e1;
        });
    }

    console.log("Отсортированный массив по убыванию: " + sortByDescending(array));

    function getFirstArrayItems(array) {
        return array.slice(0, 5);
    }

    console.log("Подмассив из первых 5 элементов: " + getFirstArrayItems(array));

    function getLastArrayItems(array) {
        return array.slice(array.length - 5);
    }

    console.log("Подмассив из последних 5 элементов: " + getLastArrayItems(array));

    function getEvenNumbersSum(array) {
        return array.filter(function (item) {
            return item % 2 === 0;
        }).reduce(function (sum, currentItem) {
            return sum + currentItem;
        }, 0);
    }

    console.log("Сумма элементов массива, которые являются четными числами: " + getEvenNumbersSum(array));

    function getArray(startIndex, lastIndex) {
        var array = [];

        for (var i = startIndex; i <= lastIndex; i++) {
            array.push(i);
        }

        return array;
    }

    console.log("Массив чисел от 1 до 100: " + getArray(1, 100));

    function getEvenNumbersSquaresArray(array) {
        return array.filter(function (item) {
            return item % 2 === 0;
        }).map(function (currentValue) {
            return currentValue * currentValue;
        });
    }

    console.log("Список квадратов четных чисел: " + getEvenNumbersSquaresArray(getArray(1, 100)));
})();