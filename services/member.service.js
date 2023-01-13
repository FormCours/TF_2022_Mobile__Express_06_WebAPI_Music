const { MemberDTO } = require('../dto/member.dto');
const db = require('../models');

const memberService = {

    add: async (data) => {
        if (!data) throw new Error('Data is required !');

        const member = await db.Member.create(data);
        return new MemberDTO(member);
    },

    getHashPassword: async (email) => {
        const member = await db.Member.findOne({
            where: { email },
            attributes: ['hashPassword']
        });

        return member?.hashPassword;
    },

    getByEmail: async (email) => {
        const member = await db.Member.findOne({
            where: { email }
        });

        return new MemberDTO(member);
    }

};

module.exports = memberService;