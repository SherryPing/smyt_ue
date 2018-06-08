	var iSpeed=0;
	var left=0;
	function startMove(obj, iTarget)
	{
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			iSpeed+=(iTarget-obj.offsetLeft)/5;
			iSpeed*=0.7;
			left+=iSpeed;
			
			if(Math.abs(iSpeed)<1 && Math.abs(left-iTarget)<1)
			{
				clearInterval(obj.timer);
				
				obj.style.left=iTarget+'px';	
				//alert('关了');
			}
			else
			{
				obj.style.left=left+'px';
			}
		}, 30);
	}
    var iSpeed1 = 0;
    var left1 = 0;

    function startMove1(obj, iTarget) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            iSpeed1 += (iTarget - obj.offsetLeft) / 5;
            iSpeed1 *= 0.7;
            left1 += iSpeed1;

            if (Math.abs(iSpeed1) < 1 && Math.abs(left1 - iTarget) < 1) {
                clearInterval(obj.timer);

                obj.style.left = iTarget + 'px';
                //alert('关了');
            } else {
                obj.style.left = left1 + 'px';
            }
        }, 30);
    }