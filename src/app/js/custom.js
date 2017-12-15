//Shopping App JavaScript Document

// My List
function setContentHeight(){
	document.getElementsByClassName('content')[0].style.height = window.innerHeight - document.getElementsByClassName('nav-top')[0].offsetHeight - document.getElementsByClassName('nav-bottom')[0].offsetHeight + 'px';
}
setContentHeight()
window.onresize = function(){
	setContentHeight();
}





