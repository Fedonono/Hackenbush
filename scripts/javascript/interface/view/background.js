(function(){
	var AnimateBg_StartingPos_1 = 0;
	var AnimateBg_CurrentPos_1 = AnimateBg_StartingPos_1;
	var AnimateBg_StartingPos_2 = 0;
	var AnimateBg_CurrentPos_2 = AnimateBg_StartingPos_2;

	var AnimateBg_Div1Speed = 2;
	var AnimateBg_Div2Speed = 5;

	var fixedbg1 = $("#fixedbg1");
	var fixedbg2 = $("#fixedbg2");

	var AnimateBg_Update = function() {
		AnimateBg_CurrentPos_1 -= AnimateBg_Div1Speed;
		AnimateBg_CurrentPos_2 -= AnimateBg_Div2Speed;

		fixedbg1.css("left", AnimateBg_CurrentPos_1 + "px");
		fixedbg2.css("left", AnimateBg_CurrentPos_2 + "px");

		if (AnimateBg_CurrentPos_1 < -950)
			AnimateBg_CurrentPos_1 = -AnimateBg_Div1Speed;

		if (AnimateBg_CurrentPos_2 < -950)
			AnimateBg_CurrentPos_2 = -AnimateBg_Div2Speed;
	}

	if (!isAnimationSupported())
		setInterval(AnimateBg_Update, 50);
})();
