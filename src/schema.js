import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} from 'graphql'

import Db from './db/db'

const User = new GraphQLObjectType({
    name: 'User',
    description: '微信用户信息',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                resolve(user) {
                    return user.id
                }
            },
            name: {
                type: GraphQLString,
                resolve(user) {
                    return user.name
                }
            },
            wxPhoto: {
                type: GraphQLString,
                resolve(user) {
                    return user.wxPhoto
                }
            },
            sex: {
                type: GraphQLInt,
                resolve(user) {
                    return user.sex
                }
            },
            userTasks: {
                type: new GraphQLList(UserTask),
                resolve(user) {
                    return user.getUserTasks()
                }
            },
            allTasks:{
              type: new GraphQLList(Task),
              resolve(user) {
                  return Db.models.task.findAll()
              }
            }
        }
    }
})

const Task = new GraphQLObjectType({
    name: 'Task',
    description: '任务列表信息',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                resolve(Task) {
                    return Task.id
                }
            },
            name: {
                type: GraphQLString,
                resolve(Task) {
                    return Task.name
                }
            },
            contentUrl: {
                type: GraphQLString,
                resolve(Task) {
                    return Task.contentUrl
                }
            },
            coverUrl: {
                type: GraphQLString,
                resolve(Task) {
                    return Task.coverUrl
                }
            },
            state: {
                type: GraphQLInt,
                resolve(Task) {
                    return Task.state
                }
            },
            shareCount: {
                type: GraphQLInt,
                resolve(Task) {
                    return Task.shareCount
                }
            },
            clickCount: {
                type: GraphQLInt,
                resolve(Task) {
                    return Task.clickCount
                }
            },
            shareScore: {
                type: GraphQLInt,
                resolve(Task) {
                    return Task.shareScore
                }
            },
            clickScore: {
                type: GraphQLInt,
                resolve(Task) {
                    return Task.shareScore
                }
            },
            allUserTasks: {
                type: new GraphQLList(UserTask),
                async resolve(Task) {
                    return Task.getUserTasks()
                }
            }
        }
    }
})

const UserTask = new GraphQLObjectType({
    name: 'UserTask',
    description: '用户任务列表信息',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                resolve(userTask) {
                    return userTask.id
                }
            },
            state: {
                type: GraphQLInt,
                resolve(userTask) {
                    return userTask.state
                }
            },
            shareCount: {
                type: GraphQLInt,
                resolve(userTask) {
                    return userTask.shareCount
                }
            },
            clickCount: {
                type: GraphQLInt,
                resolve(userTask) {
                    return userTask.clickCount
                }
            },
            task:{
              type: Task,
              resolve(userTask){
                return userTask.getTask()
              }
            },
            user:{
              type: User,
              resolve(userTask){
                return userTask.getUser()
              }
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
        return {
            user: {
                type: User,
                description: '获取一个用户信息',
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, args) {
                    return Db.models.user.findOne({
                        where: args
                    })
                }
            },
            users: {
                type: new GraphQLList(User),
                description: '获取多个用户信息',
                args: {
                    id: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.models.user.findAll({
                        where: args
                    })
                }
            },
            tasks: {
                type: new GraphQLList(Task),
                description: '任务列表',
                args: {
                    id: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.models.task.findAll({
                        where: args
                    })
                }
            },
            taskBus: {
                type: new GraphQLList(Task),
                description: '任务列表',
                args: {
                    id: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.models.userTask.findAll({
                        where: args
                    })
                }
            }
        }
    }
})

const Schema = new GraphQLSchema({
    query: Query
})

export default Schema
