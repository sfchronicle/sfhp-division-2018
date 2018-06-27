require("./lib/social"); //Do not delete


/*var clientHeight = $(window).height();
  $('.element').css('height', clientHeight);*/

// console.log("getting in main!!!")

const videos = $(".photo-nav-item > video")
const individuals = $(".individuals")
const individualDivs = $(".individual")
const wrap = $(".wrap")
const titleBox = $(".title-box")

const fixedOffset = 37 
const em = 21

let videoHeight = 0
let intersectOffset = fixedOffset + videoHeight
let individualTop = []
let selected
let currIndex
let insideIndividuals = false


let clicked = false
window.addEventListener('resize', resize)
function resize() {
	// console.log("getting called")
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
	videoHeight = window.innerWidth > 670 ? (window.innerWidth/6) * 9/16 : (window.innerWidth/2.5) * 9/16
	console.log(videoHeight)
	intersectOffset = fixedOffset + videoHeight
	calculatePositions()

}
function calculatePositions() {
	individualTop = []
	individualDivs.each(function(i, d) {
		const rect = d.getBoundingClientRect()
		individualTop.push(Math.floor(window.pageYOffset + rect.top))
	})
}

function findIndex(scrollPos)	{
	//console.log(scrollPos)
	//console.log(eventTop)
		// console.log(scrollPos)
		// console.log(individualTop)
	for (let i = 0; i < individualTop.length; i++) {

		if (scrollPos >= individualTop[i] && scrollPos < individualTop[i+1]) {
			return i
		} else if (i == individualTop.length - 1 && scrollPos >= individualTop[i]) {
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
  	calculatePositions()
  	//videoHeight = videos[0].clientHeight
		intersectOffset = fixedOffset + videoHeight
		const photoNavContainerRect = photoNavContainer.getBoundingClientRect()
		const individualsRect = individualsContainer.getBoundingClientRect()
		//const timelineRect = timeline.getBoundingClientRect()
		const topoffset = photoNavContainerRect.top + window.pageYOffset
		const bottomoffset = individualsRect.bottom + window.pageYOffset
		//console.log(window.pageYOffset)
		//console.log(bottomoffset - (videoHeight + fixedOffset))
		//console.log(window.pageYOffset)
		//console.log("videoHeight: " + videoHeight)
		//console.log(bottomoffset - (videoHeight + fixedOffset))
		if (window.pageYOffset + fixedOffset >= topoffset && window.pageYOffset <= bottomoffset - (videoHeight + fixedOffset)) {
	    photoNav.classList.add("is_fixed")
	    photoNav.classList.remove("is_unfixed")
	    photoNav.classList.remove("is_bottom")
	    //photoNavContainer.style.marginTop = "0px"
	    
	  } else if (window.pageYOffset > bottomoffset - (videoHeight + fixedOffset)) {
	    photoNav.classList.remove("is_fixed")
	    photoNav.classList.remove("is_unfixed")
	    photoNav.classList.add("is_bottom")
	  } else {
	    photoNav.classList.remove("is_fixed")
	   	photoNav.classList.add("is_unfixed")
	    photoNav.classList.remove("is_bottom")
	  }

	  currIndex = findIndex(window.pageYOffset + intersectOffset)
	  // console.log(currIndex)
	  //console.log(currIndex)
	  //console.log(selected)
	  //console.log(currIndex)
	  //console.log(selected)
	  //console.log(clicked)
	  if (currIndex != null) {		
	  	insideIndividuals = true  
	  	if (clicked) {
		  	if (currIndex != selected) {
		  		//console.log("don't interact yet")
		  	}
		  	else {

		  		//console.log("currIndex and selected are equal")
		  		//clickinteract()
		  		clicked = false
		  	}
		  } else {
		  	// console.log("that one")
		  	scrollinteract()
		  }
		} else {
			insideIndividuals = false
			// console.log("this one")
			scrollinteract()
		}
	}

	function scrollinteract() {
		// console.log("scroll interact")
		//console.log("interacting")
		currIndex = findIndex(window.pageYOffset + intersectOffset)
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

	function clickinteract(selected) {

		// console.log("clickinteract")
		currIndex = selected
		// console.log(currIndex)
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
		calculatePositions()
		// console.log(individualTop)
		clicked = true
		selected = e.target.id.charAt(1)

		let targetDiv = document.getElementById(`p${selected}`).getBoundingClientRect()
		//console.log(intersectOffset)
		//console.log(window.pageYOffset + targetDiv.top - (intersectOffset + em ))
		var pos = window.pageYOffset + targetDiv.top - intersectOffset
		// console.log(pos)
    // animated top scrolling
    $('body, html').animate({scrollTop: pos},1000);
    $(`#v${selected}`).get(0).play();
    clickinteract(selected)

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
			if (insideIndividuals) {
	    
		    $('video', this).removeClass("activeVideo")
		  	$('video', this).addClass("passiveVideo")
		  }
		}
		//scrollinteract()
		

	}
})
