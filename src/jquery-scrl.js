$(function(){

	/*
	 * 初期設定
	 */
	var $body = $('body');
	var $wrap = $('#scrl-wrap');
	var $tgt  = $('#gimmick-1');
	var $tgt_con = $('.scrl-contents');
	var tgt_h = 300;
	var flag = false;
	var tgt_con_h = 0;

	/*
	var dev   = 'pc';
	// タッチ系デバイスか？
	if ('ontouchstart' in window){
		dev   = 'sp';
		var scr_span = 5;
	}else{
		var scr_span = 50;
	}
	*/

	// 初回整形
	$tgt.height(tgt_h); 
	$body.height($wrap.height());
	$wrap.width($body.width());

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
					tgt_con_h = $tgt_con.height();
				},
				span: 100
			});



		/*
		 * 解除
		 */
		var without = function(top){
			if (!(top == undefined)){
				console.log('top = ' + top);
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
				}

			}else{

				// -- ギミック

				_scrl = scrl;
				scrl  = $(this).scrollTop();
				tgt_y = $tgt.scrollTop();
				
				if (tgt_y > brekeout){
					$(window).off("load scroll"); // イベントを停止！
					without(snap);
				}

				scrl_span = scrl - _scrl;

				//if (_scrl < scrl){
					$tgt.scrollTop(tgt_y + scrl_span);
				//}else{
				//	$tgt.scrollTop(tgt_y - scrl_span);
				//}
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