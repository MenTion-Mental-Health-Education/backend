module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
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
  
    Comments.associate = (models) => {
      Comments.belongsTo(models.Users, {
        foreignKey: 'userId',
        allowNull: false,
      });
      Comments.belongsTo(models.Posts, {
        foreignKey: 'postId',
        allowNull: false,
      });
    };
  
    return Comments;
  };