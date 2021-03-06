/* Animated menu */
$("#menu li a").hover(function() {
	$(this).animate({ paddingLeft: "25" }, 200);
}, function() {
	$(this).animate({ paddingLeft: "15" }, 200);
});

/* Navigation */
function navto(page) {
	/* Open content */
	$("#header").animate({ width: 190}, 500);
	$("#menu").animate({ marginLeft: 800}, 500, function() {
		$("#content #mask_top").css("display", "block");
	});
	$("#html5").animate({ height: 42}, 500);
	$("#closer").css("display", "block");
		
	/* Menu */
	if($("#menu a.current")[0])
		$("#menu a.current")[0].href = $("#menu a.current")[0].alt;
	$("#menu a.current").removeClass("current");
	$(page + "_menu").addClass("current");
	if($(page + "_menu")[0]){
		$(page + "_menu")[0].alt = $(page + "_menu")[0].href;
		$(page + "_menu")[0].href = "javascript:";
	}

	/* Page */
	$("#content .current").animate({ opacity: 0 }, 250, function() {
		$("#content .current").removeClass("current");
		$(page).animate({ opacity: 0 }, 0);
		$(page).addClass("current");
		$(page).animate({ opacity: 1 }, 250);
	});
}

$(window).hashchange(function() {
	if(window.location.hash && window.location.hash!="" && window.location.hash!="#")
		navto(window.location.hash);
	else
		navclose();
});

// Bookmarks & back/fwd
if(window.location.hash && window.location.hash!="" && window.location.hash!="#")
	navto(window.location.hash);

// Close pane
function navclose() {
	if($("#menu a.current")[0])
		$("#menu a.current")[0].href = $("#menu a.current")[0].alt;
	$("#content .current, #menu a.current").removeClass("current");
	$("#tagline").addClass("current");
	$("#tagline").animate({ opacity: 1 }, 500);
	$("#closer").css("display", "none");
	$("#header").animate({ width: 390}, 500);
	$("#menu").animate({ marginLeft: 630}, 500);
	$("#html5").animate({ height: 0}, 500);
	$("#content #mask_top").css("display", "none");
}


/* Web fonts */
function checkWebFont() {
	if($("#header h2").height() > 20)
		$("*").addClass("nowebfont");
}

// Fix for Internet Explorer 8 Cuprum rendering
function fixIE8() {
	if($.browser.msie && $.browser.version=="8.0")
		$("*").addClass("ie8");	
}

/* Email obfuscation */
jQuery.fn.mailme = function() {
	var at = / at /;
	var dot = / dot /g;
	this.each( function() {
		var addr = $(this).text().replace(at,"@").replace(dot,".");
		$(this).after('<a href="mailto:'+addr+'">'+ addr +'</a>').remove();
	});
};

/* onresize & onload */
function resize() {
	if($(window).width() < 1000)
		$("body").css("background-position", "200px top");
	else
		$("body").css("background-position", "center top");

	if($(window).width() < 1000 || $(window).height() < 615){
		$("#header, #menu").css("position", "absolute");
		$("#content #mask_bottom, #content #mask_bottom2, #html5").css("display", "none");
	}else{
		$("#header, #menu, #html5").css("position", "fixed");
		$("#content #mask_bottom, #content #mask_bottom2, #html5").css("display", "inline");
		$("#content .page").css("padding-bottom", $(window).height()-607);
	}
}

function loaded() {
	checkWebFont();
	fixIE8();
	$("span.mymail").mailme();
	resize();
}

function tchoo() {
	$("#tchoo").animate({width: 1100+$(window).width()}, 2500, function(){
		$("#tchoo").css("display", "none");
	});
}
