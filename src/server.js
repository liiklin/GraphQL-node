import express from 'express'
import session from 'express-session'
import graphqlHTTP from 'express-graphql'
import schema from './schema'

let app = express()
let PORT = 3000

//session
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    }
}))

app.use('/graphql', graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true
}))

let server = app.listen(PORT, function() {
    let host = server.address().address
    let port = server.address().port
    console.log('GraphQL listening at http://%s:%s', host, port)
})
