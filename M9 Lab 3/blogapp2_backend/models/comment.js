const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  parentCommentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Comments',
      key: 'id',
    },
    defaultValue: null,
  },
  likes: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
});

// Association
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = Comment;
