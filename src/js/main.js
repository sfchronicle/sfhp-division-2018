require("./lib/social"); //Do not delete


/*var clientHeight = $(window).height();
  $('.element').css('height', clientHeight);*/

console.log("getting in main!!!")

const videos = $(".photo-nav-item > video")
const individuals = $(".individuals")
const individualDivs = $(".individual")
const wrap = $(".wrap")
const titleBox = $(".title-box")

const fixedOffset = 37 
const em = 21

let videoHeight = 0
let intersectOffset = window.innerHeight * 0.25
let individualTop = []
let selected
let currIndex


let clicked = false
window.addEventListener('resize', resize)
function resize() {
	console.log("getting called")
	//console.log(images.length - 1)
	//intersectOffset = window.innerWidth > 480 ? window.innerHeight * 0.5 : window.innerHeight * 0.25
	
	//images.width((window.innerWidth - (margin*(images.length-1)))/images.length)
	/*if (window.innerWidth >= 1200) {
		videos.width(window.innerWidth/videos.length)
		wrap.width(window.innerWidth)
	} else {
		videos.width(200)
		wrap.width(200*videos.length)
	}*/
	
	//titleBox.css("margin-top", fixedOffset + videoHeight + (6*em))
	videoHeight = videos[0].clientHeight
	intersectOffset = window.innerHeight * 0.25
	calculatePositions()

}
function calculatePositions() {
	individualTop = []
	individualDivs.each(function(i, d) {
		const rect = d.getBoundingClientRect()
		individualTop.push(window.pageYOffset + rect.top)
	})
}

function findIndex(scrollPos)	{
	//console.log(scrollPos)
	//console.log(eventTop)
	for (let i = 0; i < individualTop.length; i++) {
		if (scrollPos + intersectOffset > individualTop[i] && scrollPos + intersectOffset < individualTop[i+1]) {
			return i
		} else if (i == individualTop.length - 1 && scrollPos + intersectOffset > individualTop[i]) {
			return i
		}
	}
}
resize()


window.addEventListener('load', function () { 
	//const photoNav = $
	const photoNavContainer = document.getElementsByClassName("photo-nav-container")[0]
	const photoNav = document.getElementsByClassName("photo-nav")[0]
	const individualsContainer = document.getElementsByClassName("individuals-container")[0]

  window.addEventListener('scroll', scroll)
  scroll()
  function scroll() {
		const photoNavContainerRect = photoNavContainer.getBoundingClientRect()
		const individualsRect = individualsContainer.getBoundingClientRect()
		//const timelineRect = timeline.getBoundingClientRect()
		const topoffset = photoNavContainerRect.top + window.pageYOffset
		const bottomoffset = individualsRect.bottom + window.pageYOffset

		if (window.pageYOffset + fixedOffset >= topoffset && window.pageYOffset <= bottomoffset - window.innerHeight/2) {
	    photoNav.classList.add("is_fixed")
	    photoNav.classList.remove("is_unfixed")
	    photoNav.classList.remove("is_bottom")
	    //photoNavContainer.style.marginTop = "0px"
	    
	  } else if (window.pageYOffset > bottomoffset) {
	    photoNav.classList.remove("is_fixed")
	    photoNav.classList.remove("is_unfixed")
	    photoNav.classList.add("is_bottom")
	  } else {
	    photoNav.classList.remove("is_fixed")
	   	photoNav.classList.add("is_unfixed")
	    photoNav.classList.remove("is_bottom")
	  }

	  currIndex = findIndex(window.pageYOffset)
	  //console.log(currIndex)
	  //console.log(currIndex)
	  //console.log(selected)
	  console.log(clicked)
	  if (currIndex != null) {		  
	  	if (clicked) {
		  	if (currIndex != selected) {
		  		//console.log("don't interact yet")
		  	}
		  	else {

		  		//console.log("currIndex and selected are equal")
		  		interact()
		  		clicked = false
		  	}
		  } else {
		  	//console.log("I shouldn't be getting here when clicking")
		  	interact()
		  }
		} else {
		}
	}

	function interact() {
		//console.log("interacting")
		currIndex = findIndex(window.pageYOffset)
	  individualDivs.each(function(i, d) {
	  	if (i == currIndex) {
	  		$(`#v${i}`).get(0).play()
	  		
  			$(`#v${i}`).addClass("activeVideo")
  			$(`#v${i}`).removeClass("passiveVideo")
	  	} else if (currIndex == null) {
	  		$(`#v${i}`).get(0).pause()
	  		$(`#v${i}`).addClass("activeVideo")
  			$(`#v${i}`).removeClass("passiveVideo")
	  	} else {
	  		$(`#v${i}`).get(0).pause()
	  		$(`#v${i}`).removeClass("activeVideo")
	  		$(`#v${i}`).addClass("passiveVideo")
	 		}
	  })
	  

	}
	$(".photo-nav-item").on("click", function(e) {
		clicked = true
		selected = e.target.id.charAt(1)
		let targetDiv = $(`#p${selected}`)
		console.log(videoHeight)
		var pos = targetDiv.offset().top - (fixedOffset + videoHeight);
    // animated top scrolling
    $('body, html').animate({scrollTop: pos},1000);
    $(`#v${selected}`).get(0).play();

	})

	var figure = $(".photo-nav-item").hover(hoverVideo,hideVideo);

	function hoverVideo(e) {
		//console.log("hovering")
	    $('video', this).get(0).play(); 
	    $('video', this).addClass("activeVideo")
	    $('video', this).removeClass("passiveVideo")
	}

	function hideVideo(e) {
		if (e.target.id.charAt(1) != selected) {
	    $('video', this).get(0).pause();
	    $('video', this).removeClass("activeVideo")
	  	$('video', this).addClass("passiveVideo")
		}
		interact()
		

	}
})
