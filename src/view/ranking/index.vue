<template>
    <div class="ranking">
        <list></list>
        <tabbar></tabbar>
    </div>
</template>

<script>
    import List from '../../components/goods/list'
    import Tabbar from '../../components/footer'
    export default {
        name: "index",
        components:{ List,Tabbar }
    }
</script>

<style scoped>

</style>
