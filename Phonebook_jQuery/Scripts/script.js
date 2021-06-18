"use strict";

$(document).ready(function () {
    var firstName = $("#first_name_input_text");
    var lastName = $("#last_name_input_text");
    var phoneNumber = $("#phone_number_input_text");

    var errorMessage = $("#error_message");

    var table = $("#table");

    $(".form").each(function () {
        var form = $(this);

        form.find(".input_text").addClass("empty_field");

        function checkInputFields() {
            form.find(".input_text").each(function () {
                if ($(this).val().trim() !== "") {
                    $(this).removeClass("empty_field");
                } else {
                    $(this).addClass("empty_field");
                }
            });
        }

        function selectEmptyFields(inputField) {
            form.find(inputField).css({ "border-color": "#d8512d" });

            setTimeout(function () {
                form.find(inputField).removeAttr("style");
            }, 500);
        }

        setInterval(function () {
            checkInputFields();

            var emptyFieldsCount = form.find(".empty_field").length;

            if (emptyFieldsCount > 0) {
                if ($("#add_button").hasClass("disabled")) {
                    return false;
                } else {
                    $("#add_button").addClass("disabled");
                }
            } else {
                $("#add_button").removeClass("disabled");
            }
        }, 500);

        $("#add_button").click(function () {
            var lastNameValue = lastName.val().trim();
            var firstNameValue = firstName.val().trim();
            var phoneNumberValue = phoneNumber.val().trim();
            var phoneNumberIntValue = parseInt(phoneNumberValue.toString(), 10);

            if ($(this).hasClass("disabled")) {
                selectEmptyFields(".empty_field");
                errorMessage.text("Все поля должны быть заполнены");
                return false;
            }

            if (isNaN(phoneNumberIntValue)) {
                selectEmptyFields(phoneNumber);
                errorMessage.text("Поле должно содержать только цифры");
                return false;
            }

            var listItem = $("<tr>");

            listItem.html("<td class=\"id\"></td>" +
                "<td class=\"last_name\"></td>" +
                "<td class=\"first_name\"></td>" +
                "<td class=\"phone_number\"></td>" +
                "<td class=\"delete_button\"></td>");

            function setViewMode() {
                listItem.find(".id").text(updateTableId());
                listItem.find(".last_name").text(lastNameValue);
                listItem.find(".first_name").text(firstNameValue);
                listItem.find(".phone_number").text(phoneNumberValue);
                listItem.find(".delete_button").html("<button class=\"delete_button\" type=\"button\">Delete</button");

                listItem.find(".delete_button").click(function () {
                    listItem.remove();
                    $(this).closest("td").remove();
                    updateTableId();
                });
            }

            setViewMode();

            table.append(listItem);

            updateTableId();

            clearTextFields();
        });

        function updateTableId() {
            $("#table tbody tr").each(function (i) {
                var count = i + 1;

                $(this).find(".id").text(count++);
            });
        }

        function clearTextFields() {
            firstName.val("");
            lastName.val("");
            phoneNumber.val("");
            $(".error").text("");
        }
    });
});
