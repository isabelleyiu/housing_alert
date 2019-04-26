const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

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

  User.associate = (models) => {
    User.hasOne(models.Phone, {
      sourceKey: 'uuid',
      foreignKey: 'userUUID',
      onDelete: 'cascade'
    })
  }

  // hash password before inserting into db
  User.beforeCreate((user, options, done) => {
    const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    user.password = hashedPassword
  })

  User.verifyPassword = function (password, hashedPassword, done, user) {
    bcrypt.compare(password, hashedPassword)
    .then(isMatch => {
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => console.log(err))
  }

  return User;
}

