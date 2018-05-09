'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    batch: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    description: DataTypes.STRING,
    attend_event: DataTypes.STRING,
    meal_preference: DataTypes.STRING,
    t_shirt_size: DataTypes.STRING,
    contribution_amount: DataTypes.INTEGER,
    payment_date: DataTypes.DATE,
    paid_via: DataTypes.STRING,
    confirmation_code: DataTypes.STRING,
    family_members: DataTypes.STRING,
    profile_photo: DataTypes.STRING,
    spouse: DataTypes.STRING,
    album_imgs: DataTypes.ARRAY(DataTypes.TEXT)
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};