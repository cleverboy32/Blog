<template>
  <div class="passage">
    <page-header />
    <div class="content">
      <div class="nav">
        <ul
          v-for="(nav, key) in navs"
          :key="key"
        >
          <router-link
            v-for="(item, index) in nav.children"
            :key="index"
            :to="nav.path + '/' + item.path"
            class="docs-trans page-docs__side__item"
          >
            <div class="nav__item__title">
              {{ item.name }}
            </div>
          </router-link>
        </ul>
      </div>
      <div class="blog">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import PageHeader from 'components/header.vue';
import RouterConfig from 'blogs/blog-route.json';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        PageHeader
    },
    data () {
        return {
            navs: RouterConfig
        }
    }
})
</script>
<style lang="less">
.passage {
    position: relative;
    width: 100%;
    padding: 90px 0 20px 0;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    background: #fffde6;
    

    a {
        color: #8c5d2c;
        text-decoration: none;
    }

    .content {
        width: 100%;
        flex: 1;
        position: relative;
        margin: 0 auto;
        padding: 60px 0 0;
        background: #fffde6;
        overflow-x: hidden;
    }

    .nav {
        position: fixed;
        left: 0;
        width: 300px;
    }

    .nav__item__title {
        padding: 8px 16px;
        text-align: left;
        line-height: 28px;
        font-size: 18px;
        cursor: pointer;
        transition: text-shadow 0.3s ease;

        &:hover {
            text-shadow: 0 0 2px #efd8a6,
                         0 0 5px #efd8a6,
                         0 0 5px #efd8a6,
                         0 0 10px #efd8a6;
        }
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

    .blog {
        margin-left: 300px;
        box-sizing: border-box;
        padding: 0 16px;
        line-height: 24px;
        border-left: 5px solid #8c5d2c;
        text-align: left;
        min-height: 100%;

        pre {
            background-color: #8db49134;
            padding: 20px;
            color:#1d264f;
        }

        p {
            margin: 16px 0px;
        }

        a {
            color: red;
            margin-left: 4px;
        }
    }
    
}
</style>

