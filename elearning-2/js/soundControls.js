unmute_btn.addEventListener("click",toggleSound);
mute_btn.addEventListener("click",toggleSound);
play_btn.addEventListener("click",togglePlayPause);
pause_btn.addEventListener("click",togglePlayPause);
aud.onended = function() {soundComplete()};
var ended = false;

function toggleSound(){
	if(muted){
		aud.volume = 1;
		muted = false;
		mute_btn.style.visibility = "hidden";
		unmute_btn.style.visibility = "visible";
	}else{
		aud.volume = 0;
		muted = true;
		mute_btn.style.visibility = "visible";
		unmute_btn.style.visibility = "hidden";
	}
}

function togglePlayPause(){
	if(currentChapter == 8 && ended == false && (progressPage.innerHTML == "3/5" || progressPage.innerHTML == "4/5" || progressPage.innerHTML == "5/5")){
		play_btn.style.display = "none";
		pause_btn.style.display = "none";
	}else{
		play_btn.style.display = "block";
		pause_btn.style.display = "block";
	}
	if(!isPlaying){
		aud.play();
		aud.volume = 1;
		muted = false;
		isPlaying = true;
		mute_btn.style.visibility = "hidden";
		unmute_btn.style.visibility = "visible";
		play_btn.style.visibility = "hidden";
		pause_btn.style.visibility = "visible";
	}else{
		isPlaying = false;
		aud.pause();
		play_btn.style.visibility = "visible";
		pause_btn.style.visibility = "hidden";
	}
}

function soundComplete(){
	ended = true;
	play_btn.style.display = "block";
	pause_btn.style.display = "block";
	console.log("soundComplete")
	if(!isQuiz)disableControls();
}


function disableControls(){
	pointer.style.display = "block";
	if(pageEnd){
		pointer.style.left = "959px";
		pointer.style.top = "10px";
	}else{
		pointer.style.left = "780px";
		pointer.style.top = "168px";
	}
	mute_btn.style.visibility = "visible";
	unmute_btn.style.visibility = "hidden";
	play_btn.style.visibility = "visible";
	pause_btn.style.visibility = "hidden";
	muted = true;
	isPlaying = false;
	next_btn.addEventListener("click",nextPage);
	previous_btn.addEventListener("click",backPage);
}

function enableControls(){
	ended = false;
	pointer.style.display = "none";
	mute_btn.style.visibility = "hidden";
	unmute_btn.style.visibility = "visible";
	play_btn.style.visibility = "hidden";
	pause_btn.style.visibility = "visible";
	muted = false;
	next_btn.removeEventListener("click",nextPage);
	previous_btn.removeEventListener("click",backPage);
}

loadScript("js/defaults.js", jsLoaded);