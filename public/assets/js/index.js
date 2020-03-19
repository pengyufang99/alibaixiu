$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function (response) {
        $('.articleCount').html('<strong>'+response.postCount+'</strong>篇文章（<strong>'+response.draftCount+'</strong>篇草稿）')
    }
});

// 获取分类数量
$.ajax({
	type: 'get',
	url: '/categories/count',
	success: function (response) {
		$('.gcategory').html('<strong>'+response.categoryCount+'</strong>个分类')
	}
})