const axios = require('axios');

exports.getP1 = async(req, res) => {
    var key = [
        'AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc',
        'AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc'
    ];

    var randomKey = Math.floor(Math.random() * key.length);

    var arr = [];
    var channelId = "";

    await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${req.params.id}&key=${key[randomKey]}`).then((response) => {
        var data = response.data.items[0];
        var snippet = data.snippet;
        var statistics = data.statistics;

        var videoId = data.id;
        var title = snippet.title;
        var description = snippet.description;
        var channelTitle = snippet.channelTitle;
        channelId = snippet.channelId;
        var tags = snippet.tags;
        var viewCount = statistics.viewCount;
        var loveCount = statistics.likeCount;
        var disloveCount = statistics.dislikeCount;

        var jsonVd = {
            id: videoId,
            title: title,
            description: description,
            channelName: channelTitle,
            tags: tags,
            viewCount: viewCount,
            loveCount: loveCount,
            disloveCount: disloveCount
        }

        arr.push(jsonVd);
    }).catch((error) => {
        console.log(error);
    });

    await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${key[randomKey]}`).then((response) => {
        var data = response.data.items[0];
        var snippet = data.snippet;

        var avt = snippet.thumbnails.high.url;

        var jsonObj = {
            channelId: channelId,
            avatar: avt
        }

        arr.push(jsonObj);


    }).catch((error) => {
        console.log(error);
    });

    await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&maxResults=10&relatedToVideoId=${req.params.id}&type=video&key=${key[randomKey]}`).then((response) => {
        var data = response.data;

        var jsonObj = {
            data: data
        }

        arr.push(jsonObj);


    }).catch((error) => {
        console.log(error);
    });

    var resData = {
        video: arr[0],
        channel: arr[1],
        related: arr[2]
    }

    res.send(resData);
}