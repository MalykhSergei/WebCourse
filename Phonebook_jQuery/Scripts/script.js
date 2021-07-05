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

        updateRowNumbers();

        clearTextFields();

        function setViewMode() {
            listItem.html("<td class=\"row_number_column\"></td>" +
                "<td class=\"last_name_column\"></td>" +
                "<td class=\"first_name_column\"></td>" +
                "<td class=\"phone_number_column\"></td>" +
                "<td class=\"delete_contact_column\"></td>");

            listItem.find(".last_name_column").text(lastNameValue);
            listItem.find(".first_name_column").text(firstNameValue);
            listItem.find(".phone_number_column").text(phoneNumberValue);
            listItem.find(".delete_contact_column").html("<button class=\"delete_button\" type=\"button\">Удалить</button");

            listItem.find(".delete_contact_column").click(function () {
                listItem.remove();
                updateRowNumbers();
            });
        }
    });

    function updateRowNumbers() {
        table.find("tbody tr").each(function (i) {
            var rowNumber = i + 1;

            $(this).find(".row_number_column").text(rowNumber);
        });
    }

    function clearTextFields() {
        firstNameField.val("");
        lastNameField.val("");
        phoneNumberField.val("");
        errorMessage.text("");
    }
});