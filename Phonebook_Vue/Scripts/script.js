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

        select_all: false,
        selected: [],

        contacts: [],
        contactId: 1
    },

    methods: {
        select: function () {
            this.selected = [];

            if (!this.select_all) {
                for (var item of this.contacts) {
                    this.selected.push(item.id)
                    item.isChecked = true;
                }
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
                    contact.errorMessage = "";
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
                self.contactsData[2].errorMessage = "Номер уже существует"
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
            for (var i = 0; i < this.selected.length; i++) { //let
                this.contacts.splice(this.contacts.findIndex(contact => contact.id === this.selected[i]), 1);
            }

            this.select_all = false;
            this.selected = [];
        }
    }
});