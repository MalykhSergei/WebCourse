"use strict";

$(document).ready(function () {
    var firstNameField = $("#first_name_input_text");
    var lastNameField = $("#last_name_input_text");
    var phoneNumberField = $("#phone_number_input_text");

    var errorMessage = $("#error_message");

    var table = $("#table");

    $("#add_button").click(function () {
        var lastNameValue = lastNameField.val().trim();
        var firstNameValue = firstNameField.val().trim();
        var phoneNumberValue = phoneNumberField.val().trim();
        var phoneNumberIntValue = parseInt(phoneNumberValue.toString(), 10);

        if (lastNameValue === "" || firstNameValue === "" || phoneNumberValue === "") {
            errorMessage.text("Все поля должны быть заполнены");

            $("#form").find(".input_text").each(function () {
                $(this).toggleClass("empty_field", $(this).val().trim() === "");
            });

            return;
        }

        $("#form").find(".input_text").removeClass("empty_field");

        if (isNaN(phoneNumberIntValue)) {
            errorMessage.text("Поле должно содержать только цифры");
            phoneNumberField.addClass("empty_field");
            return;
        }

        var listItem = $("<tr>");

        setViewMode();

        table.append(listItem);

        updateRowNumber();

        clearTextFields();

        function setViewMode() {
            listItem.html("<td class=\"row_number\"></td>" +
                "<td class=\"last_name\"></td>" +
                "<td class=\"first_name\"></td>" +
                "<td class=\"phone_number\"></td>" +
                "<td class=\"delete_button\"></td>");

            listItem.find(".last_name").text(lastNameValue);
            listItem.find(".first_name").text(firstNameValue);
            listItem.find(".phone_number").text(phoneNumberValue);
            listItem.find(".delete_button").html("<button class=\"button\" id=\"delete_button\" type=\"button\">Удалить</button");

            listItem.find(".delete_button").click(function () {
                listItem.remove();
                updateRowNumber();
            });
        }
    });

    function updateRowNumber() {
        table.find("tbody tr").each(function (i) {
            var rowNumber = i + 1;

            $(this).find(".row_number").text(rowNumber);
        });
    }

    function clearTextFields() {
        firstNameField.val("");
        lastNameField.val("");
        phoneNumberField.val("");
        errorMessage.text("");
    }
});