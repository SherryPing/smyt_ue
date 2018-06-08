
var percent = 0,
	update,
	resetColors,
	speed = 200,
	orange = 30,
	yellow = 55,
	green = 85,
	timer;
resetColors = function() {
	$('.progress__bar').removeClass('progress__bar--green').removeClass('progress__bar--yellow').removeClass('progress__bar--orange').removeClass('progress__bar--blue');
	$('.progress').removeClass('progress--complete');
};
function update() {
	timer = setTimeout(function() {
		if (percent < 96) {
			percent += Math.random() * 3.8;
			percent = parseFloat(percent.toFixed(1));
		}
		$('.progress__text').find('em').text(percent + '%');
		if (percent >= 100) {
			percent = 100;
			$('.progress').addClass('progress--complete');
			$('.progress__bar').addClass('progress__bar--blue');
			$('.progress__text').find('em').text('Complete');
		} else {
			if (percent >= green) {
				$('.progress__bar').addClass('progress__bar--green');
			} else if (percent >= yellow) {
				$('.progress__bar').addClass('progress__bar--yellow');
			} else if (percent >= orange) {
				$('.progress__bar').addClass('progress__bar--orange');
			}
			speed = Math.floor(Math.random() * 900);
			update();
		}
		$('.progress__bar').css({
			width : percent + '%'
		});
	}, speed);
}
//进度条开始
function progressStart() {
	$('.progress').addClass('progress--active');
	percent = 0;
	clearTimeout(timer);
	resetColors();
	update();
}
//进度条停止
function progressStop() {
	$('.progress').removeClass('progress--active');
	percent = 0;
	clearTimeout(timer);
	resetColors();
	update();
}
//进度条完成、
function progressComplete() {
	percent = 100;
	clearTimeout(timer);
	resetColors();
	update();
}