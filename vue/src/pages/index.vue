<template>
  <div
    ref="page"
    class="lion"
  >
    <mouse ref="mouse" />
    <div
      ref="text"
      class="text"
    >
      <P
        v-for="(v, i) in text"
        :key="i"
      >
        {{ v }}
      </P>
    </div>
    <div
      ref="lion"
      class="lions"
    >
      <div class="lion-head">
        <div class="lion-eye left" />
        <div class="lion-eye right" />
        <div class="lion-mouse" />
        <span
          v-for="(v, i) in head"
          :key="i"
        />
      </div>
      <div class="lion-body">
        <span
          v-for="(v, i) in body"
          :key="i"
        />
      </div>
      <div class="lion-foot">
        <span
          v-for="(v, i) in foot"
          :key="i"
        />
      </div>
      <div class="lion-tail">
        <span
          v-for="(v, i) in tail"
          :key="i"
        />
      </div>
    </div>
    <router-link
      class="door"
      to="/passage"
    >
      enter
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<script lang="ts">
import { createSpot } from '../utils/index';
import { defineComponent } from 'vue';

import Mouse from 'components/background.vue';

export default defineComponent({
    components: {
        Mouse
    },
    data () {
        return {
            head: [0],
            body: [0],
            foot: [0],
            tail: [0],
            location: [] as { x: number, y: number }[],
            text: 'cleverboy world'
        };
    },
    mounted () {
        let text = this.$refs.text as HTMLElement;
        let p = text.querySelectorAll('p');
        p.forEach((item, i) => {
            let num = p.length;
            this.roundPosition((i - num / 2) * Math.PI / num / 2, 210, item, 0, 200);
            item.style.transform = `rotateZ(${(i - num / 2) * 90 / num}deg)`;
        });

        // 确定中心
        this.head = createSpot(232);
        this.body = createSpot(300);
        this.foot = createSpot(108);
        this.tail = createSpot(12);
        this.$nextTick(() => {
            this.drawLion();
        });
    },
    methods: {
        drawLion () {
            let lion = this.$refs.lion as HTMLElement;
            let spots = lion.querySelectorAll('span');
            spots.forEach((item, i) => {
                let cricleNums = 0;
                let cricleLevel = 0;
                if (i < 12) {
                    this.roundPosition(i * Math.PI / 6, 100, item, 200, 100);
                }
                if (i < 24 && i >= 12) {
                    this.roundPosition(i * Math.PI / 6, 90, item, 200, 100);
                }
                if (i >= 24 && i < 232) {
                    let cricleNum = 36 - cricleLevel * 6;
                    cricleNums += cricleNum;
                    cricleLevel = Math.floor((i - cricleNums - 24) / cricleNum);
                    this.roundPosition(2 * i * Math.PI / cricleNum, 80 - 10 * cricleLevel, item, 200, 100);
                }
                if (i >= 232 && i < 532) {
                    let y = Math.floor((i - 232) / 15) * 11 + 160;
                    let xr = (i - 232) % 15;
                    this.linePosition(130, y, item, xr * 10);
                }
                if (i >= 532 && i < 574) {
                    cricleLevel = 0;
                    cricleNums = 0;
                    let cricleNum = 14 - cricleLevel * 10;
                    cricleNums += cricleNum;
                    cricleLevel = Math.floor((i - cricleNums - 532) / cricleNum);
                    this.roundPosition(2 * i * Math.PI / cricleNum, 14 - 4 * cricleLevel, item, 120, 350);
                }
                if (i >= 574 && i < 616) {
                    cricleLevel = 0;
                    cricleNums = 0;
                    let cricleNum = 14 - cricleLevel * 10;
                    cricleNums += cricleNum;
                    cricleLevel = Math.floor((i - cricleNums - 574) / cricleNum);
                    this.roundPosition(2 * i * Math.PI / cricleNum, 14 - 4 * cricleLevel, item, 285, 350);
                }
                if (i >= 616 && i < 624) {
                    this.roundPosition(i * Math.PI / 4, 6, item, 130, 370);
                }
                if (i >= 624 && i < 628) {
                    this.roundPosition(i * Math.PI / 2, 3, item, 130, 370);
                }
                if (i >= 628 && i < 636) {
                    this.roundPosition(i * Math.PI / 4, 6, item, 280, 370);
                }
                if (i >= 636 && i < 640) {
                    this.roundPosition(i * Math.PI / 2, 3, item, 280, 370);
                }
                if (i >= 640 && i < 648) {
                    this.roundPosition((i - 33) * Math.PI / 40, 120, item, 185, 200);
                }
                if (i >= 648 && i < 652) {
                    this.roundPosition(i * Math.PI / 2, 8, item, 75, 235)
                }
            });
        },
        roundPosition (rad: number, radius: number, item: HTMLElement, centerX: number, centerY: number) {
            let x = centerX + (Math.sin(rad)) * radius;
            let y = centerY - (Math.cos(rad)) * radius;
            item.style.left = x + 'px';
            item.style.top = y + 'px';
            this.location.push({ x, y });
        },
        linePosition (centerX: number, centerY: number, item: HTMLElement, r: number) {
            let x = centerX + r;
            item.style.left = x + 'px';
            item.style.top = centerY + 'px';
            this.location.push({x: x, y: centerY});
        }
    }
})
</script>


