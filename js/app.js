// Dan Pitrowiski JS-SF-8

/*
  Please add all Javascript code to this file.
*/

// Just get an API to work
'use strict';

let digg = {
	url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
	source: 'digg',
}

var apiLinkGuardian = 'https://content.guardianapis.com/search?api-key=';
var apiKeyGuardian = 'db045aa3-693a-4609-a87e-e895500f7a80';


function postStories(url, source){
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
		})
	})
}

function createContent(result, element, source){
	console.log("Result")
	if (source === "digg"){
		let content = {
		  title: element.content.title,
		  description: element.content.description,
		  score: element.diggs.count,
		  image: element.content.media.images[0].url,
		  tag: element.content.tags["0"].display_name,
		  url: element.content.url,
		}
	}
	return content;
}

function templateHTML(content, index){
	    let template = `
	  <article id="article-${index}" class="article">
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
		$(`#article-${index}`).click(function(){
			$('#popUp').removeClass('loader hidden')
			$('#popUp h1').text(content.title);
			$('#popUp p').text(content.description);

			$('#popUp a.popUpAction').attr("href" , content.url);

		$('#popUp .closePopUp').click(function(){
			$('#popUp').addClass('hidden')
		})
	})
}

postStories(digg.url, digg.source);