var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    this.getData = function(artist, search) {
    	var dfd = $q.defer()
    	  $http({
    	 	method: 'JSONP',
    	 	url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK&entity=' + search
		}).then(function(response) {
			console.log(response);
			var response = response.data.results;
			var songData = [];
			for (var i = 0; i < response.length; i++) {
				var data = response[i];
				 var obj = {
					AlbumArt: data.artworkUrl100,
					Artist: data.artistName,
					Song: data.trackName,
					Collection: data.collectionName,
      				CollectionPrice: data.collectionPrice,
      				Play: data.previewUrl,
      				Type: data.kind
				}
			  songData.push(obj);
			}
			dfd.resolve(songData);
		})
		return dfd.promise;
	}



	
	});	
