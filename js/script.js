import("./jquery.min.js")

// aplayer延迟三秒播放
setTimeout(function() {
    $("div.aplayer-button.aplayer-play").click();
}, 3000);


// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/images/favicon7.png");
        document.title = '╭(°A°`)╮ 页面崩溃啦 ~';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/images/favicon5.png");
        document.title = '(ฅ>ω<*ฅ) 噫又好啦 ~' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});

// 将 关于/标签/分类里的评论删掉 等网页加载完毕执行，不然jQuery还没加载就执行会报错
document.onreadystatechange = function(){
    if(document.readyState == 'complete'){
        // 页面加载完毕
        if (document.URL.indexOf("categories") != -1) {
            $(".comments.v").remove();
        } else if (document.URL.indexOf("tags") != -1) {
            $(".comments.v").remove();
        } else if (document.URL.indexOf("about") != -1) {
            $(".comments.v").remove();
        }
    }
}