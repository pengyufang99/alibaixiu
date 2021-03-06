//索要轮播图图片
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        // console.log(res);
        let html = template('sTpl', { data: res })
        $('.swipe-wrapper').html(html);
        //
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
})
//获取热门推荐
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(res) {
        // console.log(res);
        let html = template('reTpl',{data:res});
        $('.hots ul').html(html);
    }
})

//最新发布
$.ajax({
    type: 'get',
    url: 'posts/lasted',
    success: function(res) {
        // console.log(res);
        let html = template('newTpl',{data:res});
        $('.new').append(html)
    }
})