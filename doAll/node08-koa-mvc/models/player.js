const { STRING } = require('sequelize');
// 用户模型
module.exports = {
    schema: {
        name: STRING(32)
    },
    options: {
        timestamps: false
    }
}