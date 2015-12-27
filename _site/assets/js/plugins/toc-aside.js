/**
 * created by orz@mad4a.me with pirated webstorm
 * generate an floating outline according to the `h2' tags
 */
 jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	}
 });
 
var browser={
    versions:function(){ 
           var u = navigator.userAgent, app = navigator.appVersion; 
           return {//移动终端浏览器版本信息 
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
         }(),
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
} 
 
$(function() {
	if (browser.versions.mobile) {
    var dict = {};
    $('h3').each(function (idx) {
        var title = $(this).text();
        var id = 'outline_' + idx;
        dict[title] = id;
/*        $(this).append('<a name="' + id + '"></a>'); */
	$(this).html('<a name="' + id + '"></a>'+$(this).html());
    });

    var outline_ul = $('<ul style="list-style-type: none"></ul>');
	outline_ul.append($('<li class="lable"></li>').html('<i class="icon-list-ul"></i>   博客客户端'));
	outline_menu = $('<li class="menu"></li>');
    outline_menu.append($('<li></li>')
        .html('<span><h3><a href="http://www.kymjs.com/app">点击下载或扫描二维码</a></h3><a href="http://www.kymjs.com/app"><img src="http://www.kymjs.com/images/qrcode.jpg" alt="Android技术分享公众号" /></a></span>'));

	outline_ul.append(outline_menu);
    $('#main').append($('<nav id="h2outline"></nav>')
                         .css('position', 'absolute')
                         .css('width', '155px')
						 .css('top', $('article').offset().top)
                         .css('text-align', 'left')
                         .html(outline_ul));

    /**
     * |<------------------------------w------------------------------>|
     * |       -----------     -----------------     -----------       |
     * |<--l-->|   nav   |<-d->|               |<-d->| outline |<--x-->|
     * |       |<---n--->|     |<------c------>|     |<---a--->|       |
     * |       -----------     |               |     -----------       |
     * |<----------m---------->|               |                       |
     * |                       -----------------                       |
     * -----------------------------------------------------------------
     * (w - c) / 2 = d + a + x
     *   => x = (w - c) / 2 - (a + d), where
     *     w = $(window).width(),
     *     c = $('#container').width(),
     *     a = $('h2outline').width(),
     *
     * m = l + n + d
     *   => d = m - (l + n), where
     *     m = $('#container').position().left,
     *     l = $('#real_nav').position().left,
     *     n = $('#real_nav').width()
     */
    var main = $('#entry-content'),
        h2outline = $('#h2outline'),
        real_nav  = $('#dl-menu');

        
		
    $(window).resize(function () {
        var w = $(window).width(),
            c = 800,
            a = h2outline.width();
			d = 10; // #real_nav has left margin of -184.8px
        h2outline.css('right',
                      (w - c) / 2 - (a + d));
    });

    $(window).resize();
    };
	
});

$(window).load(function(){
	menuPosition=224;
	menuPosition_t=$('article').offset().top;
	if(menuPosition_t){
		menuPosition=menuPosition_t;
	}else {
		menuPosition=224;
	}
	FloatMenu();
});

function FloatMenu(){
	var toplest=25
	var animationSpeed=1500;
	var animationEasing='easeOutQuint';
	var scrollAmount=$(document).scrollTop();
	var newPosition=toplest+scrollAmount;
	if($(window).height()<$('#h2outline').height()+$('#h2outline .menu').height()){
		$('#h2outline').stop().animate({top: newPosition}, animationSpeed, animationEasing);
	} else {
		if($(document).scrollTop()<menuPosition){
			$('#h2outline').stop().animate({top: menuPosition}, animationSpeed, animationEasing);
		} else{
			$('#h2outline').stop().animate({top: newPosition}, animationSpeed, animationEasing);
		}

	}
}

$(window).scroll(function(){ 
	FloatMenu();
});
$(document).ready(function(){
	var fadeSpeed=500;
	$("#h2outline").hover(function(){
		$('#h2outline .lable').fadeTo(fadeSpeed, 1);
		$("#h2outline .menu").fadeIn(fadeSpeed);
	},function(){
		$('#h2outline .lable').fadeTo(fadeSpeed, 0.75);
		$("#h2outline .menu").fadeOut(fadeSpeed);
	});
});


