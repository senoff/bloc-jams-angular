(function() {
    function SongPlayer($rootScope, Fixtures) {
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

        /**
        * @desc Current playback time (in second) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        /**
        * @desc Current volume
        * @type {Number
        */
        SongPlayer.volume = 0;


        SongPlayer.currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {object} song
        */
        var setSong = function(song) {
            if (SongPlayer.currentBuzzObject){
                SongPlayer.currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            SongPlayer.currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentBuzzObject.bind('timeupdate', function(){
                $rootScope.$apply(function(){
                    SongPlayer.currentTime = SongPlayer.currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
        };

        /**
        * @function playSong
        * @desc Starts playing song and sets the playing state to true
        */
        var playSong = function(song){
            SongPlayer.currentBuzzObject.play();
            SongPlayer.currentSong.playing = true;
        }

        var stopSong = function(song){
            SongPlayer.currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }

        /**
        * @function Songplayer.play
        * @desc Called through Album.html on the play button ng-click and then through AlbumCtrl
        * @param {object} song
        */
        SongPlayer.play = function(song) {
            if(SongPlayer.currentBuzzObject) {
                song = song || SongPlayer.currentSong;
                if (SongPlayer.currentSong !== song) {
                    setSong(song);
                    playSong(song);
                } else if (SongPlayer.currentSong === song) {
                    if (SongPlayer.currentBuzzObject.isPaused()) {
                        playSong();
                    }
                }
            } else {
                song = currentAlbum.songs[0];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function SongPlayer.pause
        * @desc Called through Album.html on the pause button ng-click
        * @param {object} song
        */

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            SongPlayer.currentBuzzObject.pause();
            song.playing = false;
        };

        SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            currentSongIndex = currentSongIndex % currentAlbum.songs.length;

            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        };

        /**
        * @function SongPlayer.previous
        * @desc Gets the index of the current song decrease it by 1
        * @param
        */

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (SongPlayer.currentBuzzObject){
                SongPlayer.currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.setVolume = function(volume){
            if (currentBuzzObject){
            currentBuzzObject.setVolume(volume);
            }
        };


        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentSongIndex = currentAlbum.songs.length - 1;
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        SongPlayer.secondsToMinutes = function(seconds, minutes){
            minutes = 0;
            minutes = Math.floor(seconds / 60);
            seconds = seconds % 60
        };

        SongPlayer.filterSecond = function(){
            if(SongPlayer.currentBuzzObject){
                return buzz.toTimer(SongPlayer.currentTime, false);
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
