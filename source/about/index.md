---
title: 关于
date: 2021-01-30 10:47:31
type: "about"
layout: false
---

<meta charset="utf-8">
<title>关于 | 憨憨</title>
<script src="/js/sakura.min.js"></script>
<script src="/js/jquery.min.js"></script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    #sakuraDiv {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: -999999;
    }

    #aboutDiv {
        padding: 30px 30px 30px;
        box-shadow: 0 0 4px rgb(0 0 0 / 62%);
        background: rgb(255 255 255 / 64%);
        border-radius: 5px;
        width: 50%;
        height: 860px;
        position: relative;
        top: 40px;
        margin: auto;
        overflow: hidden;
    }

    h1 {
        text-align: center;
    }

    h1>span {
        color: #2aa198;
        border-bottom: 2.2px solid #8c8c8c;
        padding: 0 10% 4.1px 10%;
        cursor: pointer;
    }

    .aplayer {
        overflow: visible;
        position: relative;
        left: 1000px;
    }

    .aplayer .aplayer-lrc:after, .aplayer .aplayer-lrc:before {
        overflow: visible;
    }

    .aplayer .aplayer-lrc {
         overflow: visible;
    }

    .aplayer-lrc-current {
        position: fixed;
        bottom: -20px;
        left: -1090px;
    }

    .aplayer .aplayer-lrc p {
        font-size: 30px;
        color: black;
    }
    
</style>

<div id="sakuraDiv">
    <canvas id="sakura"></canvas>
</div>

<div id="aboutDiv">
    <h1>
        <span>关于我</span>
    </h1>
    <div id="aplayer"></div>
    
</div>

<script>
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        autoplay: true,
        lrcType: 3,
        loop: 'none',
        audio: [{
            name: '海阔天空 - Beyond',
            artist: 'Beyond',
            url: '/music/海阔天空-Beyond.mp3',
            cover: '/images/2.jpg',
            lrc: '/music/海阔天空.lrc',
            theme: '#ebd0c2'
        }]
    });

    setTimeout(() => {
        let invl = setInterval(() => {
            if (ap.audio.paused) {
                ap.lrc.hide();
                clearInterval(invl);
            }
        }, 250);
    }, 312000);
</script>