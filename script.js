console.log(`@Anku_Choudhary`);

document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
});

function search() {
    document.getElementById("results").innerHTML = " ";
    document.getElementById("buttons").innerHTML = " ";

    q = $("#search-field").val();

    $.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
            part: "snippet, id",
            q: q,
            order: "viewCount",
            maxResults: "5",
            type: "video",
            key: "AIzaSyAMoA8HA4Qid8zNrO4DzLbStjGHzr8VSiE",
        },
        function (data) {
            $.each(data.items, function (i, item) {
                var output = getOutput(item, i);
                $("#results").append(output);
            });

            var buttons = getButtons(data.prevPageToken, data.nextPageToken);

            $("#buttons").append(buttons);
        }
    );
}

function nextPage() {
    var token = $("#next-button").data("token");
    var q = $("#next-button").data("query");

    document.getElementById("results").innerHTML = " ";
    document.getElementById("buttons").innerHTML = " ";

    q = $("#search-field").val();

    $.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
            part: "snippet, id",
            q: q,
            order: "viewCount",
            maxResults: "5",
            pageToken: token,
            type: "video",
            key: "AIzaSyAMoA8HA4Qid8zNrO4DzLbStjGHzr8VSiE",
        },
        function (data) {
            $.each(data.items, function (i, item) {
                var output = getOutput(item, i);
                $("#results").append(output);
            });

            var buttons = getButtons(data.prevPageToken, data.nextPageToken);

            $("#buttons").append(buttons);
        }
    );
}

function prevPage() {
    var token = $("#prev-button").data("token");
    var q = $("#prev-button").data("query");

    document.getElementById("results").innerHTML = " ";
    document.getElementById("buttons").innerHTML = " ";

    q = $("#search-field").val();

    $.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
            part: "snippet, id",
            q: q,
            order: "viewCount",
            maxResults: "5",
            pageToken: token,
            type: "video",
            key: "AIzaSyAMoA8HA4Qid8zNrO4DzLbStjGHzr8VSiE",
        },
        function (data) {
            $.each(data.items, function (i, item) {
                var output = getOutput(item, i);
                $("#results").append(output);
            });

            var buttons = getButtons(data.prevPageToken, data.nextPageToken);

            $("#buttons").append(buttons);
        }
    );
}


 
function getOutput(item, i) {
    var videoID = item.id.videoId;
    var title = item.snippet.title;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var view = "45 M";

    var output =
        "<li>" +
        '<div class="list-left">' +
        '<img src="' +
        thumb +
        '" >' +
        "</div>" +
        '<div class="list-right">' +
        '<h3><a class="videoplay fancybox fancybox.iframe" target="blank" href="http://youtube.com/embed/' +
        videoID +
        '">' +
        title +
        "</a></h3>" +
        '<p class="cTitle">' +
        channelTitle +
        "</p> " +
        '<div class="youtube-view">' +
        '<p class="youtubelogo">' +
        '<img src="/img/YoutubeLogo.png" alt="youtube">' + " Youtube.com" +
        "</p>" +
        '<p class="views">' +
        view + " Views" +
        "</p>" +
        "</div>"+
        "</div>" +
        "</li>" +
        '<div class="clearfix"></div>' +
        "";

    return output;
}



function getButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        var btnoutput =
            '<div class="button-container">' +
            '<button id="next-button" class=" paging-button " data-token="' +
            nextPageToken +
            '" data-query="' +
            q +
            '"' +
            'onclick = "nextPage();">Next Page</button>' +
            "</div>";
    } else {
        var btnoutput =
            '<div class="button-container">' +
            '<button id="prev-button" class="paging-button" data-token="' +
            prevPageToken +
            '" data-query="' +
            q +
            '"' +
            'onclick = "prevPage();">Prev Page</button>' +
            '<button id="next-button" class="paging-button" data-token="' +
            nextPageToken +
            '" data-query="' +
            q +
            '"' +
            'onclick = "nextPage();">Next Page</button>' +
            "</div>";
    }

    return btnoutput;
}

