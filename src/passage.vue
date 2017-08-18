<template>
    <div class="passage">
        <page-header></page-header>
        <div class="content">
            <div class="in"></div>
            <div class="table">
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/76600264">了解 BEM</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/72600899">最近写代码小结</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/70985478">em 和 rem 是什么?怎么用？</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/70918034">vue 学习总结</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/69586823">关于 promise 浅入浅出</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/69084628">vue 基本 webpack 的项目解析, 在哪个文件该做什么事情</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/68952109">vue2.0 入门之脚手架 vue-cli</a></div>
            </div>
        </div>
    </div>
</template>
<script>
import PageHeader from '@/components/page-header';

export default {
    name: 'Passage',
    components: {
        PageHeader
    }
}
</script>
<style lang="less">
.passage {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 90px;
    box-sizing: border-box;
    background: #8c5d2c;
    -webkit-perspective: 300;
    text-align: center;

    a {
        color: #8c5d2c;
        text-decoration: none;
    }

    .content {
        width: 100%;
        height: 100%; 
        background: #fffde6;
        position: relative;
        margin: 0 auto;
        padding-top: 100px;
        box-sizing: border-box;
    }
    .table:before, .table:after, .content:before, .content:after {
        position: absolute;
        width: 10px;
        content: '';
        position: absolute;
        background: #8c5d2c;
        z-index: 10;
        top: 0px;
    }
    .content:before, .content:after {
        -webkit-animation: move1 5s infinite ease-in-out;
        @keyframes move1 {
            0% { 
                -webkit-transform: rotateX(-15deg); 
                height: 110px;
            }
            25% {
                top: -10;
                height: 110px;
                -webkit-transform: rotateX(0deg); 
            }
            50% { 
                top: -20px;
                height: 150px;
                -webkit-transform: rotateX(15deg); 
            }
            75% { 
                height: 110px;
                -webkit-transform: rotateX(0deg);
            }
            100% {
                height: 110px;
                -webkit-transform: rotateX(-15deg);
            }
        }
    }
    .content:before {
        z-index: 1;
        left: 26%;
    }
    .content:after {
        z-index: 1;
        left: 74%;
    }
    .table {
        width: 60%;
        min-width: 300px;
        padding: 30px 20px 30px;
        box-sizing: border-box;
        margin: 0px auto;
        border: 1px solid #ECDAC4;
        box-shadow: 1px 1px 5px 0px #fbc5aa inset;
        position: relative;
        z-index: 100;
        background: #FFFFE5;
        -webkit-animation: move 5s infinite ease-in-out;

        @keyframes move {
            0% { -webkit-transform: rotateX(5deg); }
            25% { -webkit-transform: rotateX(0deg); }
            50% { -webkit-transform: rotateX(-5deg); }
            75% { -webkit-transform: rotateX(0deg); }
            100% { -webkit-transform: rotateX(5deg); }
        }
    }
    .table:before, .table:after {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background: #EC745F;
        box-shadow: 1px 1px 1px 1px #a1a3a1;
        top: 5px;
    }
    .table:before {
        left: 9%;
        z-index: 10;
    }
    .table:after {
        left: 90%;
    }
    .table > div {
        height: 35px;
        line-height: 35px;
        text-align: left;
        border-bottom: 1px dashed #F4CCA0;
    }
}
</style>

