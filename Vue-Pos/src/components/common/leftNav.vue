<template>
        <nav>
            <ul class="left-nav">
                <router-link to="/pos" tag="li">
                    <i class="icon iconfont icon-goumai"></i>
                    <p>收银</p>
                </router-link>
                <router-link to="/store" tag="li">
                    <i class="icon iconfont icon-dianpu"></i>
                    <P>店铺</P>
                </router-link>
                <router-link to="/vip" tag="li">
                    <i class="icon iconfont icon-huiyuanqia"></i>
                    <p>会员</p>
                </router-link>
                <router-link to="/statistical" tag="li">
                    <i class="icon iconfont icon-tongji1"></i>
                    <p>统计</p>
                </router-link>
                <router-link to="/setting" tag="li">
                    <i class="icon iconfont icon-gongnengjianyi"></i>
                    <p>设置</p>
                </router-link>
            </ul>
        </nav>
</template>

<script>
export default {

}
</script>

<style>
nav {
    height: 100%;
    background-color: #409EFF;
    float: left;
}
.left-nav {
    margin: 0;
    padding: 0;
    padding-top: 30px;
    color: #fff;
    font-size: 12px;
    width: 60px;
}
.left-nav .icon {
    font-size: 30px;
}
.left-nav li {
    padding: 0;
    list-style-type: none;
    text-align: center;
    user-select: none;
    cursor: pointer;
    /* border-bottom: 1px solid #DCDFE6; */
}
.left-nav li p {
    margin: 5px 0 20px 0;
}
</style>
