"use strict";
// import the data

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const top50_data = require("./data/top50.js").top50_data; // note: it's actually only 15 waiting for the file update
// function to get the rank
function findSong(target, target_val, list) {
  // target:target propery; target_val: the target value desired; list: list of data to find
  // return list of songs satisfied
  // list expected to be top50_data
  // if found return the song
  // if not found return undefined
  let result = [];
  list.forEach((element) => {
    //console.log(element[`${target}`]);
    if (`${element[`${target}`]}`.toLowerCase() === target_val.toLowerCase()) {
      // assuming the input will always be string integer
      // if parseInt gives Nan, then it will evaluate to false
      result.push(element);
    }
  });
  return result;
}
function findSongsOfPopular(list) {
  // return the most popular artist
  // if artist have the same number, then chose the first one
  // e.g. {
  //    Drakery : 3;
  //    K : 1;
  //}
  let result = ["", -1]; // stores the name of the most popular artist and the count
  let list_count = {};
  //            example:
  //                        {
  //                            artist:{count, song}
  //                         }
  list.map((ele) => {
    let a = ele.artist; // name of current artist
    if (list_count[a] == undefined) {
      // not existing then create with a count = 1
      list_count[a] = { count: 1, songs: [] };
    } else {
      // if exists, increment count
      list_count[a].count++;
    }
    // push song to the list
    list_count[a].songs.push(ele);
    // update result if larger count appears
    if (result[1] < list_count[a].count) {
      result = [a, list_count[a]];
    }
  });
  //let song_list = findSong("artist", result[0], list);
  //console.log(song_list);
  return list_count[result[0]].songs; // return the most popular artist
}

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  // ========== top50: get all song data ==========
  .get("/top50", (req, res) => {
    res.status(200).json({ status: 200, data: top50_data });
  })
  // ========== top50/song/:songRank ==========
  //    get song at specific rank
  //    if rank doesn't exist return 404
  .get("/top50/song/:songRank", (req, res) => {
    // get the param
    // if the rank is not in the range
    let sR = req.params.songRank;
    let s = findSong("rank", sR, top50_data); // when requesting rank 1, it's actually at rank 0
    if (s === []) {
      // empty list
      res.status(404).json({ status: 404, message: "Song not found" });
    } else {
      res.status(200).json({ status: 200, data: s });
    }
  })
  // ========== popular-artist ==========
  .get("/top50/popular-artist", (req, res) => {
    let d = findSongsOfPopular(top50_data);
    res.status(200).json({ status: 200, data: d });
  })
  // ========== artists ==========
  .get("/top50/artist", (req, res) => {
    // get all the artists
    let arr_artist = top50_data.map((ele) => {
      return ele.artist;
    });

    // use set to remove duplicates
    let s_artist = new Set(arr_artist);
    res.status(200).json({ status: 200, data: [...s_artist] });
  })
  // ========== specific artist ==========
  .get("/top50/artist/:artistName", (req, res) => {
    let a = req.params.artistName;
    // get all the artists
    let a_songs = findSong("artist", a, top50_data);
    res.status(200).json({ status: 200, data: a_songs });
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
