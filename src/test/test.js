import mongoose from 'mongoose'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'

let should = chai.should();
chai.use(chaiHttp);

describe('lexical density', () => {
    describe('GET /complexity', () => {
        it('it should calculate total lexical density', (done) => {
            chai.request(server)
                .post('/complexity')
                .send({
                    input: 'kim loves going to the cinema'
                })
                .end((err, res) => {
                  res.body.data.overall_ld.should.equal('0.67')
                  res.should.have.status(200);
                  done()
                })
        })
    })
  })
