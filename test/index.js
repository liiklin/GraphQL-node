import supertest from 'supertest'
import {
    assert,
    should,
    expect
} from 'chai'

import '../src/index.js'

const baseUrl = 'http://localhost:3000',
    api = supertest(baseUrl)

describe('graphql接口', () => {
    it('应该返回200状态且user为空', done => {
        api.post('/graphql')
            .set('Content-Type', 'application/graphql')
            .set('Accept', 'application/json')
            .send(`
              {
                user(id:"1"){
                  name
                }
              }
              `)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property('data')
                expect(res.body.data).to.not.equal(null)
                expect(res.body.data).to.have.property('user')
                expect(res.body.data.user).to.equal(null)
                done()
            })
    })
    it('应该返回200状态且user不为空', done => {
        api.post('/graphql')
            .set('Content-Type', 'application/graphql')
            .set('Accept', 'application/json')
            .send(`
            {
              user(id:"ot5hAwk0kFP5vdbo1QVYVr_YeMjE"){
                name
              }
            }
            `)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property('data')
                expect(res.body.data).to.not.equal(null)
                expect(res.body.data).to.have.property('user')
                expect(res.body.data.user).to.not.equal(null)
                expect(res.body.data.user).to.have.property('name')
                expect(res.body.data.user.name).to.not.equal(null)
                done()
            })
    })
    it('应该返回200状态且users是数组', done => {
        api.post('/graphql')
            .set('Content-Type', 'application/graphql')
            .set('Accept', 'application/json')
            .send(`
            {
              users{
                name
              }
            }
            `)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property('data')
                expect(res.body.data).to.not.equal(null)
                expect(res.body.data).to.have.property('users')
                expect(res.body.data.users).to.not.equal(null)
                done()
            })
    })
})
