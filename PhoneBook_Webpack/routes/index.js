var express = require("express");
var router = express.Router();

var contacts = [];
var newId = 1;

router.get("/api/getContacts", function (req, res) {
    var term = (req.query.term || "").toUpperCase();

    var result = term.length === 0
        ? contacts
        : contacts.filter(function (contact) {
            return contact.firstName.toUpperCase().indexOf(term) >= 0 || contact.lastName.toUpperCase().indexOf(term) >= 0 ||
                contact.phoneNumber.toUpperCase().indexOf(term) >= 0;
        });

    res.send(result);
});

router.post("/api/deleteContact", function (req, res) {
    var id = req.body.id;

    id.forEach(contactId => {
        contacts = contacts.filter(function (contact) {
            return contact.id !== contactId;
        });
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/createContact", function (req, res) {
    var contact = req.body.contact;

    if (!contact) {
        res.send({
            success: false,
            message: "Неверный формат данных"
        });

        return;
    }

    if (!contact.lastName) {
        res.send({
            success: false,
            message: "Введите фамилию контакта"
        });

        return;
    }

    if (!contact.firstName) {
        res.send({
            success: false,
            message: "Введите имя контакта"
        });

        return;
    }

    if (!contact.phoneNumber) {
        res.send({
            success: false,
            message: "Введите номер телефона"
        });
    }

    if (contacts.some(function (c) {
        return c.phoneNumber.toUpperCase() === contact.phoneNumber.toUpperCase();
    })) {
        res.send({
            success: false,
            message: "Контакт с таким номером уже есть"
        });

        return;
    }

    contact.id = newId;
    newId++;

    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });
});

module.exports = router;