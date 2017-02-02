import Sequelize from 'sequelize'
import _ from 'lodash'

const Conn = new Sequelize(
    'app',
    'admin',
    'mypass', {
        dialect: 'mysql',
        host: 'localhost',
        logging: function(){},
        benchmark: true,
        omitNull: true
    }
)

const User = Conn.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    wxPhoto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sex: {
        type: Sequelize.INTEGER,
        validate: {
            isInt: true
        }
    }
}, {
    freezeTableName: true,
    tableName: 'wx_user',
    timestamps: false
})

const Task = Conn.define('task', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contentUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    coverUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    shareCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true
        }
    },
    clickCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true
        }
    },
    shareScore: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true
        }
    },
    clickScore: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true
        }
    }
}, {
    freezeTableName: true,
    tableName: 'wx_task',
    timestamps: false
})

const UserTask = Conn.define('userTask', {
    state: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    shareCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true
        }
    },
    clickCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true
        }
    },
    taskId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, {
    freezeTableName: true,
    tableName: 'wx_taskbus',
    timestamps: false
})

// Relations
User.hasMany(UserTask)
Task.hasMany(UserTask)
UserTask.belongsTo(User)
UserTask.belongsTo(Task)

Conn.sync()

export default Conn
