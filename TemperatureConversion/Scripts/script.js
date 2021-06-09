"use strict";

document.addEventListener("DOMContentLoaded", function () {

    var celsiusTextfield = document.getElementById("celsius_textfield");
    var message = document.querySelector(".message_block");

    document.getElementById("content_button").addEventListener("click", function () {
        var text = celsiusTextfield.value;

        if (text === "" || isNaN(text)) {
            message.textContent = "Please enter the number";
            message.classList.add("error_message");

            return;
        }

        message.textContent = "";
        message.classList.remove("error_message");

        function convertToKelvin(value) {
            return parseFloat(value) + 273.15;
        }

        function convertToFahrenheit(value) {
            return (parseFloat(value) * 9 / 5) + 32;
        }

        message.textContent = "Kelvin" + " =" + convertToKelvin(text);

        outputKelvin.textContent = convertToKelvin(text).toFixed(2);
        outputFahrenheit.textContent = convertToFahrenheit(text).toFixed(2);

        celsiusTextfield.textContent = "";
    });
});