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
        search: "",

        contacts: [],
        contactId: 1
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

            var self = this;

            if (this.contacts.some(function (contact) {
                return contact.phoneNumber === self.contactsData[2].text;
            })) {
                self.contactsData[2].isInvalid = true;
                self.contactsData[2].errorMessage = "Номер уже существует";
                return;
            }

            this.contacts.push({
                id: this.contactId,
                lastName: this.contactsData[0].text,
                firstName: this.contactsData[1].text,
                phoneNumber: this.contactsData[2].text
            });

            this.contactsData.forEach(function (contact) {
                contact.text = "";
                contact.errorMessage = "";
            });

            this.contactId++;
        },

        deleteContact: function (item) {
            this.contacts = this.contacts.filter(function (x) {
                return x !== item;
            });
        },

        deleteItems: function () {
            var self = this;

            this.selected.forEach(function (selectedItem) {
                self.contacts.splice(self.contacts.findIndex(function (contact) {
                    return contact.id === selectedItem;
                }), 1);
            });

            this.selectAll = false;
            this.selected = [];
        }
    }
});