const request = require('supertest');

const server = require("./server.js");
const db = require('../data/dbConfig.js');

beforeEach(() => {
    return db.migrate.rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run())
})

describe("server", function () {
    describe("GET/", function () { 
        
      it("should return 200 OK", function () {
        return request(server)
        .get("/")
        .then(res => {
            console.log(res.body)
        expect(res.status).toBe(200);
            });
        });
        
      it("should return Silent auction api is up", function () {
        return request(server)
        .get("/")
        .then(res => {
        expect(res.body).toMatchObject({ api: 'Silent auction api is up' });
            });
         });
    });

 });

 describe("/api/auth/", function () {

    describe("auth/register", function () { 
        
      it("should return 201 created", function () {
        return request(server)
        .post("/api/auth/register")
        .send({username: 'Jim112', password: 'password', first_name: 'Jim', last_name:"Slim" ,email: 'testing@nice.com',})
        .then(res => {
            console.log(res.body)
        expect(res.status).toBe(201);
            });
        });
        
      it("should return Silent auction api is up", function () {
        return request(server)
        .get("/")
        .then(res => {
        expect(res.body).toMatchObject({ api: 'Silent auction api is up' });
            });
         });
    });
 
 });