
document.getElementById("container").addEventListener("click", doAction2);



function doAction2(event) 
{
	var target = event.target || event.srcElement;
	var clickedElt;

	if (target.id) {clickedElt = target.id;} 
	else {clickedElt = target.name;}
	console.log(clickedElt);
	
	switch (clickedElt) 
	{
			
		case "playIcon":
			EB.userActionCounter("POS_PlayVideo");
			break;
		
		case "darkCover":
			EB.userActionCounter("POS_PlayVideo");
			break;
		
		case "closeBtn":
			EB.userActionCounter("CloseExp");
			break;
		
		case "replayBtn":
		    EB.userActionCounter("POS_ReplayVideo");
			break;
		
		
		case "close-video":
			EB.userActionCounter("CloseVideo");
			break;
		
		
		case "play-pause":
			if (!video.paused) {EB.userActionCounter("POS_RestartVideo");} 
			else {EB.userActionCounter("PauseVideo");}
			break;
		
		case "mute-unmute":
			if (!Modernizr.touch)
			{
				if (!video.muted) {EB.userActionCounter("POS_UnMuteVideo");} 
				else {EB.userActionCounter("MuteVideo");}
			}
			break;

		default:
		EB.clickthrough();
		if (video)
		{
			video.pause();
			var playpause = document.getElementById('play-pause');
			playpause.src='images/videoPlayer/btn-play.png';
			playpause.className="play";
	    }
			break;
	
	}

}

