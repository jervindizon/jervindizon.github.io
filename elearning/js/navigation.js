

function nextPage() {
	if(currentChapter == totalChapters && currentChapterPage[currentChapter-1] == pagesPerChapter[currentChapter-1]+1){console.log("end of slide");return};
	for (var e = 0; e < totalChapters; e++) { 
		if(currentChapterPage[e] == pagesPerChapter[e]+1 && currentChapter == e+1 && currentChapter != 1){
			currentChapter = currentChapter + 1;
			e=totalChapters;
		}else if(currentChapterPage[e] == pagesPerChapter[e] && currentChapter == 1){
			currentChapter = currentChapter + 1;
		}
	}
	enableControls();
	Iframe.classList.add("animationFadein");
	setTimeout(function(){Iframe.classList.remove("animationFadein"); },1500);
	if(currentChapter == 1){
		if(arrowClicked){currentChapterPage[currentChapter] = 1 }
		var currentpage = currentChapterPage[currentChapter-1];
		aud.src = 'audio/' + soundContentHolder[currentChapter-1][currentpage] +'.mp3';
		Iframe.src = "./pages/" + pagesContentHolder[currentChapter-1][currentpage] + ".html";
		progressPage.innerHTML = (currentpage + 1).toString() + "/" +pagesPerChapter[currentChapter-1];
		currentChapterPage[currentChapter-1]++;		
	}else{
		console.log("      " + currentChapterPage[currentChapter-1]);
		if(currentChapter > 2){var pageCurrent = pagesPerChapter[currentChapter-2]+1}else{var pageCurrent = pagesPerChapter[currentChapter-2]}
		if(currentChapterPage[currentChapter-2] == pageCurrent){
			changeChapter = false;
			currentChapterPage[currentChapter] = 1;
			document.querySelector('nav a:nth-child(2) span').style.pointerEvents = "";
			document.querySelector('nav a:nth-child(' + (currentChapter-1) + ') span').classList.remove("selected");
			document.querySelector('nav a:nth-child(' + (currentChapter) + ') span').classList.add("selected");
			document.querySelector('nav a:nth-child(' + (currentChapter-1) + ')').classList.remove("selected");
			document.querySelector('nav a:nth-child(' + (currentChapter) + ')').classList.add("selected");
			document.querySelector('nav a:nth-child(' + (currentChapter) + ') span img').classList.add("selected");
			pageTitle.innerHTML = chapterTitles[currentChapter-1];
		}
		var currentpage = currentChapterPage[currentChapter-1];
		aud.src = 'audio/' + soundContentHolder[currentChapter-1][currentpage] +'.mp3';
		Iframe.src = "./pages/" + pagesContentHolder[currentChapter-1][currentpage] + ".html";
		progressPage.innerHTML = (currentpage).toString() + "/" +pagesPerChapter[currentChapter-1];
		currentChapterPage[currentChapter-1]++;
		if(progressPage.innerHTML == pagesPerChapter[currentChapter-1] + "/" + pagesPerChapter[currentChapter-1]){
			document.querySelector('nav a:nth-child(1) span').style.pointerEvents = "";
			document.querySelector('nav a:nth-child(' + (currentChapter) + ') span').style.pointerEvents = "";
			document.querySelector('nav a:nth-child(' + (currentChapter) + ') span').classList.add("done");
		}
		pageEnd = (progressPage.innerHTML == pagesPerChapter[totalChapters-1] + "/" + pagesPerChapter[totalChapters-1]) ? true : false;
	}
arrowClicked = true;
checkProgress("next");
}

function backPage() {
	pageEnd = false;
	if(progressPage.innerHTML == "1/" + pagesPerChapter[0]){return;}
	if(arrowClicked){
		if(changeChapter){
			currentChapter = currentChapter - 1;
		}
	}else{
		arrowClicked = true;
	}

	if(currentChapterPage[currentChapter-1] != 1){
		enableControls();
		Iframe.classList.add("animationFadein");
		setTimeout(function(){Iframe.classList.remove("animationFadein");},1500)
	}
	if(currentChapter==1){
		changeChapter = false;
		currentChapterPage[currentChapter-1]--;
		aud.src = 'audio/' + soundContentHolder[currentChapter-1][currentChapterPage[currentChapter-1]-1] +'.mp3';
		Iframe.src = "./pages/" + pagesContentHolder[currentChapter-1][currentChapterPage[currentChapter-1]-1] + ".html";
		progressPage.innerHTML = currentChapterPage[currentChapter-1].toString() + "/" + pagesPerChapter[currentChapter-1];
	}else{
		changeChapter = true;
		currentChapterPage[currentChapter-1]--;
		if(currentChapterPage[currentChapter-1] == 1){
			if(currentChapter >2){var pageCurrent = currentChapterPage[currentChapter-2]-1}else{var pageCurrent = currentChapterPage[currentChapter-2]}
			document.querySelector('nav a:nth-child(' + (currentChapter) + ') span').classList.remove("selected");
			document.querySelector('nav a:nth-child(' + (currentChapter-1) + ') span').classList.add("selected");
			document.querySelector('nav a:nth-child(' + (currentChapter) + ')').classList.remove("selected");
			document.querySelector('nav a:nth-child(' + (currentChapter-1) + ')').classList.add("selected");
			pageTitle.innerHTML = chapterTitles[currentChapter-2];
			aud.src = 'audio/' + soundContentHolder[currentChapter-2][currentChapterPage[currentChapter-2]-1] +'.mp3';
			Iframe.src = "./pages/" + pagesContentHolder[currentChapter-2][currentChapterPage[currentChapter-2]-1] + ".html";
			progressPage.innerHTML = pageCurrent.toString() + "/" + pagesPerChapter[currentChapter-2];
		}else{
			changeChapter = false;
			aud.src = 'audio/' + soundContentHolder[currentChapter-1][currentChapterPage[currentChapter-1]-1] +'.mp3';
			Iframe.src = "./pages/" + pagesContentHolder[currentChapter-1][currentChapterPage[currentChapter-1]-1] + ".html";
			progressPage.innerHTML = (currentChapterPage[currentChapter-1]-1).toString() + "/" + pagesPerChapter[currentChapter-1];
		}
	}
checkProgress("back");
}

