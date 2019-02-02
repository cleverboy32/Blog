<template>
    <div class="passage">
        <page-header></page-header>
        <div class="content">
            <div class="nav">
                <ul v-for="(nav, key) in navs" :key="key">
                    <router-link v-for="(item, index) in nav.children"
                                :key="index"
                                :to="nav.path + '/' + item.path"
                                tag="li"
                                class="docs-trans page-docs__side__item">
                        <div class="nav__item__title">{{item.name}}</div>
                    </router-link>
                </ul>
            </div>
            <div class="blog">
                <router-view></router-view>
            </div>
            <!-- <div class="in"></div> -->
            <!-- <div class="table">
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/76600264">了解 BEM</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/72600899">最近写代码小结</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/70985478">em 和 rem 是什么?怎么用？</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/70918034">vue 学习总结</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/69586823">关于 promise 浅入浅出</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/69084628">vue 基本 webpack 的项目解析, 在哪个文件该做什么事情</a></div>
                <div><a href="http://blog.csdn.net/dadadeganhuo/article/details/68952109">vue2.0 入门之脚手架 vue-cli</a></div>
            </div> -->
        </div>
    </div>
</template>
<script>
import PageHeader from '@/components/page-header';
import RouterConfig from '../map.json';

export default {
    name: 'Passage',
    data () {
        return {
            navs: RouterConfig
        }
    },
    components: {
        PageHeader
    }
}
</script>
<style lang="less">
.passage {
    position: relative;
    width: 100%;
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
        display: flex;
    }

    .nav {
        width: 300px;
        border-right: 5px solid #8c5d2c;
        ul {
            // padding: 0px 16px;
        }
        ul > li {
            text-align: left;
            line-height: 28px;
            list-style: none;
        }
    }

    .blog {
        flex: 1;
        height: 100%;
        text-align: justify;
        padding: 20px 16px;
        line-height: 24px;

        h1, h2, h3, h4, h5, h6 {
            margin: 16px 0px;
            font-weight: 500;
        }

        pre {
            // border: 1px solid #d9d9d9;
            background-color: #eaefdc;
            padding: 20px 12px;
        }

        p {
            margin: 16px 0px;
        }

        a {
            color: red;
            margin-left: 4px;
        }
    }

    .router-link-active {
        background-color: #efe9c385;
    }
    .nav__item__title {
        padding: 8px 16px;
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
    
}
</style>

