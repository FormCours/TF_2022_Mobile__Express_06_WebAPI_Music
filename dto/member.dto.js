
class MemberDTO {
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.isAdmin = data.isAdmin;
    }
}


module.exports = {
    MemberDTO
};