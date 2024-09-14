<template>
  <div class="bg-page">
    <div class="bg-page__mouse">
      <div class="bg-page__halfmouse top">
        <div class="bg-page__teeth" />
        <div class="bg-page__teeth" />
        <div class="bg-page__teeth" />
        <div class="bg-page__bigteeth" />
        <div class="bg-page__lips" />
      </div>
      <div class="bg-page__halfmouse bottom">
        <div class="bg-page__teeth" />
        <div class="bg-page__teeth" />
        <div class="bg-page__teeth" />
        <div class="bg-page__bigteeth" />
        <div />
        <div class="bg-page__lips" />
      </div>
    </div>
    <div class="bg-page__teethbrush" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BgPage'
})
</script>
<style lang="less">
.bg-page__mouse {
    position: absolute;
    left: 220px;
    top: 120px;
    width: 70px;
    background-color: #f4a09c;
    z-index: 20;
    border-radius: 10px;
    -webkit-perspective: 1px;
    -webkit-transform-style:  preserve-3d;
}

.bg-page__halfmouse {
    box-sizing: border-box;
    position: relative;
    height: 20px;
    overflow: hidden;
    text-align: center;
    @-webkit-keyframes cloudmove {
        from {background: #1663c7;} to {background: #d1e3fa;}
    }
}

.bg-page__halfmouse.top {
    .bg-page__lips {
        top: 0px;
        background: -webkit-linear-gradient(top, #f4a09c, rgba(232, 58, 48, 1));
        border-radius: 5px 5px 0px 0px;
    }
}

.bg-page__teeth {
    background-color: #fff;
    height: 17px;
    width: 16px;
    float: left;
    box-shadow: -1px 0px #eee;
    box-sizing: border-box;
    border-radius: 3px;
}
.bg-page__teeth:first-child {
    width: 18px;
    margin-left: 1px;
    border-radius: 10px 0px 5px 5px;
}
.bg-page__bigteeth {
    box-shadow: -1px 0px #eee;
    float: left;
    background-color: #fff;
    height: 18px;
    width: 17px;
    border-radius: 1px 2px 2px 2px;
    position: relative;
}

.bg-page__bigteeth:after {
    content: '';
    display: inline-block;
}


.bg-page__halfmouse.bottom {
    .bg-page__teeth:first-child {
        border-radius: 5px 5px 0px 10px;
    }
    .bg-page__bigteeth {
        border-radius: 5px 5px 0px 1px;
    }
    .bg-page__lips {
        background: -webkit-linear-gradient(bottom, #f4a09c, rgba(232, 58, 48, 1));
        bottom: 0px;
        border-radius: 0px 0px 7px 7px;
    }
}
.bg-page__lips {
    height: 10px;
    position: absolute;
    width: 100%;
    -webkit-animation: changeColor 10s infinite ease-in-out;

    @-webkit-keyframes changeColor {
        0% { background: #fae6d1; }
        25% { background: #faefd1; }
        50% { background: #fad3d1; }
        100% { background: #faddd1; }
    }
}
.bg-page__teethbrush {
    top: 70px;
    z-index: 100;
    width: 20px;
    height: 40px;
    position: absolute;
    background-color: rgba(247, 247, 247, 1);
    border: 1px solid #eee;
    -webkit-transform: rotateX(0deg) rotateY(40deg) rotateZ(30deg);
    -webkit-animation: burshmove 5s infinite ease-in-out alternate; 

    @-webkit-keyframes burshmove {
        0% {
            left: 300px;
            top: 130px;
            -webkit-transform:rotateY(-60deg) rotateZ(30deg);               
        }
        10% {
            left: 280px;
            top: 125px;
            -webkit-transform:rotateY(10deg) rotateZ(5deg);               
        }
        25% {
            left: 270px;
            top: 120px;
            -webkit-transform:rotateY(5deg) rotateZ(5deg);
        }
        35% {
            left: 260px;
            top: 125px;
            -webkit-transform:rotateY(5deg) rotateZ(5deg);
        }
        50% {
            left: 250px;
            top: 120px;
            -webkit-transform:rotateY(0deg) rotateZ(0deg);
        }
        65% {
            left: 240px;
            top: 127px;
            -webkit-transform:rotateY(0deg) rotateZ(0deg);
        }
        75% {
            left: 230px;
            top: 130px;
            -webkit-transform:rotateY(10deg) rotateZ(-5deg);
        }
        85% {
            left: 220px;
            top: 120px;
            -webkit-transform:rotateY(10deg) rotateZ(-5deg);
        }
        100% {
            left: 210px;
            top: 127px;
            -webkit-transform:rotateY(55deg) rotateZ(-25deg);
        }
    }
}
.bg-page__teethbrush:before {
    z-index: 100;
    position: absolute;
    left: -20px;
    display: inline-block;
    top: 10px;
    background: -webkit-linear-gradient(top, #66eece, #9cf4a7);
    width: 20px;
    height: 30px;
    border-radius: 100px 0px 100px 0px;
    content: '';
    -webkit-animation: teethpaste 5s infinite ease-in-out alternate;

    @-webkit-keyframes teethpaste {
        0% {
            width: 20px;
            left: -20px;
            box-shadow: 3px 0px 10px 3px #9cf4df;
        }
        10% {
            width: 15px;
            left: -15px;
            box-shadow: 1px -10px 10px 3px #9cf4df;
        }
        25% {
            width: 10px;
            left: 0px;
            box-shadow: 1px -10px 10px 3px #9cf4df;
        }
        35% {
            width: 5px;
            left: 0px;
        }
        50% {
            width: 0px;
            left: 0px;
        }
        65% {
            width: 0px;
            left: 0px;
        }
        75% {
            width: 0px;
            left: 10px;
        }
        85% {
            width: 0px;
            left: 10px;
        }
        100% {
            width: 0px;
            left: 10px;
            box-shadow: -3px 0px 20px 3px #fff;
        }

    }

}
.bg-page__teethbrush:after {
    z-index: 100;
    width: 5px;
    height: 300px;
    right: -5px;
    content: '';
    display: inline-block;
    background: #d1faf0;
    position: absolute;
    -webkit-animation: teethhandle 5s infinite ease-in-out alternate;

    @-webkit-keyframes teethhandle {
        0% {
            width: 5px;
            right: -5px;
        }
        10% {
            width: 8px;
            right: -8px;
        }
        25% {
            width: 10px;
            right: -10px;
        }
        35% {
            width: 15px;
            right: -15px;
        }
        50% {
            width: 15px;
            right: 0px;
        }
        65% {
            width: 15px;
            right: 0px;
        }
        75% {
            width: 12px;
            right: 12px;
        }
        85% {
            width: 10px;
            right: 10px;
        }
        100% {
            width: 8px;
            right: 8px;
        }
    }
    
}
</style>
