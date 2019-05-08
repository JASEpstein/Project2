var bcrypt = require("bcryptjs");

module.exports = function(seqeulize, DataTypes) {
  var Accounts = seqeulize.define("Accounts", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 2]
      }
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
    accountKey: {
      primarykey: true,
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [8]
      }
    }
  });

  //generating a hash using bcrypt
  Accounts.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  //check if password is valid
  Accounts.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.accountKey);
  };
  return Accounts;
};
