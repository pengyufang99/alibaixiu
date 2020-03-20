//向服务器端发送请求索要随即推荐
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function (res) {
        // console.log(res);

        var randomTpl = `
        {{each data}}
        <li>
          <a href="detail.html?id={{$value._id}}">
            <p class="title">{{$value.title}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
              <img src="{{$value.thumbnail}}" alt="">
            </div>
          </a>
        </li>
        {{/each}}
        `;
        var html = template.render(randomTpl,{data:res});
        // console.log(html)
        $('.random').html(html);

    }
})

//获取到旁边的分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        // console.log(res);
        let categoriesTpl = `
        {{each data}}
        <li><a href="list.html?id={{@$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `;
        let html = template.render(categoriesTpl,{data:res});
        $('.nav_data').html(html);
    }
})


//获取最新评论
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(res) {
        console.log(res);
    }
})
