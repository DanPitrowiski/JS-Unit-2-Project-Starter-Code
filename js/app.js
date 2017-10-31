// Dan Pitrowiski JS-SF-8

/*
  Please add all Javascript code to this file.
*/

// Just get an API to work
'use strict';

let globalIndex = 0;

let digg = {
	url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
	source: 'digg',
};

let hackernews = {
	url: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
	source: 'hn',
};

let dailywtf = {
	url: 'https://accesscontrolalloworiginall.herokuapp.com/https://thedailywtf.com/api/articles/recent/10',
	source: 'dailywtf',
}

let guardiannews = {
	api: 'https://content.guardianapis.com/search?api-key=',
	key: 'db045aa3-693a-4609-a87e-e895500f7a80',
	url: this.api+this.key,
	source: 'guardian',
};

//DIGG
function postDigg(url, source){
	// debugger;
	$.get(url, function(){
		console.log("succeded");
	})
	.done(function(result){
		console.log(result.data.feed);
		result.data.feed.forEach(function(element, index){
			//Digg content
			let content = createContent(result, element, source);
			console.log(content);
			// Creating a template
			let template = templateHTML(content, index);
			$("#main").append(template);
			//Adding an event listener to the new content
			addEventListener(content, index);
			globalIndex++;
		})
	})
}

function postDailyWTF(url, source){
	// debugger;
	$.get(url, function(){
		console.log("succeded");
	})
	.done(function(result){
		console.log("DailyWTF:");
		console.log(result);
		result.forEach(function(element, index){
			//Digg content
			let content = createContent(result, element, source);
			console.log(content);
			// Creating a template
			let template = templateHTML(content, index);
			$("#main").append(template);
			//Adding an event listener to the new content
			addEventListener(content, index);
			globalIndex++;
		})
	})
}

// The Guardian
function postGuardian(url, source){
	// debugger;
	api.editions.search('us') //make the call
	.then(function(response){
    	console.log(response.body); //do something with the response
  	})
  	.catch(function(err){
    	console.log(err);
  	});
}

// Hackernews
function postHackerNews(url, source){
	// debugger;
	$.get(url, function(){
		console.log("succeded");
	})
	.done(function(result){
		console.log("Hackernews:");
		result.slice(0,10).forEach(function(element, index){
			$.get("https://hacker-news.firebaseio.com/v0/item/"+result[index]+".json?print=pretty", function(){
	  		console.log("succeded");
			})
			.done(function(result){
				//HN content
				console.log(result);
				let content = createContent(result, element, source);
				console.log(content);
				// Creating a template
				let template = templateHTML(content, index);
				$("#main").append(template);
				//Adding an event listener to the new content
				addEventListener(content, index);
				globalIndex++;
				console.log("Element: " + element);
				console.log("Index: " + index);
			})
		})
	})
}

function createContent(result, element, source){

	if (source === "digg"){
		var articleContent = {
		  title: element.content.title,
		  description: element.content.description,
		  score: element.diggs.count,
		  image: element.content.media.images[0].url,
		  tag: element.content.tags["0"].display_name,
		  url: element.content.url,
		};
		return articleContent;
	}
	if (source === "hn"){
		let tagname;
		if (typeof result.type === "undefined"){
			tagname = "hackernews";
		}else{
			tagname = result.type;
		}
		var articleContent = {
			title: result.title,
			description: "",
		  	score: result.score,
			image: "images/hackernews-logo.jpg",
			tag: tagname,
			url: result.url,
		};
		return articleContent;
	}
	if (source === "dailywtf"){
		var articleContent = {
			title: element.Title,
			description: element.Series.Description,
		  	score: element.CachedCommentCount,
			image: element.Author.ImageUrl,
			tag: element.Slug,
			url: element.Url,
		};
		return articleContent;
	}
}

function templateHTML(content, index){
	    let template = `
	  <article id="article-${globalIndex}" class="article">
	    <section class="featuredImage">
	      <img src="${content.image}" alt="" />
	    </section>
	    <section class="articleContent">
	        <a href="#"><h3>${content.title}</h3></a>
	        <h6>${content.tag}</h6>
	    </section>
	    <section class="impressions">
	      ${content.score}
	    </section>
	    <div class="clearfix"></div>
	  </article>
	`;
	return template;
}

function addEventListener(content, index){
	$(`#article-${globalIndex}`).click(function(){
		$('#popUp').removeClass('loader hidden')
		$('#popUp h1').text(content.title);
		$('#popUp p').text(content.description);
		$('#popUp a.popUpAction').attr("href" , content.url);

		$('#popUp .closePopUp').click(function(){
			$('#popUp').addClass('hidden')
		})
	})
}

 $( document ).ready(function() {
	postDigg(digg.url, digg.source);
	postHackerNews(hackernews.url, hackernews.source);
	postDailyWTF(dailywtf.url, dailywtf.source);
	// postGuardian(guardiannews.url, guardiannews.source);
	loadingOff();
 });

// PAGE INTERACTIONS

$('.digg').click( function(){
	loadingOn();
	$( "#main" ).children().remove();
	postDigg(digg.url, digg.source);
	$(".source").html("Digg")
	loadingOff();
});

$('.hackernews').click( function(){
	loadingOn();
	$( "#main" ).children().remove();
	postHackerNews(hackernews.url, hackernews.source);
	$(".source").html("Hackernews");
	loadingOff();
});

$('.dailywtf').click( function(){
	loadingOn();
	$( "#main" ).children().remove();
	postDailyWTF(dailywtf.url, dailywtf.source);
	$(".source").html("DailyWTF");
	loadingOff();
});

$('#feedr').click( function(){
	loadingOn();
	$( "#main" ).children().remove();
	postDigg(digg.url, digg.source);
	postHackerNews(hackernews.url, hackernews.source);
	postDailyWTF(dailywtf.url, dailywtf.source);
	loadingOff();
});

$('.search-icon').click( function(){
	$("#search").toggleClass("active");
});

function loadingOn(){
	$('#popUp').addClass('loader');
	$('#popUp').removeClass('hidden');
}
function loadingOff(){
	$('#popUp').removeClass('loader');
	$('#popUp').addClass('hidden');
}