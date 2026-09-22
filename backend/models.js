const { sequelize, DataTypes } = require('./database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  business_category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gstin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cgstin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  available_credits: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_premium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  permissions_granted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  two_factor_secret: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

const Campaign = sequelize.define('Campaign', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  campaign_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  recipients_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  delivered_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  read_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

User.hasMany(Campaign);
Campaign.belongsTo(User);

module.exports = { User, Campaign };
