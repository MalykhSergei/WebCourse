import "bootstrap/dist/css/bootstrap.css";
import "../css/style.scss"

import "bootstrap/dist/js/bootstrap.bundle";
import Vue from "vue";

import PhoneBook from "./PhoneBook.vue";

new Vue({
    render: h => h(PhoneBook)
}).$mount("#app");
