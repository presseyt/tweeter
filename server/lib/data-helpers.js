"use strict";

// Defines helper functions for saving and getting tweets, using mongodb

module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to db
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insert(newTweet, callback);
    },

    // Get all tweets in db
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        callback(err, tweets.sort((a,b)=>b.created_at - a.created_at));
      });
    },

    // Adds a like
    addLike: function(id, callback) {
      console.log('addLike was called', id);

      var ObjectID = require('mongodb').ObjectID;
      var objId = new ObjectID(id);

      db.collection("tweets").updateOne({"_id": objId}, {$inc: {likes: 1}}, callback);
      //database stuff
    },

    // Removes a like
    removeLike: function(id, callback) {
      console.log('removeLike was called', id);

      var ObjectID = require('mongodb').ObjectID;
      var objId = new ObjectID(id);

      db.collection("tweets").updateOne({"_id": objId}, {$inc: {likes: -1}}, callback);
      //database stuff
    }
  };
};