<style lang="less">
.lion {
    width: 100%;
    min-height: 100%;
    position: relative;
    background:  #fffde6;
    -webkit-perspective: 300;
    
    text-align: center;

    .lions {
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 400px;
        height: 400px;
        border-radius: 10px;
    }

    .lion-eye,span {
        display: inline-block;
        position: absolute;
    }
    .lion-head > span {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        z-index: 1;
        -webkit-animation: changeColor0 10s infinite ease-in-out; 
        @keyframes changeColor0 {
           0% { background: #e88c30; }
           25% { background: #e8b730; }
           50% { background: #ee6d66; }
           100% { background: #ee8f66; }
        }
    }
    .lion-eye{
        top: 100px;
        width: 20px;
        height: 2px;
        border-radius: 5px;
        background: #000;
    }
    .lion-eye.left {
        left: 175px;
        -webkit-transform: rotateZ(-5deg);
    }
    .lion-eye.right {
        left: 210px;
        -webkit-transform: rotateZ(5deg);
    }
    .lion-mouse {
        position: absolute;
        width: 25px;
        left: 190px;
        top: 125px;
        border-radius: 5px;
        border-bottom: 2px solid #000;
        -webkit-transform: skew(40deg);
    }
    .lion-body > span {
        width: 12px;
        height: 12px;
        border-radius: 5px;
        background: #f4dc9c;
        -webkit-animation: changeColor1 10s infinite ease-in-out; 
        @keyframes changeColor1 {
           0% { background: #faefd1; }
           25% { background: #fae6d1; }
           50% { background: #fad3d1; }
           100% { background: #faddd1; }
        }
    }
    .lion-foot > span {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: #f4c89c;
        -webkit-animation: changeColor2 10s infinite ease-in-out; 
        @keyframes changeColor2 {
           0% { background: #f4c89c; }
           25% { background: #f4dc9c; }
           50% { background: #f4a09c; }
           100% { background: #f4b69c; }
        }
    }
    .lion-tail > span {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: #eeaa66;
        -webkit-animation: changeColor3 10s infinite ease-in-out; 
        @keyframes changeColor3 {
           0% { background: #eeaa66; }
           25% { background: #eeca66; }
           50% { background: #e83a30; }
           100% { background: #e86830; }
        }
    }
    .text {
        margin: 50px 0px 70px;
        display: inline-block;
        text-align: center;
        position: relative;
        p {
            font-size: 30px;
            text-shadow: 10px 30px 5px #faefd1;
            color: #8c5d2c;
            position: absolute;
            font-weight: 800;
        }
        
    }
    .door {
        display: inline-block;
        margin-left: 20px;
        margin-top: 20px;
        border-radius: 4px;
        background: #8c5d2c;
        padding: 1px 25px;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        text-decoration: none;
        -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    }
    .door:hover {
        -webkit-transform: rotateX(1deg) scale(1.2);
        box-shadow: 0px 0px 100px 5px #f9ece0;
    }

}

</style>
