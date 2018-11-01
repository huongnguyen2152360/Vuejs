<template>
    <div class="shadow-sm p-3 mb-5 bg-white rounded">
        <div class="title">
            <slot name="lam1"></slot>
            <span style="color: #ccc">
                <slot name="subtitle">This is a sub-title, from appCard.</slot>
            </span>
        </div>
        <div class="content">
            <slot name="lam2"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['cardWord']
    }

</script>

<style scoped>
    div {
        text-align: center;
        margin-top: 1rem;
    }
    .title {
        font-style: italic;
    }
</style>