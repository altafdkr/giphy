$(document).ready(function(){
    var topics = ["Funny Cats", "Babies"];


function renderButton() {
$("#button-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>");
        b.addClass("gifBtn btn btn-outline-success");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#button-view").append(b);
       

    }
}
  
    renderButton();

$(document).on("click",".gifBtn", function() {
    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=FBrPTF2DmUahSsI9h0AbT78Zf774C8gU&limit=10";
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        for (var i=0; i<results.length; i++){
            var topicsDiv = $("<div>");
            var p = $("<p>").text("Rating: "+ results[i].rating);
            var topicsImg = $("<img>");
            topicsImg.attr({"src": results[i].images.fixed_height_still.url, "data-state":"still", "data-still":results[i].images.fixed_height_still.url, "data-animate":results[i].images.fixed_height.url});
            topicsImg.addClass("gif");
            topicsDiv.append(topicsImg, p);
            $("#giphy-view").prepend(topicsDiv);
        }
    }).catch(function (error) {
        console.log(error);
    });
}); 


$(".searchBtn").on("click", function(event){
    event.preventDefault();
    topic = $("#search-input").val().trim();
    var newBtn = $("<button>");
    newBtn.addClass("gifBtn btn btn-outline-success");
    newBtn.attr("data-name", topic);
    newBtn.text(topic);
    $("#button-view").append(newBtn)
    topics.push(topic);

   
});

$(document).on("click",".gif", function(){
    var state = $(this).attr("data-state");
    if(state == "still"){
        $(this).attr({'src':$(this).attr('data-animate'), 'data-state':"animate"});
    }else{
        $(this).attr({'src':$(this).attr('data-still'), 'data-state':"still"});
    }
});

});