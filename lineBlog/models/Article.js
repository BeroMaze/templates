module.exports = function(sequelize, DataTypes){
  var Article = sequelize.define('Article', {
    // id:               DataTypes.INT,
    title:            DataTypes.STRING,
    publishedOn:      DataTypes.DATE,
    category:         DataTypes.STRING,
    img:              DataTypes.STRING,
    miniDescription:  DataTypes.TEXT,
    body:             DataTypes.TEXT
  });
  return Article;
};
