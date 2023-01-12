const ArtistDTO = require('./artist.dto');
const GenreDTO = require('./genre.dto');

module.exports = class TrackDTO {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.duration = data.duration;
        this.genre = data.genre ? new GenreDTO(data.genre) : null;
        this.artists = data.artists ? data.artists.map((a) => new ArtistDTO(a)) : null;
        // this.artists = data.artists?.map((a) => new ArtistDTO(a)) ?? null;
    }
};
