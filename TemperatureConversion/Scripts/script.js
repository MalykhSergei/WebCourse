"use strict";

document.addEventListener("DOMContentLoaded", function () {

    var celsiusTextfield = document.getElementById("celsius_textfield");

    var outputKelvin = document.getElementById("output_kelvin");
    var outputFahrenheit = document.getElementById("output_fahrenheit");

    document.getElementById("content_button").addEventListener("click", function () {

        var inputText = celsiusTextfield.value;

        console.log(inputText);

        if (inputText === "" || isNaN(inputText)) {

            outputKelvin.textContent = "";
            outputFahrenheit.textContent = "";
            alert("Please enter the number!");
            return;
        }

        celsiusTextfield.textContent = "";

        function convertToKelvin(value) {
            return parseFloat(value) + 273.15;
        }

        function convertToFahrenheit(value) {
            return (parseFloat(value) * 9 / 5) + 32;
        }

        outputKelvin.textContent = convertToKelvin(inputText).toFixed(2);
        outputFahrenheit.textContent = convertToFahrenheit(inputText).toFixed(2);
    });
});