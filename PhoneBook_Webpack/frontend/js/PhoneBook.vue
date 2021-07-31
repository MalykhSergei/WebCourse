<template>
  <div v-cloak class="container">
    <h1>Контакты</h1>

    <form class="row g-2">
      <div class="col-md-3 mb-2"
           v-for="contactDataInputField in contactsData" :key="contactDataInputField.id">
        <input v-model="contactDataInputField.text"
               :class="{'is-invalid': contactDataInputField.isInvalid}"
               type="text"
               :placeholder="contactDataInputField.name"
               class="form-control">
        <div class="invalid-feedback py-2">{{ contactDataInputField.errorMessage }}</div>
      </div>

      <div class="col-auto">
        <button @click="addContact" type="button" class="form-control btn btn-primary">Добавить</button>
      </div>
      <div class="col-auto">
        <button @click="deleteItems" type="button" class="form-control btn btn-secondary">Удалить отмеченное
        </button>
      </div>
    </form>

    <div class="row g-2 py-3">
      <div class="col-md-3 mb-2">
        <input type="text" v-model="term" class="form-control" placeholder="Поиск">
      </div>
      <div class="col-auto">
        <button @click="loadContacts" type="button" class="btn btn-primary">Поиск</button>
      </div>
      <div class="col-auto">
        <button @click="clearSearch" type="button" class="btn btn-secondary">Сбросить</button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped text-center align-middle mt-3">
        <thead>
        <tr>
          <th scope="col">
            <input type="checkbox"
                   v-model="selectAll"
                   @click="select">
          </th>
          <th scope="col">№</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя</th>
          <th scope="col">Номер телефона</th>
          <th scope="col">Удалить контакт</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(contact, index) in contacts" :key="contact.id">
          <td>
            <input type="checkbox"
                   :value="contact.id"
                   v-model="selected">
          </td>
          <td>{{ index + 1 }}</td>
          <td>{{ contact.lastName }}</td>
          <td>{{ contact.firstName }}</td>
          <td>{{ contact.phoneNumber }}</td>
          <td>
            <button @click="deleteContact(contact)" type="button" class="btn btn-primary">Удалить</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PhoneBookService from "./phoneBookService";

export default {
  data() {
    return {
      service: new PhoneBookService(),

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
    };
  },

  created() {
    this.loadContacts();
  },

  methods: {
    select() {
      this.selected = [];

      if (!this.selectAll) {
        this.contacts.forEach(contact => {
          this.selected.push(contact.id);
        });
      }
    },

    loadContacts() {
      this.service.getContacts(this.term).done(response => {
        this.contacts = response;
      }).fail(() => {
        alert("Не удалось получить список контактов");
      })
    },

    clearSearch() {
      this.term = "";
      this.loadContacts();
    },

    addContact() {
      let isInvalid = false;

      this.contactsData.forEach(contact => {
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
        this.contactsData[2].errorMessage = "Поле должно содержать цифры";
        return;
      }

      if (isInvalid) {
        return;
      }

      const contact = {
        id: this.contactId,
        lastName: this.contactsData[0].text,
        firstName: this.contactsData[1].text,
        phoneNumber: this.contactsData[2].text
      }

      this.service.addContact(contact).done(response => {
        if (!response.success) {
          this.contactsData[2].isInvalid = true;
          this.contactsData[2].errorMessage = "Номер уже существует";
          return;
        }

        this.loadContacts();

        this.contactsData.forEach(contact => {
          contact.text = "";
          contact.errorMessage = "";
        });
      }).fail(() => {
        alert("Не удалось создать контакт");
      });
    },

    deleteContact(contact) {
      this.service.deleteContact(contact.id).done(response => {
        if (!response.success) {
          alert(response.message);
          return;
        }

        this.loadContacts();
      }).fail(function () {
        alert("Не удалось удалить контакт");
      });
    },

    deleteItems() {
      let duplicateItems = this.contacts.filter(contact => this.selected.includes(contact.id));

      duplicateItems.forEach(selectedItem => {
        this.service.deleteContact(selectedItem.id).done(response => {
          if (!response.success) {
            alert(response.message);
          }
        }).fail(() => {
          alert("Не удалось удалить контакты");
        });
      });

      this.selectAll = false;
      this.selected = [];
      this.loadContacts();
    }
  }
};
</script>