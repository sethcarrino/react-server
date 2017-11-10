// write a funtion to retrieve a blob of json
// make an ajax request! USe the 'fetch' function

// http://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums() {
// 	fetch('http://rallycoding.herokuapp.com/api/music_albums')
// 		.then(res => res.json())
// 		.then(json => console.log(json));
// }

// ES2017

const fetchAlbums = async () => {
	const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
	const json = await res.json()
	
	console.log(json);
}

fetchAlbums();