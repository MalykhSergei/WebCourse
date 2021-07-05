Vue.component("todo-list-item", {
    props: {
        item: {
            type: Object,
            required: true
        }
    },

    data: function () {
        return {
            isEditing: false,
            editText: "",
            itemError: ""
        };
    },

    template: "#todo-list-item-template",

    methods: {
        startEditItem: function () {
            this.editText = this.item.text;
            this.isEditing = true;
        },

        cancelEditItem: function () {
            this.isEditing = false;
            this.itemError = "";
        },

        saveItem: function () {
            var text = this.editText;

            if (text.trim().length === 0) {
                this.itemError = "Please enter the text";
                return;
            }

            this.itemError = "";
            this.isEditing = false;
            this.$emit("save-item", this.item, this.editText);
        },

        deleteItem: function () {
            this.$emit("delete-item", this.item);
        }
    }
});

Vue.component("todo-list", {
    data: function () {
        return {
            items: [],
            newTodoText: "",
            newItemError: "",
            newId: 1
        };
    },

    template: "#todo-list-template",

    methods: {
        addNewTodoItem: function () {
            var text = this.newTodoText;

            if (text.trim().length === 0) {
                this.newItemError = "Please enter the text";
                return;
            }

            this.items.push({
                id: this.newId,
                text: text
            });

            this.newItemError = "";
            this.newTodoText = "";
            this.newId++;
        },

        deleteItem: function (item) {
            this.items = this.items.filter(function (x) {
                return x !== item;
            });
        },

        saveItem: function (item, newText) {
            item.text = newText;
        }
    }
});

new Vue({
    el: "#app"
});