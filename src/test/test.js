import mongoose from 'mongoose'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'
import { longText } from './constants'
let should = chai.should();
chai.use(chaiHttp);

describe('lexical density', () => {
    describe('POST /complexity', () => {
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

        it('it should return 400 when input body is more than 1000 char', (done) => {
            chai.request(server)
                .post('/complexity')
                .send({
                    input: longText
                })
                .end((err, res) => {
                  res.should.have.status(400);
                  res.text.should.equal('input too long');
                  done()
                })
        })

        it('it should return 400 when input body is more than 100 words', (done) => {
            chai.request(server)
                .post('/complexity')
                .send({
                    input: longText
                })
                .end((err, res) => {
                  res.should.have.status(400);
                  res.text.should.equal('input too long');
                  done()
                })
        })
    })
  })
