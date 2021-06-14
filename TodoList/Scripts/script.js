"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var textField = document.getElementById("text_field");
    var list = document.getElementById("list");
    var errorMessage = document.getElementById("error_message");

    document.getElementById("add_button").addEventListener("click", function () {
        var text = textField.value;

        if (text.trim() === "") {
            errorMessage.textContent = "Please enter the text";
            return;
        }

        var listItem = document.createElement("li");

        function setViewMode() {
            listItem.innerHTML =
                "<span class=\"text_span\"></span>" +
                "<button class=\"edit_button\" type=\"button\" name=\"edit_button\">Edit</button>" +
                "<button class=\"delete_button\" type=\"button\" name=\"delete_button\">Delete</button>";

            listItem.querySelector(".text_span").textContent = text;

            listItem.querySelector(".delete_button").addEventListener("click", function () {
                listItem.parentNode.removeChild(listItem);
            });

            listItem.querySelector(".edit_button").addEventListener("click", function () {
                listItem.innerHTML = "<input class=\"edit_text\" type=\"text\"/>" +
                    "<button class=\"save_button\" type=\"button\">Save</button>" +
                    "<button class=\"cancel_button\" type=\"button\">Cancel</button>" +
                    "<div id=\"edit_error_message\" class=\"error\"></div>";

                listItem.querySelector(".edit_text").value = text;

                listItem.querySelector(".save_button").addEventListener("click", function () {

                    if (listItem.querySelector(".edit_text").value.trim() === "") {
                        var editErrorMessage = document.getElementById("edit_error_message");
                        editErrorMessage.textContent = "Please enter the text";
                        return;
                    }

                    text = listItem.querySelector(".edit_text").value;
                    setViewMode();
                });

                listItem.querySelector(".cancel_button").addEventListener("click", function () {
                    setViewMode();
                });
            });
        }

        setViewMode(listItem);

        list.appendChild(listItem);

        textField.value = "";
        errorMessage.textContent = "";
    });
});