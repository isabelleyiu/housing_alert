const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      isUnique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
      validate: {
        isPhoneNumber(value) { 
          const allTenNum = /^\d{10}$/.test(value);
          if(!allTenNum) {
            throw new Error('Phone number has to be 10 digits');
          }
        }
      }
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
  return User;
}