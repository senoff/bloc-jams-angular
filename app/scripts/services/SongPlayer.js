(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        /**
        * @desc Get the album from Fixtures.js
        * @type {object}
        */
        var currentAlbum = Fixtures.getAlbum();


        /**
        / @fucntion getSongIndex
        / @desc returns the index number of the currently playing song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
        * creating a SongPlayer.currentSong object
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Buzz object audio file
        * @type {object}
        */

        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {object} song
        */

        var setSong = function(song) {
            if (currentBuzzObject){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };


        /**
        * @function playSong
        * @desc Starts playing song and sets the playing state to true
        */
        var playSong = function(song){
            currentBuzzObject.play();
            SongPlayer.currentSong.playing = true;
        }

        /**
        * @function Songplayer.play
        * @desc Called through Album.html on the play button ng-click and then through AlbumCtrl
        * @param {object} song
        */

        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong();
                }
            }
        };

        /**
        * @function SongPlayer.pause
        * @desc Called through Album.html on the pause button ng-click
        * @param {object} song
        */

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        / @function
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
        }

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
