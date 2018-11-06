<template>
<div class="row">
    <!-- Chạy vào slot của Items.vue vì mình import Items để dùng -->
    <app-items v-for="(item,index) in itemss" v-bind:data="item" v-bind:key="item" @click.native="removeItem(index)">
        {{ item }} <br><br>
        <!-- <button class="btn btn-outline-danger" @click.native="removeItem(index)">Delete</button> -->
    </app-items>
    
</div>
</template>

<script>
    import Items from './Items.vue'
    export default {
        props: ['itemss'],
        components: {
            appItems: Items
        },
        methods: {
            removeItem(index) {
                this.$emit('itemRemoved', index)
            }
        }
    }
</script>

<style>

</style>