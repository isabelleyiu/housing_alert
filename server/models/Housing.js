const Sequelize = require('sequelize');
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Housing = sequelize.define('Housing', {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      isUnique: true
    },
    unitSummaries: {
      type: DataTypes.JSONB
    },
    prioritiesDescriptor: {
      type: DataTypes.JSONB
    },
    listingID: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true
    },
    Tenure: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Units_Available: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Building_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Building_Street_Address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Building_City: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Building_State: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Building_Zip_Code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastModifiedDate : {
      type: DataTypes.DATE
    },
    Application_Due_Date : {
      type: DataTypes.DATE
    },
    Building_URL: {
      type: DataTypes.STRING
    },
    Lottery_Results_Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Lottery_Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Lottery_Results: {
      type: DataTypes.BOOLEAN
    },
    Accepting_Online_Applications: {
      type: DataTypes.BOOLEAN
    },
    Reserved_community_minimum_age: {
      type: DataTypes.INTEGER
    },
    hasWaitlist: {
      type: DataTypes.BOOLEAN
    },
    imageURL: {
      type: DataTypes.STRING
    }
  });

  return Housing;
}
