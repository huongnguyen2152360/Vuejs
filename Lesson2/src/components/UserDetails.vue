<template>
    <div class="component">
        <h3>User Details</h3>
        <p>You can see user details here</p>
        <p>Name: {{ reverseName() }}</p>
        <p>Age: {{ userAge }}</p>
        <button class="btn btn-dark" @click="resetName">Reset Name</button>
        <button class="btn btn-danger" @click="resetNameFunction">Reset: Call back function</button>
    </div>
</template>

<script>
    import {eventBus} from "../main.js"
    export default {
        props: {
            detailsName: {
                type: Object,
                default: 'Huong Nguyen'
            },
            resetNameFunction: Function,
            userAge: Number
        },
        methods: {
            reverseName() {
                return this.detailsName.split("").reverse().join("");
            },
            resetName() {
                return this.detailsName = "Huong Nguyen",
                    this.$emit('nameWasReset', this.detailsName)
            }
        },
        created() {
            eventBus.$on('ageWasEdited', (age) => {
                this.userAge = age
            })
        }
    }
</script>

<style scoped>
    div {
        background-color: lightblue;
    }
</style>