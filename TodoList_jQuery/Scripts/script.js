"use strict";

$(document).ready(function () {
    var textField = $("#text_field");
    var list = $("#list");
    var errorMessage = $("#error_message");

    $("#add_button").click(function () {
        var text = textField.val();

        if (text.trim() === "") {
            errorMessage.text("Please enter the text");
            return;
        }

        errorMessage.text("");

        var listItem = $("<li>");

        function setViewMode() {
            listItem.html("<span class=\"text_span\"></span>" +
                "<button class=\"edit_button\" type=\"button\" name=\"edit_button\">Edit</button>" +
                "<button class=\"delete_button\" type=\"button\" name=\"delete_button\">Delete</button>");

            listItem.find(".text_span").text(text);

            listItem.find(".delete_button").click(function () {
                listItem.remove();
            });

            listItem.find(".edit_button").click(function () {
                listItem.html("<input class=\"edit_text\" type=\"text\"/>" +
                    "<button class=\"save_button\" type=\"button\">Save</button>" +
                    "<button class=\"cancel_button\" type=\"button\">Cancel</button>" +
                    "<div id=\"edit_error_message\" class=\"error\"></div>");

                listItem.find(".edit_text").val(text);

                listItem.find(".save_button").click(function () {
                    if (listItem.find(".edit_text").val().trim() === "") {
                        var editErrorMessage = $("#edit_error_message");
                        editErrorMessage.text("Please enter the text");
                        return;
                    }

                    text = listItem.find(".edit_text").val();
                    setViewMode();
                });

                listItem.find(".cancel_button").click(function () {
                    setViewMode();
                });
            });
        }

        setViewMode();

        list.append(listItem);

        textField.val("");
        errorMessage.text("");
    });
});