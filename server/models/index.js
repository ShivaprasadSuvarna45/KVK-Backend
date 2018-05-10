const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = 'production';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize('postgres://igbowcdjeurhgd:e896caf072dfa8685ba083ac72e5352570368cd0bf2ee383eded31a05b47d931@ec2-23-23-180-121.compute-1.amazonaws.com:5432/d2k6ajc030e3lm');
  
  //sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize('postgres://igbowcdjeurhgd:e896caf072dfa8685ba083ac72e5352570368cd0bf2ee383eded31a05b47d931@ec2-23-23-180-121.compute-1.amazonaws.com:5432/d2k6ajc030e3lm');
  //sequelize = new Sequelize(
  //  config.database, config.username, config.password, config
  //);
}


fs
  .readdirSync(__dirname)
  .filter((file) =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
