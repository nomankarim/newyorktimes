var isOnMobile = false;
var videoBtnWasClicked = false;

window.onload = function() {
	initVideoPlayer();
	//setupVideo();

	TweenLite.to('vidFrame', 0, {autoAlpha:0});
	
	TweenLite.to('container',.2,{autoAlpha:1,delay:.5});
	
	TweenLite.to('vidFrame', 0, {autoAlpha:1,delay:3,});
	TweenLite.to('vidBg',1,{autoAlpha:1,delay:3, onComplete:function(){
		document.getElementById('vidFrame').onmouseover = mouseMoveOverPlayVideo;
		document.getElementById('vidFrame').onmouseout = mouseOutPlayVideo;
		document.getElementById('vidFrame').onclick = playVideoClicked;
		TweenLite.to('copy1',0,{autoAlpha:0});
		}});
	
	
	TweenLite.to('playIcon',1,{autoAlpha:1,delay:3});

	
	
	document.getElementById('replay').onclick = replayClicked;
}
function mouseMoveOverPlayVideo(){

	TweenLite.to('darkCover', .5, {autoAlpha:.2});
}
function mouseOutPlayVideo(){

	TweenLite.to('darkCover', .5, {autoAlpha:0});
}
function setupFinalScene(){
	TweenLite.to('copyFinal',1,{autoAlpha:1});
	TweenLite.to('cta',1,{autoAlpha:1});	
	TweenLite.to('replay',1,{autoAlpha:1});	
}
function playVideoClicked(){
	document.getElementById('playIcon').onclick = null;

	TweenLite.to('vidFrame',1,{autoAlpha:0});		
	
	
	setupVideo();
}

function replayClicked(){
	TweenLite.to('copyFinal',1,{autoAlpha:1});
	TweenLite.to('cta',1,{autoAlpha:0});	
	TweenLite.to('replay',1,{autoAlpha:0});	
	
	setupVideo();
}


/************************************* VIDEO PLAYER ************************************/

function setupVideo() {
    var playpause = document.getElementById('play-pause');
    playpause.src = 'images/videoPlayer/btn-pause.png';
    playpause.className = "pause";

    TweenLite.to('video-controls-bar', 0, {
        autoAlpha: 1,
        opacity: 1
    });
    TweenLite.to('video-container', 0, {
        autoAlpha: 1,
        opacity: 1,
        x: 0
    });
    TweenLite.to('video-player', 0, {
        autoAlpha: 1,
        delay: 0.8,
        x: 0
    });
    if (isOnMobile) TweenLite.delayedCall(2, hideControls);
    try {
        video.currentTime = 0;
    } catch (error) {}
	video.load();
    video.play();
    //videoPlaying = true;
}

function videoEndHandler() {
    if (video.cancelFullScreen) {
        video.cancelFullScreen();
    } else if (video.mozCancelFullScreen) {
        video.mozCancelFullScreen(); // FF
    } else if (video.webkitExitFullScreen) {
        video.webkitExitFullScreen();
    }
    TweenLite.to(videoPlayer, .5, {autoAlpha: 0,delay: .5 });
    TweenLite.delayedCall(1, setupFinalScene);

}

function initVideoPlayer() {
    var closeVideoButton = document.getElementById("close-video");
    var playButton = document.getElementById("play-pause");
    var muteButton = document.getElementById("mute-unmute");
    var fullScreenButton = document.getElementById("full-screen");

    videoPlayer = document.getElementById("video-player");
    videoContainer = document.getElementById("video-container");
    videoControls = document.getElementById("video-controls");
    container = document.getElementById("container");

    window.onmousemove = isOnMobile ? null : handleMouseMove;
	document.getElementById('close').onclick = closeClicked;
    closeVideoButton.addEventListener("click", closeVideoClicked);
    playButton.addEventListener("click", playClicked);
    muteButton.addEventListener("click", muteClicked);
    fullScreenButton.addEventListener("click", fullScreenClicked);
    videoControls.addEventListener("click", videoclicked);
	
}
function closeClicked() 
{
	//TweenLite.killDelayedCallsTo(contractExpandable);
	console.log("CLOSE BILLBOARD");
	collapse();
	TweenLite.delayedCall(1, resetAd);
}
function showControls() {
    TweenLite.to('video-controls', .5, {
        autoAlpha: 1,
        overwrite: 1,
        onStart: function() {
            TweenLite.to('video-controls-bar', 0, {
                autoAlpha: 1
            });
            if (!isOnMobile) TweenLite.to('mute-unmute', 0, {
                autoAlpha: 1
            }); //dont show mute btn if on mobile
        }
    });
    if (isOnMobile) TweenLite.delayedCall(.66, hideControls); //loop timer if on mobile to detect when to close, it looks for play btn being paused to close.
}

