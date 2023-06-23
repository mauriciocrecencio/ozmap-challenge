//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)
// @ts-nocheck

import chai,{ expect } from 'chai';
import app from '../src/index'
import { userNotFoundSchema, userSchema } from '../test-utils/schemas';
import UsersRepository from '../src/repositories/users/UsersRepository';
import {  beforeEach } from 'mocha';
import { users } from '../test-utils/user-factory';

const chaiHttp = require('chai-http')
const chaiJson = require('chai-json-schema')
chai.use(chaiHttp);
chai.use(chaiJson);

describe('Testes da aplicaçao',  () => {
    beforeEach(done => {
        // let repository = new UsersRepository()
        // repository.repository.clear()
        // users.map(user => repository.create(user))
        setTimeout(done, 500)
    });

    it('o servidor esta online', function (done) {
        chai.request(app)
        .get('/')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
        });
    });

    it('deveria ser uma lista vazia de usuarios', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.eql([]);
        done();
        });
    });

    it('deveria criar o usuario raupp', function (done) {
        chai.request(app)
        .post('/user')
        .send({nome: "raupp", email: "jose.raupp@devoz.com.br", idade: 35})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
        });
    });
    //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste

    it('o usuario naoExiste não existe no sistema', function (done) {
        chai.request(app)
        .get('/user/naoExiste')
        .end(function (err, res) {
            expect(res).to.have.status(404);
            expect(res.body).to.be.jsonSchema(userNotFoundSchema);
            done();
        });
    });

    it('o usuario raupp existe e é valido', function (done) {
        chai.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('deveria excluir o usuario raupp', function (done) {
        chai.request(app)
        .delete('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('o usuario raupp não deve existir mais no sistema', function (done) {
        chai.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.jsonSchema(userNotFoundSchema);
            done();
        });
    });

    // before(done => {
    //     let repository = new UsersRepository()
    //     users.map(user => repository.create(user))
    //     done()
    // });
    it('deveria ser uma lista com pelo menos 5 usuarios',  function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).length.to.be.greaterThan(5)
            done();
        });
    });
})