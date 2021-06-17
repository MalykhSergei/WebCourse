"use strict";

$(document).ready(function () {
    var firstName = $("#first_name_input_text");
    var lastName = $("#last_name_input_text");
    var phoneNumber = $("#phone_number_input_text");

    var table = $("#table");

    $(".form").each(function () {
        var form = $(this);

        form.find(".input_text").addClass("empty_field");

        function checkInputs() {
            form.find(".input_text").each(function () {
                if ($(this).val() !== "") {
                    $(this).removeClass("empty_field");
                } else {
                    $(this).addClass("empty_field");
                }
            });
        }

        function lightEmpty() {
            form.find(".empty_field").css({ "border-color": "#d8512d" });

            setTimeout(function () {
                form.find(".empty_field").removeAttr("style");
            }, 500);
        }

        setInterval(function () {
            checkInputs();

            var sizeEmpty = form.find(".empty_field").length;

            if (sizeEmpty > 0) {
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
            var lastNameValue = lastName.val();
            var firstNameValue = firstName.val();
            var phoneNumberValue = phoneNumber.val();

            if ($(this).hasClass("disabled")) {
                lightEmpty();
                return false;
            }

            var listItem = $("<tr>");

            listItem.html("<td class=\"id\"></td>" +
                "<td class=\"last_name\"></td>" +
                "<td class=\"first_name\"></td>" +
                "<td class=\"phone_number\"></td>" +
                "<td class=\"delete_button\"></td>");

            function setViewMode() {
                listItem.find(".last_name").text(lastNameValue);
                listItem.find(".first_name").text(firstNameValue);
                listItem.find(".phone_number").text(phoneNumberValue);
                listItem.find(".delete_button").html("<button class=\"delete_button\" type=\"button\">Delete</button");

                listItem.find(".delete_button").click(function () {
                    listItem.remove();
                });
            }

            setViewMode();

            table.append(listItem);

            clearTextFields();
        });

        function clearTextFields() {
            firstName.val("");
            lastName.val("");
            phoneNumber.val("");
        }
    });
});