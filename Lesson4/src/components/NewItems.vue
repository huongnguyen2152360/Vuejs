<template>
    <div class="row text-center mt-4">
        <div class="col-md-12 col-lg-4 col-xl-4 form-group" style="align-self:center">
            <textarea class="form-group" v-model="item" name="" id="" cols="30" rows="10" placeholder="Add items here ..."></textarea>
        </div>
        <div class="col-md-12 col-lg-8 col-xl-8 form-group" style="align-self:center; text-align: left">
            <button class="btn btn-success" @click.prevent="createNew">Add</button>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                item: ""
            }
        },
        methods: {
            createNew() {
                if (this.item == '') {
                    return false
                } else {
                    this.$emit('itemAdded', this.item);
                    this.item = '';
                }
            }
        }
    }
</script>

<style>
    textarea {
        padding: 10px;
        height: 50px;
    }
</style>