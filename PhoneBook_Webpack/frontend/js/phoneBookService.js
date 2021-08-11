import $ from "jquery";

export default class PhoneBookService {
    get(url, data) {
        return $.get(url, data);
    }

    post(url, data) {
        return $.post({
            url,
            contentType: "application/json",
            data: JSON.stringify(data)
        });
    }

    getContacts(term) {
        return this.get("/api/getContacts", {term});
    }

    addContact(contact) {
        return this.post("/api/createContact", {contact});
    }

    deleteContact(id) {
        return this.post("/api/deleteContact", {id});
    }
}