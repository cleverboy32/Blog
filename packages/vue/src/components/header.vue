<template>
    <div class="header">
        <div class="title">
            <img :src="logo">
            <div>cleverboy blog</div>
        </div>
        <div ref="nav" class="nav">
            <span>blog</span>
            <span><a href="https://github.com/cleverboy32">github</a></span>
            <span>play</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import logo from 'assets/lion.jpeg';
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PageHeader',
    mounted () {
        let container = this.$refs.nav as HTMLElement;
        container.querySelectorAll('span').forEach(() => {
            // item.addEventListener('mouseout', this.)
        })
        container.addEventListener('mouseover', this.stopAnimate, false);
        container.addEventListener('mouseout', this.playAnimate, false);
    },
    methods: {
        stopAnimate () {
            const container = this.$refs.nav as HTMLElement;
            let span = container.querySelectorAll('span');
            span.forEach((item) => {
                item.style.animationPlayState = 'paused';
            });
        },
        playAnimate () {
            const container = this.$refs.nav as HTMLElement;
            let span = container.querySelectorAll('span');
            span.forEach((item) => {
                item.style.animationPlayState = 'running';
            });
        }
    }
})
</script>

<style lang="less" scoped>
.header {
    background: #fffde6;
    height: 70px;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    text-align: left;
    position: fixed;
    border-bottom: 20px solid #8c5d2c;

    .nav {
        display: inline-block;
        height: 100%;
        cursor: pointer;
        position: relative;
        border-right: 5px solid #8c5d2c;
    }
    .nav > span {
        display: inline-block;
        background: #8c5d2c;
        color: #fff;
        font-size: 20px;
        padding: 2px 0px;
        border-radius: 4px;
        margin-top: 20px;
        width: 60px;
        text-align: center;
        position: absolute;
        box-shadow: 1px 1px 10px 0px #FED76F;

        a {
            color: inherit;
        }
    }
    
    .nav span:nth-child(1) {
        -webkit-animation: rotate1 7s infinite;
        @keyframes rotate1 {
            0% { 
                z-index: 2;
                -webkit-transform: rotateY(60deg);
                left: 30px;
            }
            33% { 
                z-index: 3;
                -webkit-transform: rotateY(-60deg);
                left: 150px;
            }
            66% { 
                z-index: 10;
                -webkit-transform: rotateY(0deg);
                left: 90px;
            }
            100% {
                z-index: 2;
                -webkit-transform: rotateY(60deg);
                left: 30px;
            }
        }
    }
    .nav span:nth-child(2) {
        -webkit-animation: rotate2 7s infinite;
        @keyframes rotate2 {
            0% { 
                z-index: 10;
                -webkit-transform: rotateY(0deg);
                left: 90px;
            }
            33% { 
                z-index: 2;
                -webkit-transform: rotateY(60deg);
                left: 30px;
            }
            66% { 
                z-index: 3;
                -webkit-transform: rotateY(-60deg); 
                left: 150px;
            }
            100% {
                z-index: 10;
                -webkit-transform: rotateY(0deg);
                left: 90px;
            }
        }
    }
    .nav span:last-child {
        -webkit-animation: rotate3 7s infinite;
        @keyframes rotate3 {
            0% { 
                z-index: 3;
                -webkit-transform: rotateY(-60deg);
                left: 150px; 
            }
            33% { 
                z-index: 10;
                -webkit-transform: rotateY(0deg); 
                left: 90px;
            }
            66% { 
                z-index: 2;
                -webkit-transform: rotateY(60deg); 
                left: 30px;
            }
            100% {
                z-index: 3;
                -webkit-transform: rotateY(-60deg);
                left: 150px;
            }
        }
    }
    
    .title {
        color: #e48734;
        font-weight: bold;
        float: right;
        margin-right: 30px;

        img {
            width: 80px;
            height: 80px;
            margin-top: 5px;
            border: 1px dotted #f8f03e;
            border-radius: 40px;
        }
        div {
            font-size: 28px;
            float: right;
            margin-top: 47px;
        }
    }
}
</style>
