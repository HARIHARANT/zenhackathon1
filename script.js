const APIKEY = "AIzaSyCOTasUQqKlS585c2Cd-1u5Q3SF6Bfyqa0";
const rootUrl = "https://www.googleapis.com/youtube/v3";
let channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw";
let playListId = "PLOU2XLYxmsIKQPrmzi3ZXep2rlMnmQwjQ";
let searchContent = "google";
let channelFetchUrl = `${rootUrl}/channels?part=contentDetails,snippet,statistics,topicDetails,brandingSettings&id=${channelId}&key=${APIKEY}`;
let channelPlaylistUrl = `${rootUrl}/playlists?part=contentDetails,snippet,id,player&channelId=${channelId}&maxResults=50&key=${APIKEY}`;
let channelPlaylistItemsUrl = `${rootUrl}/playlistItems?part=contentDetails&playlistId=${playListId}&maxResults=50&key=${APIKEY}`;

let fetchChannelInfo = async (url) => {
    const response = await fetch(url);
    const channelInfoRes = await response.json();
    if (response.ok) {
        channelInfo(channelInfoRes);
    } else {
        document.getElementById("flex-container").innerHTML = "<h1>Technical Error Occurs</h1>";
    }
}

fetchChannelInfo(channelFetchUrl);

var channelInfo = (dataJson) => {
    if (dataJson.items.length > 0) {
        let items = dataJson.items;
        let title = items[0].snippet.title;
        let imgSrc = items[0].snippet.thumbnails.default.url;
        let subscribeCount = items[0].statistics.subscriberCount;
        document.getElementById("channelTitle").innerText = title;
        document.getElementById("channelImg").src = imgSrc;
        document.getElementById("channelSubTitle").innerText = `${subscribeCount} subscribers`;
        console.log(dataJson);
    } else {
        alert("No records found!")
    }
}

let channelPlayListItems = async (url) => {
    const response = await fetch(url);

    if (response.ok) {
        const json = await response.json();
        let div = document.createElement("div");
        div.className = "flex-item";
        let itemsArr = json.items;
        itemsArr.forEach(element => {
            let videoId = element.contentDetails.videoId;
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
    } else {
        document.getElementById("flex-container").innerHTML = "<h1>Technical Error Occurs</h1>";
    }

}

let channelPlayList = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
        const json = await response.json();
        let itemsArr = json.items;
        itemsArr.forEach(element => {
            let div = document.createElement("div");
            div.className = "flex-item";
            let playListId = element.id;
            let ahref = document.createElement("a");
            ahref.href = "#";
            let iframe = document.createElement("iframe");
            iframe.src = `http://www.youtube.com/embed/videoseries?list=${playListId}`;
            iframe.height = 250;
            iframe.width = 250;
            ahref.append(iframe);
            div.append(ahref);
            document.getElementById("flex-container").append(div);
        });
    } else {
        document.getElementById("flex-container").innerHTML = "<h1>Technical Error Occurs</h1>";
    }

}

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener('click', function () {
    searchContent = document.querySelector("#searchInput").value;
    if (searchContent) {
        let searchContentUrl = `${rootUrl}/search?part=snippet&q=${searchContent}&maxResults=50&type=video&key=${APIKEY}`;           
        searchItems(searchContentUrl);
    }
});

let searchItems = async (url) => {
    const response = await fetch(url);
    if (response.ok) {   
        document.getElementById("flex-container").innerHTML = "";    
        const json = await response.json();
        let div = document.createElement("div");
        div.className = "flex-item";
        let itemsArr = json.items;
        itemsArr.forEach(element => {
            let videoId = element.id.videoId;
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
        if(json.items.length){
            channelId = json.items[0].snippet.channelId
            channelFetchUrl = `${rootUrl}/channels?part=contentDetails,snippet,statistics,topicDetails,brandingSettings&id=${channelId}&key=${APIKEY}`;
            fetchChannelInfo(channelFetchUrl);           
        }
        
    } else {
        document.getElementById("flex-container").innerHTML = "<h1>Technical Error Occurs</h1>";
    }

}

let ulAttr = document.querySelector('#ulelm');
ulAttr.addEventListener('click', function (data) {
    document.getElementById("flex-container").innerHTML = "<h1>Loading...</h1>";
    let pageName = data.target.innerText.toLowerCase();
    switch (pageName) {
        case 'videos':
            channelPlayListItems(channelPlaylistItemsUrl)
            break;
        case 'playlist':
            channelPlayList(channelPlaylistUrl);
            break;
    }
    document.getElementById("flex-container").innerHTML = "";
});


channelPlayList(channelPlaylistUrl);