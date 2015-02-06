var array = {											// Arrays
	oscars : [],										// Associative array which stores category and chosen winner
}
var num = {												// Various numbers		
	oscars : 0
}
var string = {											// Strings to save selected options
	category : '',
	movie : '',
	user : 'test'
}
var check = {											// Check things
	selected : function() {								// Colors the arrows green if a winner is selected
		num.oscars = 0;
		//Loop through associative array
		for (var prop in array.oscars) {
			if (array.oscars.hasOwnProperty(prop)) { 
			num.oscars++;
			$('#header_progress_'+prop).css("color", "green");
			$('#sidebar_'+prop).css("color", "green");
		  }
		}
	}
}
var get = {
}
var handler = {											// Event handlers
	clickHeaderLogo : function() {
		$('#welcome').show();
		$('#main').hide();
		$('#main_wahl').hide();
	},
	clickSidebarLink : function(){
		$('#welcome').hide();
		$('#main').show();
		$('#main_wahl').hide();
		$('.sidebar_link').css("font-weight", "normal");
		$(this).css("font-weight", "bold");
		var id = $(this).attr('id');
		var main_id = 'main' + oscars.remove(id, 'sidebar');
		$('.main_content').hide();
		$('#'+main_id).show();
		string.category = oscars.remove(id, "sidebar_"); // set current category 
		update.all();
	},
	clickSidebarWahl : function() {
		$('.sidebar_link').css("font-weight", "normal");
		vis.showInfoWahl();	
	},
	clickSidebarSubmit : function() {
		if(num.oscars != 24) alert("DU hast noch nicht alle Kandidaten gewählt");
		else {
			$.post("cheng", 
			{
				user: string.user,
				oscars: array.oscars
			}, function(data,status){
				alert("Data: " + data + "\nStatus: " + status);
			});
		}
	},
	clickMovieCard : function() {
		var id = $(this).attr('id');
		var string_first = id.substring(id.indexOf("_"));
		var string_last = id.substring(id.lastIndexOf("_"));
		var category = oscars.remove(id, string_last);
		string.movie = id.substring(id.lastIndexOf("_")+1);
		category = oscars.remove(category, 'main_');
		// string[category] = string.movie;
		array.oscars[category] = string.movie;
		// console.log(array.oscars);
		//vis.showInfo();
		update.all();
	},
	mouseInMovieCard : function() {
		var id = $(this).attr('id');
		var movie = id.substring(id.lastIndexOf("_")+1);
		$('#info_'+movie).show();
	},
	mouseOutMovieCard : function() {
		$('.info_movie').hide();
	},
	mouseInProgress : function() {
		var id = $(this).attr('id');
		var category = id.substring(16)
		var movie = array.oscars[category];
		$('#info_'+movie).show();
	},
	mouseOutProgress : function() {
		$('.info_movie').hide();
	}
}
var oscars = {											// Website related functions
	remove : function(tempStr, removeStr) {				// Remove elements(removeStr) from a string(tempStr)
		return tempStr.replace(removeStr, '');
	}
}
var update = {											// Updates variables/ website, ...
	all : function() {
		update.highlightMovieCard();
		check.selected();
		// console.log("string.category: "+string.category);
	},
	highlightMovieCard : function() {
		var highlighted;
		highlighted = 'main_'+string.category+'_'+array.oscars[string.category];
		$('#'+highlighted).css("border", "3px solid #33CC33");
		$('#'+highlighted).css("box-shadow", "1px 1px 1px 1px #4C764C");
		$('#'+highlighted).siblings().css("border", "3px solid #f0f0f0");
		$('#'+highlighted).siblings().css("box-shadow", "1px 1px 2px 1px  #666666");
	}
}
var vis = {												// Manages visibilty
	showInfo : function() {								// Shows movie info on hover / click						
		$('.info_movie').hide();
		$('#info_'+string.movie).show();
	},
	showInfoWahl : function() {							// Shows your chosen winners
		$('#welcome').hide();
		$('#main').show();
		$('#main_wahl').siblings().hide();
		$('#main_wahl').show();	
		for (var prop in array.oscars) {
			if (array.oscars.hasOwnProperty(prop)) { 
				var movie = $('#info_'+array.oscars[prop]).clone();
				movie.removeClass("info_movie");
				movie.removeAttr("id");
				movie.attr("class", "main_wahl_"+array.oscars[prop]);
				movie.show();
				$('#main_wahl_'+prop).show();
				$('#main_wahl_'+prop).html(movie);
				$('#main_wahl_'+prop+' .info_zusammenfassung').hide();
			}
		}
		$('.info_movie').hide();
	}
}
$(document).ready(function(){
	// Click events
	$('.sidebar_link').click(handler.clickSidebarLink);
	$('.main_movie_card').click(handler.clickMovieCard);
	$('.main_movie_card').hover(handler.mouseInMovieCard, handler.mouseOutMovieCard);
	$('.header_progress').hover(handler.mouseInProgress, handler.mouseOutProgress);
	$('#sidebar_wahl').click(handler.clickSidebarWahl);
	$('#sidebar_submit').click(handler.clickSidebarSubmit);
	$('#header_logo').click(handler.clickHeaderLogo);
	// START OSCARS
	$('#main_wahl').hide();
	$('.welcome_user').html(string.user);
});