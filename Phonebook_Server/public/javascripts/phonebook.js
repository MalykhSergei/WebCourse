function get(url, data) {
    return $.get(url, data);
}

function post(url, data) {
    return $.post({
        url: url,
        contentType: "application/json",
        data: JSON.stringify(data)
    });
}

new Vue({
    el: "#app",
    data: {
        contactsData: [
            {
                id: "newLastName",
                name: "Фамилия",
                text: "",
                isInvalid: false,
                errorMessage: ""
            },
            {
                id: "newFirstName",
                name: "Имя",
                text: "",
                isInvalid: false,
                errorMessage: ""
            },
            {
                id: "newPhoneNumber",
                name: "Телефон",
                text: "",
                isInvalid: false,
                errorMessage: ""
            }
        ],

        selectAll: false,
        selected: [],

        contacts: [],
        term: "",
        contactId: ""
    },

    created() {
        this.loadContacts();
    },

    methods: {
        select: function () {
            this.selected = [];

            if (!this.selectAll) {
                var self = this;

                this.contacts.forEach(function (contact) {
                    self.selected.push(contact.id);
                });
            }
        },

        loadContacts: function () {
            var self = this;

            get("/api/getContacts", {term: this.term.trim()}).done(function (response) {
                self.contacts = response;
            }).fail(function () {
                alert("Не удалось получить список контактов");
            });
        },

        clearSearch: function () {
            this.term = "";
            this.loadContacts();
        },

        addContact: function () {
            var isInvalid = false;

            this.contactsData.forEach(function (contact) {
                if (contact.text.trim() === "") {
                    isInvalid = true;
                    contact.isInvalid = true;
                    contact.text = "";
                    contact.errorMessage = "Заполните поле";
                } else {
                    contact.isInvalid = false;
                }
            });

            if (isNaN(this.contactsData[2].text)) {
                this.contactsData[2].isInvalid = true;
                this.contactsData[2].errorMessage = "Введите номер телефона";
                return;
            }

            if (isInvalid) {
                return;
            }

            var request = {
                contact: {
                    id: this.contactId,
                    lastName: this.contactsData[0].text,
                    firstName: this.contactsData[1].text,
                    phoneNumber: this.contactsData[2].text
                }
            };

            var self = this;

            post("/api/createContact", request).done(function (response) {
                if (!response.success) {
                    self.contactsData[2].isInvalid = true;
                    self.contactsData[2].errorMessage = "Номер уже существует";
                    return;
                }

                self.loadContacts();

                self.contactsData.forEach(function (contact) {
                    contact.text = "";
                    contact.errorMessage = "";
                });
            }).fail(function () {
                alert("Не удалось создать контакт");
            });
        },

        deleteContact: function (contact) {
            var self = this;

            post("/api/deleteContact", {id: contact.id}).done(function (response) {
                if (!response.success) {
                    alert(response.message);

                    return;
                }

                self.loadContacts();
            }).fail(function () {
                alert("Не удалось удалить контакт");
            });
        },

        deleteItems: function () {
            this.selected.forEach(function (selectedItem) {
                post("/api/deleteContact", {id: selectedItem}).done(function (response) {
                    if (!response.success) {
                        alert(response.message);
                    }
                }).fail(function () {
                    alert("Не удалось удалить контакты");
                });
            });

            this.selectAll = false;
            this.selected = [];
            this.loadContacts();
        }
    }
});



