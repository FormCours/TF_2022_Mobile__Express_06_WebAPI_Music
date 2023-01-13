class GenreDTO {
    // Ctor
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
    }
};

class GenreDetailDTO {
    // Ctor
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.desc = data.desc;
    }
}


module.exports = {
    GenreDTO,
    GenreDetailDTO
};