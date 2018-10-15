<template>
    <div class="gift-rule" v-html="ruleText"></div>
    <!-- 11 -->
</template>
<script>
    export default {
        data() {
            return {
                ruleText: ""
            }
        },
        created() {
            let ruleText = this.$local.get('giftRule').ruleText
            if (ruleText) {
                this.ruleText = ruleText
            } else {
                let self = this;
                self.$post('bargain/getBargainInfo', {})
                    .then(res => {
                        this.ruleText = res.info.rule_desc
                        this.$local.set("giftRule", {ruleText: this.ruleText})
                    })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .gift-rule {
        padding: 37px 75px;
    }
</style>
