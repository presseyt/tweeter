"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("test").insert(newTweet, callback);
    },

    // Get all tweets in `db`
    getTweets: function(callback) {
      db.collection("test").find().toArray((err, tweets) => {
        callback(err, tweets.sort((a,b)=>b.created_at - a.created_at));
      });
    }
  };
};