function navClick(e){
	Iframe.classList.add("animationFadein");
	setTimeout(function(){Iframe.classList.remove("animationFadein")},1000)
	arrowClicked = false;
	pageEnd = false;
	selectedPage(e);
	currentChapter = e;
	if(currentChapter == 1){
		currentChapterPage[currentChapter-1] = 1;
		aud.src = 'audio/' + soundContentHolder[currentChapter-1][0] +'.mp3';
		pageTitle.innerHTML = chapterTitles[currentChapter-1];
		Iframe.src = "./pages/" + pagesContentHolder[currentChapter-1][0] + ".html";
		progressPage.innerHTML = 1 + "/" + pagesPerChapter[0];
	}else{
		currentChapterPage[currentChapter-1] = 2;
		aud.src = 'audio/' + soundContentHolder[currentChapter-1][1] +'.mp3';
		pageTitle.innerHTML = chapterTitles[currentChapter-1];
		Iframe.src = "./pages/" + pagesContentHolder[currentChapter-1][1] + ".html";
		progressPage.innerHTML = 1 + "/" + (pagesPerChapter[currentChapter-1]);
	}
	checkProgress("nav");
}

function selectedPage(e){
	if(e==1){
		currentChapterPage[e-1] = navigationCurrentPage[e-1]-1;
	}else{
		for (var i = 1; i < totalChapters; i++) {
			currentChapterPage[i] = navigationCurrentPage[i];
		}
	}
	for (var i = 1; i <= totalChapters; i++) {
		document.querySelector('nav a:nth-child('+i+') span').classList.remove("selected");
		document.querySelector('nav a:nth-child('+i+')').classList.remove("selected");
	};

	document.querySelector('nav a:nth-child('+e+')').classList.add("selected");
	document.querySelector('nav a:nth-child('+e+') span').classList.add("selected");
	
}

function callingMrLee(){
	isQuiz = true;
	if(document.getElementById("mrlee").style.display == "block"){return;};
	document.getElementById("mrlee").style.display = "block";
	document.getElementById("mrlee").classList.add("animationFadeLeft");
	setTimeout(function(){
		document.getElementById('mrlee').classList.remove("animationFadeLeft");
	},1000)
}

function exitMrLee(){
	isQuiz = false;
	if(document.getElementById("mrlee").style.display == "block"){
		document.getElementById('mrlee').classList.add("animationFadeOutLeft");
		setTimeout(function(){
			document.getElementById('mrlee').classList.remove("animationFadeOutLeft");
			document.getElementById("mrlee").style.display = "none";
		},1000)
	}
}

function checkProgress(clicked){
	playSound();
	switch(clicked){
		case "back":
			var quizNum = 1;
			if(pageOfQuiz[currentChapter-2] == pagesPerChapter[currentChapter-2]){
				quizNum = 0;
			} 
			console.log((pageOfQuiz[currentChapter-2]+quizNum) + "/" + pagesPerChapter[currentChapter-2])
			if(progressPage.innerHTML == ((pageOfQuiz[currentChapter-2]+quizNum) + "/" + pagesPerChapter[currentChapter-2]) && (pageOfQuiz[currentChapter-2] !=0)){
				callingMrLee()
			}else{
				if(progressPage.innerHTML == ((pageOfQuiz[currentChapter-1]) + "/" + pagesPerChapter[currentChapter-1]) && (pageOfQuiz[currentChapter-1] !=0)){
					callingMrLee();
				}else{
					exitMrLee();
				}
			}
		break;
		default:
			if(progressPage.innerHTML == ((pageOfQuiz[currentChapter-1] + "/" + pagesPerChapter[currentChapter-1])) && (pageOfQuiz[currentChapter-1] !=0)){
				callingMrLee()
			}else{
				if(progressPage.innerHTML == ((pageOfQuiz[currentChapter-1]+1) + "/" + pagesPerChapter[currentChapter-1]) && (pageOfQuiz[currentChapter-1] !=0)){
					callingMrLee();
					if(currentChapter == 1){
						document.querySelector('nav a:nth-child(1) span').style.pointerEvents = "";
						document.querySelector('nav a:nth-child(1) span').classList.add("done");
					}
				}else{
					exitMrLee();
				}
			}
		break;
	}
}

function playSound(){
	muted = true;
	isPlaying = false;
	togglePlayPause();
	console.log("play audio");
}

function closeWindow(){
	window.close();
	console.log("close window")
}

closeX.addEventListener("click",closeWindow);

loadScript("js/soundControls.js", jsLoaded);

window.onmessage = function(e){
    if (e.data == 'correct') {
    	aud.src = 'audio/correct.mp3';
    	aud.play();
        disableControls();
    }
};