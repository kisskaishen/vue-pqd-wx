<template>
	<div>
		<div class="detailImg">
            <img :src="item.image_url" alt="商品更多详情图片"  :height="375*item.height/item.width" v-for="item in moreImg">
        </div>
	</div>
</template>

<script>
	export default {
	    props:['moreInfo'],
		data() {
			return {

			}
		},
        computed:{
	        moreImg() {
	            return this.moreInfo
            }
        },
		mounted() {

		},
		methods:{

		}
	}
</script>

<style lang="scss" scoped>
	.detailImg {
		width:100%;
        img {
            width: 100%;
        }
	}
</style>
