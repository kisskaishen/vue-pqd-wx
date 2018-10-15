<template>
    <div class="myProm">
        我的拼团
        <div>
            <input type="type" ref="testInput">
            <input type="file" @change="imageSize" ref="test">
            <img src="../../images/icon-tuan.png" alt="" @click="$refs.test.click()">
        </div>
    </div>
</template>

<script>
    export default {
        name: "myProm",
        mounted() {

        },
        methods: {
            imageSize (e) {

                var render = new FileReader();
                let imageSize = {}
                render.onload = function (evt) {
                    let image = new Image();
                    image.src = evt.target.result
                    image.onload = function () {
                        imageSize.height = this.height
                        imageSize.width = this.width
                    }
                }
                console.log(e.target.files[0])

                render.readAsDataURL(e.target.files[0]);
                console.log(render)
                console.log(render.result)
                console.log(imageSize)
                return imageSize
            },

            // changeImg(e) {
            //     console.log(e)
            //     let render = new FileReader();
            //     console.log(render)
            //     render.onloadstart = function(res){
            //         console.log('开始读取')
            //         console.log(res)
            //     }
            //     render.onprogress = function(res){
            //         console.log('读取中')
            //         console.log(res)
            //     }
            //     render.onloadend = function(res){
            //         console.log('读取完成触发')
            //         console.log(res)
            //     }
            //
            //     render.onload = function (evt) {
            //         alert(1)
            //         console.log(evt)
            //         let imageSize = {}
            //         let image = new Image();
            //         console.log(image)
            //
            //         image.src = evt.target.result
            //         console.log(image)
            //         image.onload = function() {
            //             imageSize.height = this.height
            //             imageSize.width = this.width
            //         }
            //
            //     }
            // }
        }
    }
</script>

<style scoped>

</style>
