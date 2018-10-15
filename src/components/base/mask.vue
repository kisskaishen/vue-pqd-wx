<template>
    <div class="mask" v-if="status" :style="bgConfig" @click="maskClick">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            opacity: {
                type: Number,
                default: 0.8
            },
            status: {
                type: Boolean,
                default: false
            },
            notFixed: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scrollTop: null
            }
        },
        computed: {
            bgConfig() {
                return `background:rgba(0,0,0,${this.opacity})`
            }
        },
        watch: {
            status(val) {
                if(this.notFixed){
                    return
                }
                val ? this.afterOpen() : this.beforeClose()
            }
        },
        methods: {
            afterOpen(eleClass = 'modal-open') {
                this.scrollTop = document.scrollingElement.scrollTop;
                document.body.classList.add(eleClass);
                document.body.style.top = -this.scrollTop + 'px';
            },
            beforeClose(eleClass = 'modal-open') {
                document.body.classList.remove(eleClass);
                document.scrollingElement.scrollTop = this.scrollTop;
            },
            maskClick(){
                this.$emit('close')
            }
        }
    }
</script>

<style lang="scss">
    .modal-open {
        position: fixed;
        width: 100%;
    }
</style>
<style lang="scss" scoped>
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 999;
    }
</style>