$(function(){

	/*
	 * 初期設定
	 */
	var $top  = $('#scr');
	var $con  = $('.scr-con', $top);
	var $tgt  = $('.scr-con-tgt', $top);
	var tgt_h = 300;
	var flag  = false;
	var img_h = 0;
	var dev   = 'pc';

	// タッチ系デバイスか？
	if ('ontouchstart' in window){
		dev   = 'sp';
		var scr_span = 5;
	}else{
		var scr_span = 50;
	}

	console.log($('img', $tgt).height());
	
	// 初回整形
	$tgt.height(tgt_h); 
	$top.height($con.height() * 100);
	$con.width($top.width());

	/*
	 * メイン
	 */
	var main = function(){
		console.log('** main **');

		var brekeout;
		var snap;

		// 画像の高さ
		var tgt_y;
		img_h = $('img', $tgt).height();


	
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
					$con.width($top.width());
					img_h = $('img', $tgt).height();
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
				$con.css({position:"static",overflow:"inherit"});
				$top.height($con.height());
			}
		}



		/*
		 * ウィンドウのスクロール検知
		 */
		var scr   = 0;
		var _scr  = 0;
		var p_top = 0;
		var off   = $tgt.offset();
		var tgt_top;
		var scrollTop;

		$(window).on("load scroll", function(){
			scrollTop = $(window).scrollTop();
			
			tgt_top = off.top - scrollTop;
			brekeout = img_h - tgt_h; 

			if (!flag){

				// -- ギミックが始まる前

				console.log(scrollTop);

				if (tgt_top < 0){
					flag = true;
					snap = scrollTop;
					console.log('snap = ' + snap);
					$con.css({
						position:"fixed",
						overflow:"hidden",
						top:0
					});
				}

			}else{

				// -- ギミック

				_scr  = scr;
				scr   = $(this).scrollTop();
				tgt_y = $tgt.scrollTop();
				
				if (tgt_y > brekeout){
					$(window).off("load scroll"); // イベントを停止！
					without(snap);
				}

				scr_span = scr - _scr;

				if (_scr < scr){
					$tgt.scrollTop(tgt_y + scr_span);
				}else{
					$tgt.scrollTop(tgt_y - scr_span);
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