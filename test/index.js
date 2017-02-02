import supertest from 'supertest'
import {
    assert,
    should,
    expect
} from 'chai'

import '../src/index.js'

const baseUrl = 'http://localhost:3000',
    api = supertest(baseUrl)

describe('user接口', () => {
    it('应该返回200状态且data为空', done => {
        api.get('/graphql?query={user(id:"4"){name}}')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property('data')
                expect(res.body.data).to.not.equal(null)
                expect(res.body.data).to.have.property('user')
                expect(res.body.data.user).to.equal(null)
                done()
            })
    })
    it('应该返回200状态且data不为空', done => {
        api.get('/graphql?query={user(id:"1"){name}}')
            .set('Accept', 'application/json')
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
})
