module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    Posts.associate = (models) => {
      Posts.belongsTo(models.Users, {
        foreignKey: 'userId',
        allowNull: false,
      });
    };
  
    return Posts;
  };