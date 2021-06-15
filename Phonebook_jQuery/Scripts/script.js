"use strict";

$(document).ready(function () {
    var firstName = $("#firstname_input_text");
    var lastName = $("#lastname_input_text");
    var phoneNumber = $("#phone_number_input_text");


    $("#add_button").click(function () {
        var firstNameValue = firstName.val();
        var lastNameValue = lastName.val();
        var phoneNumberValue = phoneNumber.val();

        if (firstNameValue === "") {
            $("#firstname_input_text").after("<span class= \"error\">This field is empty</span>");
            return;
        }
    });
});