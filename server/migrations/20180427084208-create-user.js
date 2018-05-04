'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      batch: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      attend_event: {
        type: Sequelize.STRING
      },
      meal_preference: {
        type: Sequelize.STRING
      },
      t_shirt_size: {
        type: Sequelize.STRING
      },
      contribution_amount: {
        type: Sequelize.INTEGER
      },
      payment_date: {
        type: Sequelize.DATE
      },
      paid_via: {
        type: Sequelize.STRING
      },
      confirmation_code: {
        type: Sequelize.STRING
      },
      family_members: {
        type: Sequelize.STRING
      },
      profile_photo: {
        type: Sequelize.STRING
      },
      spouse: {
        type: Sequelize.STRING
      },
      album_imgs: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};