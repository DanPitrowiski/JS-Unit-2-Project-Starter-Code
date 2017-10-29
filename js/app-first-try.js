// Dan Pitrowiski JS-SF-8

/*
  Please add all Javascript code to this file.
*/

// Just get an API to work

'use strict';

$.get("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json", function(){
  console.log("succeded");
})
.done(function(result){
  console.log(result.data.feed);
  result.data.feed.forEach(function(element, index){
    let content = {
      title: element.content.title,
      description: element.content.description,
      score: element.diggs.count,
      image: element.content.media.images[0].url,
      url: element.content.url
    }

    console.log(content);

    let template = `
	  <article id="article-${index}" class="article">
	    <section class="featuredImage">
	      <img src="${content.image}" alt="" />
	    </section>
	    <section class="articleContent">
	        <a href="#"><h3>${content.title}</h3></a>
	        <h6>${content.tags}</h6>
	    </section>
	    <section class="impressions">
	      ${content.score}
	    </section>
	    <div class="clearfix"></div>
	  </article>
	`;

    $("#main").append(template);

    //add click event listener for article-index
    $(`#article-${index}`).click(function(){
      //change the #popup content
      $('#popUp').removeClass('loader hidden')
      $('#popUp h1').text(content.title);
      $('#popUp p').text(content.description);
      $('#popUp p').text(content.description);

      $('#popUp a.popUpAction').attr("href" , content.url);


      $('#popUp .closePopUp').click(function(){
        $('#popUp').addClass('hidden')
      })
    })
  })
})

$.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", function(){
  console.log("succeded");
})
.done(function(result){
  //remove loader, hide popup
  	console.log(result);

	for (let i=0; i<=10; i++){
		$.get("https://hacker-news.firebaseio.com/v0/item/"+result[i]+".json?print=pretty", function(){
	  	console.log("succeded");
		})
	  	.done(function(result){
	  		console.log(result);

			let content = {
			score: result.score,
			image: "images/hackernews-logo.jpg",
			title: result.title,
			url: result.url
			}

			let template = `
			<article id="article" class="article">
				<section class="featuredImage">
					<img src="${content.image}" alt="" />
				</section>
				<section class="articleContent">
					<a href="#"><h3>${content.title}</h3></a>
					<h6>${content.tags}</h6>
				</section>
				<section class="impressions">
					${content.score}
				</section>
				<div class="clearfix"></div>
			</article>
			`;

			$("#main").append(template);
		})
	}

	$('#article').click(function(){
		$('this #popUp').removeClass('loader hidden')
		$('#popUp h1').text(content.title);
		$('this.#popUp a.popUpAction').attr("href" , content.url);
	})
	$('#popUp .closePopUp').click(function(){
		$('#popUp').addClass('hidden')
	})
})


  var apiLink = 'https://content.guardianapis.com/search?api-key=';
  var apiKey = 'db045aa3-693a-4609-a87e-e895500f7a80';
 
  
  fetch(apiLink + apiKey).then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log(response);
    }
  }).then(function(data) {
    dat = JSON.parse(data);
    console.log(data);
    console.log(data.results)
    console.log(data.results.webUrl); 
  });