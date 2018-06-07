<template>
    <ul class="info-content">
        <li v-for="item,index in data" :class="['info-item', index === 0 ? 'clearborder':'']">
            <h4 class="info-item-title">{{ item.label }}</h4>
            <p class="info-item-value">{{ item.value }}</p>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
.info-content {
    display: flex;
    margin: 0;
    padding: 20px 0;
    list-style-type: none;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
}
.info-item {
    padding: 0 20px;
    border-left: 1px solid #d4d4d4;
    flex-grow: 1;
}
.info-item-title {
    margin-top: 0;
    font-size: 14px;
    font-weight: 100;
    color: #aaa;
}
.info-item-value {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
}
.clearborder {
    border: none;
}
</style>
