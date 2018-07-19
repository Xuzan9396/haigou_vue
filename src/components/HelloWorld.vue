<template>
    <div class="family-check-in">
        <div class="panel">
            <div class="icon">
                <x-icon type="ios-arrow-left" size="25"></x-icon>
            </div>
            <div class="title">
                <span>家族入住</span>
            </div>
            <div>
            </div>
        </div>
        <div class="banner-content">
            <img src="../assets/banner.jpg">
        </div>
        <div class="check-in-form">
            <group>
                <x-input title="嗨够ID " label-width="7em" v-model:value=haigouform.user_id></x-input>
            </group>
            <group>
                <x-input title="家族名称" label-width="7em" v-model:value=haigouform.family_name class="family-name"
                         placeholder="请填写您的家族名称（该信息必填)" :required=true></x-input>
            </group>
            <group>
                <x-input title="手机号码" label-width="7em" placeholder="请填写您的手机号码"
                         v-model:value=haigouform.family_phone></x-input>
            </group>
            <group>
                <x-input title="微信号码" label-width="7em" placeholder="请填写您的微信号码"
                         v-model:value=haigouform.wechat_name></x-input>
            </group>
            <group>
                <x-input title="合作平台" label-width="7em" placeholder="请填写您之前合作的过的直播平台（选填)"
                         v-model:value=haigouform.cooperation_name></x-input>
            </group>
            <group>
                <x-input title="家族规模" label-width="7em" placeholder="预计家族主播人数（选填)"
                         v-model:value=haigouform.family_num></x-input>
            </group>
        </div>
        <div class="btn-submit" @click=confirm>
            <img src="../assets/submit.png">
        </div>
    </div>


</template>

<script>
    import {XInput, Group, XButton, Cell} from "vux";

    export default {
        name: "HelloWorld",
        components: {
            XInput,
            XButton,
            Group,
            Cell
        },
        data() {
            return {
                haigouform: {
                    user_id: '',
                    family_name: '',
                    family_phone: '',
                    wechat_name: '',
                    cooperation_name: '',
                    family_num: 0
                },
                url:'family/familyadd',
                signKey:'93ee2cc07694a81f35db8b'
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {

                let haigou_id = '';

                if(this.$route.query.haigou_id != undefined){
                    haigou_id = this.$route.query.haigou_id;
                }
                this.haigouform.user_id = haigou_id;

            },
            confirm(){
                // 显示
                const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
                this.$vux.confirm.show( {
                    // 组件除show外的属性
                    content:'确定您申请入驻信息正确并提交?',
                    onConfirm () {
                        _this.submitFamily();
                    }
                })
            },
            submitFamily() {
                let url = this.url;
                this.haigouform.time = this.timest();
                let sign = this.getSgin(this.haigouform);
                let sign_obj = {sign:sign};
                let new_data = Object.assign(sign_obj,this.haigouform);
                this.$axios.post(url, new_data).then(res => {
                    if(res.data.code == 0){
                        // 显示
                        this.$vux.alert.show({
                            content: '您已成功提交家族入驻申请，运营人员将很快和您联系~',
                            buttonText:"我知道了",
                            onHide(){
                                window.App.closeFamily();
                            }

                        })
                    }else{
                        // 显示
                        this.$vux.toast.show({
                            text: res.data.message,
                        })
                    }
                }).catch(err => {
                    console.log(err);
                });

            },

            getSgin(obj) {//排序的函数
                var newkey = Object.keys(obj).sort();
                //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
                let sign = '';
                var newObj = {};//创建一个新的对象，用于存放排好序的键值对
                for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
                    sign += newkey[i] + '=' + obj[newkey[i]] + '&';
                    newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
                }
                sign = sign + 'key='+this.signKey;

                return this.$md5(sign);//返回排好序的新对象
            },
            timest() {
                var tmp = Date.parse(new Date()).toString();
                tmp = tmp.substr(0, 10);
                return tmp;
            }

        }
    };
</script>

<style lang="less">
    .family-check-in {
        display: flex;
        flex-direction: column;

    .panel {
        height: 44px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

    .icon {
        align-self: center;
        padding: 0 10px;
    }

    .title {
        align-self: center;

    span {
        display: inline-block;
        margin-right: 50px;
    }

    }
    }
    .banner-content {

    img {
        height: 133px;
    }

    }
    .check-in-form {
        padding: 0 10px;

    .family-name {

    input::-webkit-input-placeholder {
        font-size: 12px;
        color: #FF0000;
    }

    }
    .weui-label {
        font-size: 14px;
    }

    }
    .btn-submit {
        align-self: center;
        margin-top: 70px;

    img {
        height: 44px;
    }

    }
    .vux-x-icon {
        fill: #989898;
    }

    .weui-cell {

    input::-webkit-input-placeholder {
        font-size: 12px;
        color: #989898;
    }

    }
    .weui-cells:before {
        border-top: none !important;
    }

    }
</style>
