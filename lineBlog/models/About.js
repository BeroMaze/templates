module.exports = function(sequelize, DataTypes){
  var About = sequelize.define('About', {
    aboutTop:           DataTypes.TEXT,
    aboutMiddleLeft:    DataTypes.TEXT,
    aboutMiddleRight:   DataTypes.TEXT,
    aboutBottom:        DataTypes.TEXT
  });
  return About;
};
