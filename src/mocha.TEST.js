import supertest from 'supertest';
import { expect } from 'chai';
import mocha from 'mocha';
import { app } from './express.js';

const request = supertest(app)

describe('Products tests', ()=>{
    it('Should response with status 200', async (done)=>{
        request
        .get('/content/home')
        .expect(200);
        done()
    })
    it('Should return an object ', async (done) => {
        const response = await request.get('/content/home');
        expect(response.body).to.be.an('object');
        done()
    });
})
