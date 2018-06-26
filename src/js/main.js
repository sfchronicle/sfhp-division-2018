require("./lib/social"); //Do not delete


/*var clientHeight = $(window).height();
  $('.element').css('height', clientHeight);*/

console.log("getting in main!!!")

window.addEventListener('resize', resize)
const margin = 1
const videos = $(".photo-nav-item > video")
const individuals = $(".individuals")
const wrap = $(".wrap")
const fixedOffset = 37 
let intersectOffset = window.innerWidth > 480 ? window.innerHeight * 0.5 : window.innerHeight * 0.25
const em = 21
let videoHeight = 0
let individualTop = []
let selected 
let scrolled 
const individualDivs = $(".individual")
const titleBox = $(".title-box")
function resize() {
	console.log("getting called")
	//console.log(images.length - 1)
	intersectOffset = window.innerWidth > 480 ? window.innerHeight * 0.5 : window.innerHeight * 0.25
	//images.width((window.innerWidth - (margin*(images.length-1)))/images.length)
	/*if (window.innerWidth >= 1200) {
		videos.width(window.innerWidth/videos.length)
		wrap.width(window.innerWidth)
	} else {
		videos.width(200)
		wrap.width(200*videos.length)
	}*/
	
	videoHeight = videos[0].clientHeight
	// titleBox.css("margin-top", videoHeight + em)

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

  window.addEventListener('scroll', (event) => {
  	console.log("scrolling")
		const photoNavContainerRect = photoNavContainer.getBoundingClientRect()
		const individualsRect = individualsContainer.getBoundingClientRect()
		//const timelineRect = timeline.getBoundingClientRect()
		const topoffset = photoNavContainerRect.top + window.pageYOffset
		const bottomoffset = individualsRect.bottom + window.pageYOffset

		if (window.pageYOffset + fixedOffset >= topoffset && window.pageYOffset <= bottomoffset - window.innerHeight/2) {
	    photoNav.classList.add("is_fixed")
	    photoNav.classList.remove("is_unfixed")
	    photoNav.classList.remove("is_bottom")
	  } else if (window.pageYOffset > bottomoffset) {
	    photoNav.classList.remove("is_fixed")
	    photoNav.classList.remove("is_unfixed")
	    photoNav.classList.add("is_bottom")
	  } else {
	    photoNav.classList.remove("is_fixed")
	   	photoNav.classList.add("is_unfixed")
	    photoNav.classList.remove("is_bottom")
	  }

	  individualDivs.each(function(i, d) {
	  	let currIndex = findIndex(window.pageYOffset)
	  	scrolled = currIndex
	  	if (i == currIndex) {
	  		$(`#v${i}`).get(0).play()
	  	} else {
	  		$(`#v${i}`).get(0).pause()
	  	}
	  })
	})


	$(".photo-nav-item").on("click", function(e) {
		console.log("hello i am being clicked")
		console.log(e.target)
		selected = e.target.id.charAt(1)
		let targetDiv = $(`#p${selected}`)
		console.log(targetDiv)
		var pos = targetDiv.offset().top - (fixedOffset + videoHeight);
    // animated top scrolling
    $('body, html').animate({scrollTop: pos},1000);
    $(`#v${selected}`).get(0).play();

	})

	var figure = $(".photo-nav-item").hover(hoverVideo,hideVideo);

	function hoverVideo(e) {
		console.log("hovering")
	    $('video', this).get(0).play(); 
	}

	function hideVideo(e) {
		console.log(selected)
		console.log(e.target)
		console.log(e.target.id.charAt(1))
		if (e.target.id.charAt(1) != selected) {
	    $('video', this).get(0).pause();
		}
	}
})
