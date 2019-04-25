const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha:  {
          args: true,
          msg: 'Please only enter letters for First Name'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha:  {
          args: true,
          msg: 'Please only enter letters for Last Name'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please provide a valid email'
        }
      }
    }, 
    householdSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Please enter a number for Household Size'
        }
      }
    },
    householdIncome: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Please enter a number for Household Income'
        }
      }
    },
    SRO: {
      type: DataTypes.BOOLEAN
    },
    studio: {
      type: DataTypes.BOOLEAN
    },
    oneBedroom: {
      type: DataTypes.BOOLEAN
    },
    twoBedroom: {
      type: DataTypes.BOOLEAN
    }
  });

  Profile.associate = (models) => {
    Profile.hasOne(models.User, {
      sourceKey: 'uuid',
      foreignKey: 'profileUUID',
      onDelete: 'cascade'
    })
  }

  return Profile;
}

