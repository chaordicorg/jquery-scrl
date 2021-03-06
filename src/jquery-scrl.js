/*
 * jauery-scrl
 */

(function($){

	/*
	 * 共通設定
	 */
	// var $body = $('body');
	// var $wrap = $('#scrl-wrap');
	$('body').height($('#scrl-wrap').height());
	$('#scrl-wrap').width($('body').width());

	/*
	 * リサイズ検知
	 */
	var windowResize = function(_opt){
		var timer = false;
		$(window).on('resize', function(){
			if (timer !== false) clearTimeout(timer);
			timer = setTimeout(function(){
				_opt.func();
			}, _opt.span);
		});
	}

	windowResize({
		func: function(){
			$('#scrl-wrap').width($('body').width());
		},
		span: 100
	});




	/*
	 * pulug-in
	 */
	$.fn.jquery_scrl = function(options) {

		// デフォルト
		var opt = $.extend({}, options);


		return this.each(function(){
			
			/*
			 * 初期設定
			 */
			var active = true;
			var flag = false;
			var _tgt = $(this);
			var _tgt_con = $('.scrl-contents', _tgt);
			var tgt_h = $(this).height();
			var tgt_con_h = 0;



			/*
			 * メイン
			 */
			var main = function(){
				console.log('** main start **');

				var brekeout;
				var snap;
				var tgt_y;

				tgt_con_h = _tgt_con.height();	// 画像の高さ


				/*
				 * 解除
				 */
				var without = function(top){
					if (!(top == undefined)){
						$(window).scrollTop(top);
						$('#scrl-wrap').css({position:"static",overflow:"inherit"});
						$('body').height($('#scrl-wrap').height());
					}
				}



				/*
				 * ウィンドウのスクロール検知
				 */
				var scrl  = 0;
				var _scrl = 0;
				var p_top = 0;
				var off = _tgt.offset();
				var tgt_top;
				var scrollTop;

				$(window).on("load scroll", function(){
					if (active){
						scrollTop = $(window).scrollTop();
						
						tgt_top = off.top - scrollTop;
						brekeout = tgt_con_h - tgt_h; 

						if (!flag){

							// -- ギミックが始まる前

							if (tgt_top < 0){
								console.log($('#scrl-wrap'));
								flag = true;
								snap = scrollTop;
								$('#scrl-wrap').css({
									position:"fixed",
									overflow:"hidden",
									top: (off.top * -1) + "px",
								});

								$('body').height($('#scrl-wrap').height() + tgt_h);
							}

						}else{

							// -- ギミック

							_scrl = scrl;
							scrl  = $(this).scrollTop();
							tgt_y = _tgt.scrollTop();
							
							if (tgt_y > brekeout){
								// $(window).off("load scroll"); // イベントを停止！
								active = false;
								without(snap);
							}

							if (!_scrl){
								scrl_span = 0;
							}else{
								scrl_span = scrl - _scrl;
							}
							
							console.log(scrl + ' - ' + _scrl + ' = ' + scrl_span);
							_tgt.scrollTop(tgt_y + scrl_span);

						}
					}
				});
			}



			/*
			 * 開始
			 */
			//$("html").animate({scrollTop: 0}, 3000, function(){
				main();
			//});
			// setTimeout(main, 3000);



		});
	};
})( jQuery );