function hideControls() {
    if (isOnMobile) TweenLite.delayedCall(.66, hideControls);
    if (document.getElementById('play-pause').className != 'play') {
        TweenLite.to('video-controls', .5, {
            opacity: 0,
            delay: .66,
            onComplete: function() {
                TweenLite.to('video-controls-bar', 0, {
                    autoAlpha: 0
                });
                TweenLite.to('mute-unmute', 0, {
                    autoAlpha: 0
                });
            }
        });
        controlsShown = false;
        TweenLite.killDelayedCallsTo(hideControls);
    }
}

function resetAd()
{
	if (video)
	{
		video.pause();
		var playpause = document.getElementById('play-pause');
		playpause.src='images/videoPlayer/btn-play.png';
		playpause.className="play";
	}
}

function handleMouseMove(event) {
	 event = event || window.event; // IE-ism	
    var rect = videoPlayer.getBoundingClientRect();
    if (event.clientX >= rect.left && event.clientY >= rect.top && event.clientX <= rect.right && event.clientY <= rect.bottom) {
        showControls();
    } else {
        hideControls();
    }
}
/******************** VIDEO CLICK HANDLERS *************************/
function closeVideoClicked(event) {

    prevDef(event);
    videoEndHandler();
}

function fullScreenClicked(event) {
    prevDef(event);
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen(); // FF
    } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
    }
    video.play();

    var playpause = document.getElementById('play-pause');
    playpause.src = 'images/videoPlayer/btn-pause.png';
    playpause.className = "pause";

    videoBtnWasClicked = true;
}

function videoclicked(event) {

    prevDef(event);
    if (document.getElementById('play-pause').className != 'play' && !videoBtnWasClicked) {
        var playpause = document.getElementById('play-pause');
        playpause.src = 'images/videoPlayer/btn-play.png';
        playpause.className = "play";
        video.pause();

        if (isOnMobile == true) {

			showControls();
        }
    }
    videoBtnWasClicked = false;
}

function playClicked(event) {
    prevDef(event);
    if (video.paused == true) {
        video.play();
    } else {
        video.pause();
    }

    var playpause = document.getElementById('play-pause');
    if (playpause.className != "pause") {
        playpause.src = 'images/videoPlayer/btn-pause.png';
        playpause.className = "pause";
        if (isOnMobile) hideControls();
    } else if (playpause.className == "pause") {
        playpause.src = 'images/videoPlayer/btn-play.png';
        playpause.className = "play";
        if (isOnMobile) showControls();
    }
    videoBtnWasClicked = true;
}

function muteClicked(event) {
    prevDef(event);
    if (video.muted == false) {
        video.muted = true;
    } else {
        video.muted = false;
    }

    var muteUnmute = document.getElementById('mute-unmute');
    if (muteUnmute.className != "mute") {
        muteUnmute.src = 'images/videoPlayer/btn-mute.png';
        muteUnmute.className = "mute";
    } else if (muteUnmute.className == "mute") {
        muteUnmute.src = 'images/videoPlayer/btn-unmute.png';
        muteUnmute.className = "unmute";
    }
    videoBtnWasClicked = true;

}

function pauseHandler() {
    var videox = document.getElementsByTagName('video')[0];
  
}
/**************************************HELPER FUNCTIONS************************************/
function prevDef(event) {
    if (event) {
        evt = event || window.event;
        evt.preventDefault();
    }
}