const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  })

  // User.associate = (models) => {
  //   User.hasOne(models.Profile, {
  //     foreignKey: "profileUUID",
  //     onDelete: "cascade"
  //   })
  // }

  return User;
}