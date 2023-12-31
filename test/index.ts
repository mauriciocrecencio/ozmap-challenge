// @ts-nocheck

import chai,{ expect } from 'chai';
import app from '../src/index'
import { userNotFoundSchema, userSchema } from '../test-utils/schemas';
import {  beforeEach } from 'mocha';
import { users } from '../test-utils/user-factory';

const chaiHttp = require('chai-http')
const chaiJson = require('chai-json-schema')

chai.use(chaiHttp);
chai.use(chaiJson);

describe('Testes da aplicaçao',  () => {
    beforeEach(done => {
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

    it('deveria conter uma mensagem de usuário não encontrado', function (done) {
        chai.request(app)
        .delete('/user/usuarioQualquer')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.contain({message: 'User not found'});
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

    // Essa função deveria ser utilizado em um 'before' antes do teste
    it('deveria cadastrar 5 usuários no banco de dados', function(done) {
        var count = 0;
        var length = users.length;
    
        if (length === 0) {done();}
    
        users.forEach(function (rec) {
            chai.request(app)
                .post('/user')
                .send(rec)
                .end(function (err, res) {
                    if (err) {
                        console.error('Delete keywords err: ' + err.message);
                        this.skip();
                    } else {
                        count++;
                        if (count === length) {done();}
                        }
                });
            });
        });

    it('deveria ser uma lista com pelo menos 5 usuarios',  function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.users.length).to.be.greaterThanOrEqual(5)
            done();
        });
    });

    it('deveria alterar a idade do usuário James de 44 para 100',  function (done) {
        chai.request(app)
        .patch('/user/James')
        .send({idade: 100, nome: "James"})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.contain({idade: 100})
            done();
        });
    });

    it('deveria alterar o nome do usuário James para Bond',  function (done) {
        chai.request(app)
        .patch('/user/James')
        .send({nome: "Bond"})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.contain({nome: 'Bond'})
            done();
        });
    });

    it('o usuário Bond deveria estar com o nome Bond e com 100 anos',  function (done) {
        chai.request(app)
        .get('/user/Bond')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.contain({nome: 'Bond', idade: 100})
            done();
        });
    });


})