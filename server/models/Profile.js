const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true,
      }
    }, 
    householdSize: {
      type: DataTypes.INTEGER
    },
    householdIncome: {
      type: DataTypes.INTEGER
    },
    SRO: {
      type: DataTypes.BOOLEAN
    },
    Studio: {
      type: DataTypes.BOOLEAN
    },
    OneBedroom: {
      type: DataTypes.BOOLEAN
    },
    TwoBedroom: {
      type: DataTypes.BOOLEAN
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
  return Profile;
}

