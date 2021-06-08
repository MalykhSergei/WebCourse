"use strict";

document.addEventListener("DOMContentLoaded", function () {

    var textField = document.getElementById("input_text");
    var resultText = document.getElementById("output_kelvin");
    var errorMessage = document.getElementById("error_massage");

    document.getElementById("content_button").addEventListener("click", function () {
        var text = textField.value;

        if (text === "") {
            errorMessage.textContent = "Please enter text";
            return;
        }

        errorMessage.textContent = "";

        function convertToKelvin(value) {
            return value + 273.15;
        }

        text = parseFloat(text);


        resultText.textContent = convertToKelvin(text);

        //var message = document.createElement("label");
        //message.textContent = text;


        //resultText.appendChild(message);

        //textField.value = "";

    });
});