class ArtistDTO {

    // Props
    id;
    pseudo;
    firstName;
    lastName;
    birthday;
    country;

    // Ctor
    constructor(data) {
        this.id = data.id;
        this.pseudo = data.pseudo;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.birthday = data.birthday;
        this.country = data.country;
    }
};

module.exports = {
    ArtistDTO
};