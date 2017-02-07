(function() {
    function SongPlayer() {
        var SongPlayer = {};

        /**
        * @desc Buzz object audio file
        * @type {object}
        */

        var currentSong = null;
        var currentBuzzObject = null;


        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {object} song
        */

        var setSong = function(song) {
            if (currentBuzzObject){
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };


        /**
        * @function playSong
        * @desc Starts playing song and sets the playing state to true
        */

        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        }

        /**
        * @function Songplayer.play
        * @desc Called through Album.html on the play button ng-click and then through AlbumCtrl
        * @param {object} song
        */

        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };

        /**
        * @function SongPlayer.pause
        * @desc Called through Album.html on the pause button ng-click
        * @param {object} song
        */

        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
