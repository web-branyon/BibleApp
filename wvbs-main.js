//RSS url
var RSS = "http://api.preachingcentral.com/bible.php?passage=Jn3:16&version=kjv";

//Stores entries
var entries = [];
var selectedEntry = "";
//var entriesFBnotes = [];
//var selectedFBnotesEntry = "";
var entriesFBpage = [];
var selectedFBpageEntry = "";

var wvbsFBentries = [];
var selectedWVBSFBpageEntry = "";
var sftFBentries = [];
var selectedSFTFBpageEntry = "";
var boundFBentries = [];
var selectedBoundFBpageEntry = "";

var entriesWeb = [];
var selectedWebEntry = "";
var entriesWVBS = [];
var selectedWVBSEntry = "";
var entriesVideo = [];
var selectedVideoEntry = "";
var entriesAlbum = [];
if (localStorage["wvbs_video_selected_album"]) {
    var selectedAlbumEntry = localStorage["wvbs_video_selected_album"];
} else { var selectedAlbumEntry = ""; }
var entriesYTAlbum = [];
var moreRSSurl = "";
var currentEntries = 0;
var json = "";
var readEntry = "Read More";
var t = "";
var retry = "true";
  
function wvbsNews(renderNewsEntries) {
	  $.ajax({
          type: "GET",
          url:RSS,
          timeout: 5000, // milliseconds
          success:function(res,code) {
              entriesNews = [];
              var xmlWeb = $(res);
              var itemsWeb = xmlWeb.find("news");
			  $.each(itemsWeb, function(i, v) {
				  entry = { 
					  description:$(v).find("description").text(),
				  };
				  entriesNews.push(entry);
			  });
			  //store entries
			  localStorage["wvbs_news_entries"] = JSON.stringify(entriesNews);
			  //
			  if (renderNewsEntries && typeof(renderNewsEntries) === "function") {
				  renderNewsEntries(entriesNews);
			  }
		  },
		  error:function(jqXHR,status,error) {
			if(status == 'timeout')
				//alert("connection timed-out, try again or check your internet connection.");
			//try to use cache
			  if(localStorage["wvbs_news_entries"]) {
				  //$("#webSitesArchiveStatus").html("Using cached version...");
				  //$("#webSitesArchiveStatus").style.visibility = "visible";
				  entriesNews = JSON.parse(localStorage["wvbs_news_entries"])
				  if (renderNewsEntries && typeof(renderNewsEntries) === "function") {
					  renderNewsEntries(entriesNews);
				  }				
			  } else {
				  $("#webSitesArchiveStatus").html("Sorry, we are unable to get the website list and there is no cache.");
			  }
		  }
	  }); 
}
function renderNewsEntries(entriesNews) {
    entries = entriesNews;
    var s = '';
    $.each(entries, function(i, v) {
        s += '<li data-entryid="'+i+'">' + v.description + '</li>';
		//console.log(entriesNews[i].description);
    });
    $('#newsMessages').html(s);
	$("#newsDIV").css('display','block');
}
/*EXAMPLE XML results using the following API call: http://api.preachingcentral.com/bible.php?passage=Jn3:16&version=kjv
******************************
<bible>
<title>Jn3:16</title>
<range>
<request>Jn3:16</request>
<result>John 3:16</result>
<item>
<bookname>John</bookname>
<chapter>3</chapter>
<verse>16</verse>
<text>
For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.
</text>
</item>
</range>
<cache>Cached result</cache>
<time>0.012</time>
</bible>
*/