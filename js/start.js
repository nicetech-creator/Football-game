window.addEventListener("load",Main);
function Main(e){
	window.removeEventListener("load",Main);
	var swidth = window.innerWidth;
	
	if(swidth <= 1024){
		location.href = "mbball.html";
	}else{
	 location.href = "pcball.html";
	
	}
}