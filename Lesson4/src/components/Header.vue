<template>
    <div class="row">
        <div class="col-12 text-center">
            <h3>Items Added</h3>
            <div class="progress">
                <div class="progress-bar bg-danger" :style="{width: (itemsCount / itemsMax) * 100 + '%'}">
                    {{ (itemsCount / itemsMax) * 100}}%
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['itemsCount', 'itemsMax']
    }
</script>

<style>

</style>