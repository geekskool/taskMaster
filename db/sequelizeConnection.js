const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:admin@192.168.0.108:5432/taskmanager');

/* sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
*/

const User = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING
  },
  passwordHash: {
    type: Sequelize.STRING
  }
});

User.sync()

const Task = sequelize.define('task', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  taskStatus: {
    type: Sequelize.STRING
  },
  createdDate: {
    type: Sequelize.STRING
  },
  dueDate: {
    type: Sequelize.STRING
  }
});




const Comment = sequelize.define('comment', {
  description: {
    type: Sequelize.STRING
  },
  timeStamp: {
    type: Sequelize.DATE
  },
});
//Comment.belongsTo(User, {foreignKey: 'UserId'})

Task.hasMany(Comment, {as:'TaskId'})
Task.belongsTo(User, {foreignKey: 'AssignedTo'})
Task.belongsTo(User, {foreignKey: 'AssignedBy'})

Task.sync()
Comment.sync()
