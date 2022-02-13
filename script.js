const APIKEY = "AIzaSyCOTasUQqKlS585c2Cd-1u5Q3SF6Bfyqa0";
const rootUrl = "https://www.googleapis.com/youtube/v3";
let channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw";
let playListId = "PLOU2XLYxmsIKQPrmzi3ZXep2rlMnmQwjQ"; 
let channelFetchUrl = `${rootUrl}/channels?part=contentDetails,snippet,statistics,topicDetails,brandingSettings&id=${channelId}&key=${APIKEY}`;
let channelPlaylistUrl = `https://www.googleapis.com/youtube/v3/playlists?channelId=${channelId}&maxResults=50&key=${APIKEY}`;
let channelPlaylistItemsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playListId}&maxResults=50&key=${APIKEY}`;
let fetchChannelInfo = fetch(channelFetchUrl)
.then(response => response.json())
.then(data => channelInfo(data));

var channelInfo = (dataJson) => {
    if(dataJson.items.length > 0){
        let items = dataJson.items;
        let title = items[0].snippet.title;
        let imgSrc = items[0].snippet.thumbnails.default.url;
        let subscribeCount = items[0].statistics.subscriberCount;
        document.getElementById("channelTitle").innerText = title;
        document.getElementById("channelImg").src = imgSrc;        
        document.getElementById("channelSubTitle").innerText = `${subscribeCount} subscribers`; 
        console.log(dataJson);  
        channelPlaylist();            
    }else{
        alert("No records found!")
    }
    
}
let channelPlaylist = fetch(channelPlaylistItemsUrl)
.then(response => response.json())
.then(data => {
    let div = document.createElement("div");
    div.className = "flex-item";
    let itemsArr = data.items;
    //console.log(itemsArr);
    itemsArr.forEach(element => {
        let videoId = element.contentDetails.videoId;
        console.log(videoId);           
        let ahref = document.createElement("a");
        ahref.href = `https://www.youtube.com/watch?v=${videoId}`;
        let iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.height = 250;
        iframe.width = 250;
        ahref.append(iframe);
        div.append(ahref);
        document.getElementById("flex-container").append(div);
    });    
});
fetchChannelInfo();