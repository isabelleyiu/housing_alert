const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000)
  });

  // Session.associate = (models) => {
  //   Session.belongsTo(models.User, {
  //     foreignKey: 'userUUID'
  //   })
  // }

  return Session;
};