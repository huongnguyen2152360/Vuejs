<template>
    <div class="component">
        <h3>User Edit</h3>
        <p>You can edit user profile here</p>
        <p>My age: {{ userAge }}</p>
        <button class="btn btn-warning" @click="editAge">Change Age</button>
    </div>
</template>

<script>
    import {eventBus} from "../main.js"
    export default {
        props: {
            userAge: Number
        },
        methods: {
            editAge() {
                this.userAge = 25,
                    // this.$emit('ageWasEdited', this.userAge)
                    eventBus.$emit('ageWasEdited', this.userAge)
            }
        }
    }
</script>

<style scoped>
    div {
        background-color: salmon;
    }
</style>