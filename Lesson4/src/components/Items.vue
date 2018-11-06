<template>
    <div class="col-xs-12 col-sm-12 col-md-12 col-xl-6 col-lg-6">
        <div class="card text-center">
            <div class="card-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .card {
        margin-bottom: 1rem;
    }

    .card-body {
        font-family: 'Arizonia', cursive;
        font-size: 1.5em;
        cursor: pointer;
    }

    .card-body:hover {
        background-color: #8eebd0;
        color: #ffffff;
    }
</style>