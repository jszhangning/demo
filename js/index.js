
/*页面加载完成之后执行*/
window.onload = function(){
    /*搜索效果*/
    search();
    /*轮播图*/
    banner();
    /*秒杀*/
    downTime();
};
/*搜索效果*/
function search(){
    /*
     * 1.在页面滚动的时候  盒子的透明度在不断的加深
     * 2.当页面滚动的高度超过  banner的高度的时候  透明度不变
     * */

    /*获取到我们要操作的盒子*/
    /*搜索盒子*/
    var searchDom = document.getElementsByClassName('demo_header_box')[0];
    /*banner盒子*/
    var bannerDom = document.getElementsByClassName('demo_banner')[0];
    /*获取banner的高度*/
    var height = bannerDom.offsetHeight;

    /*我们需要监听页面滚动事件*/
    window.onscroll = function () {
        /*获取距离顶部的高度*/
        var top = document.body.scrollTop;
        /*判断*/
        var opacity = 0;/*默认是完全透明的*/
        if(top < height){
            opacity = top/height * 0.85;/*根据比例  最大的透明度0.85*/
        }else{
            opacity = 0.85;
        }
        /*设置背景颜色*/
        searchDom.style.background = "rgba(201,21,35,"+opacity+")";
    }

}

/*轮播图*/
  /*页面加载完成执行*/
        $(function(){
            /*获取到banner*/
            var $banner = $('.demo_banner');
            /*图片盒子*/
            var $imageBox = $banner.find('ul:eq(0)');
            /*点盒子*/
            var $pointBox = $banner.find('ul:eq(1)');

            /*宽度*/
            var width = $banner.width();

            var animateFuc = function(callback){
                /*动画*/
                $imageBox.animate({'transform':'translateX(-'+index*width+'px)'},200,'ease',function(){
                    if(index >= 5){
                        index = 1;
                        $imageBox.css({'transform':'translateX(-'+index*width+'px)'});
                    }else if(index <= 0){
                        index = 5;
                        $imageBox.css({'transform':'translateX(-'+index*width+'px)'});
                    }
                    $pointBox.find('li').removeClass('now').eq(index-1).addClass('now');
                    /*动画结束 加定时器*/
                    callback &&callback();
                });
            }

            /*索引*/
            var index = 1;
            var timer = setInterval(function(){
                index ++;
                /*动画*/
                animateFuc();
            },2000);

            /*绑定左滑事件*/
            $imageBox.on('swipeLeft',function(){
                clearInterval(timer);
                index ++;
                animateFuc(function(){
                    /*动画结束*/
                    timer = setInterval(function(){
                        index ++;
                        /*动画*/
                        animateFuc();
                    },2000);
                });
            });
            /*绑定右滑事件*/
            $imageBox.on('swipeRight',function(){
                clearInterval(timer);
                index --;
                animateFuc(function(){
                    /*动画结束*/
                    timer = setInterval(function(){
                        index ++;
                        /*动画*/
                        animateFuc();
                    },2000);
                });
            });
        });


/*倒计时*/
var downTime = function(){
    /*时间*/
    var time = 5 * 60 * 60;

    /*时间盒子*/
    var timeBox = document.getElementsByClassName('sk_time')[0];
    /*所有的SPAN*/
    var spans = timeBox.getElementsByTagName('span');

    var timer = setInterval(function(){
        if(time <= 0){
            clearInterval(timer);
            return false;
        }

        time --;
        var h = Math.floor(time/3600);/*小时*/
        var m = Math.floor((time%3600)/60);/*分钟*/
        var s = time%60;/*秒*/
        console.log(h+":"+m+":"+s);
        /*放置html*/
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
    },1000);
}