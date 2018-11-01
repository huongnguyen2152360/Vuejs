<template>
    <div>
        <h3 class="mt-2">Contact Page</h3>
        <button class="btn btn-outline-dark" @click="count++">Click to count</button>
        <p>{{ count }}</p>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                count: 0
            }
        }
    }
</script>

<style>

</style>