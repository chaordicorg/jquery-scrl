/*
 * jauery-scrl
 */

(function($){

	/*
	 * 共通設定
	 */
	var $body = $('body');
	var $wrap = $('#scrl-wrap');
	$body.height($wrap.height());
	$wrap.width($body.width());

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
			$wrap.width($body.width());
			// tgt_con_h = $tgt_con.height();
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
			var $tgt = $(this);
			var $tgt_con = $('.scrl-contents', $tgt);
			var tgt_h = $tgt.height();
			var tgt_con_h = 0;



			/*
			 * メイン
			 */
			var main = function(){
				console.log('** main start **');

				var brekeout;
				var snap;
				var tgt_y;

				tgt_con_h = $tgt_con.height();	// 画像の高さ


				/*
				 * 解除
				 */
				var without = function(top){
					if (!(top == undefined)){
						$(window).scrollTop(top);
						$wrap.css({position:"static",overflow:"inherit"});
						$body.height($wrap.height());
					}
				}



				/*
				 * ウィンドウのスクロール検知
				 */
				var scrl  = 0;
				var _scrl = 0;
				var p_top = 0;
				var off = $tgt.offset();
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
								flag = true;
								snap = scrollTop;
								$wrap.css({
									position:"fixed",
									overflow:"hidden",
									top: (off.top * -1) + "px",

								});

								$body.height($wrap.height() + tgt_h);
							}

						}else{

							// -- ギミック

							_scrl = scrl;
							scrl  = $(this).scrollTop();
							tgt_y = $tgt.scrollTop();
							
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
							$tgt.scrollTop(tgt_y + scrl_span);

						}
					}
				});
			}



			/*
			 * 開始
			 */
			$("html").animate({scrollTop: 0}, 1000, function(){
				main();
			});



		});
	};
})( jQuery );