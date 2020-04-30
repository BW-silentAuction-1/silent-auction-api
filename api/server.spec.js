const request = require('supertest');

const server = require("./server.js");
const db = require('../data/dbConfig.js');

beforeEach(() => {
    return db.migrate.rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run())
})

// describe("server", function () {
//     describe("GET/", function () { 
        
//       it("should return 200 OK", function () {
//         return request(server)
//         .get("/")
//         .then(res => {
//             console.log(res.body)
//         expect(res.status).toBe(200);
//             });
//         });
        
//       it("should return Silent auction api is up", function () {
//         return request(server)
//         .get("/")
//         .then(res => {
//         expect(res.body).toMatchObject({ api: 'Silent auction api is up' });
//             });
//          });
//     });

//  });

//  describe("/api/auth/", function () {

//     describe("/api/auth/register", function () { 
        
//       it("should return 201 created", function () {
//         return request(server)
//         .post("/api/auth/register")
//         .send({username: 'Jim112', password: 'password', first_name: 'Jim', last_name:"Slim" ,email: 'testing@nice.com',})
//         .then(res => {
//             console.log(res.body)
//         expect(res.status).toBe(201);
//             });
//         });
        
//       it("should return message and 400 when data posted is incomplete", function () {
//         return request(server)
//         .post("/api/auth/register")
//         .send({username: 'Jim112',  first_name: 'Jim', last_name:"Slim" ,email: 'testing@nice.com',})
//         .then(res => {
//         expect(res.body.message).toBe('Missing one of the required fields!' );
//         expect(res.status).toBe(400);
//             });
//          });
//     });

//         describe("/api/auth/login", function () { 
        
//       it("should return a token on logging in", async () => {
//         const register = await request(server)
//         .post("/api/auth/register")
//         .send({username: 'Jim112', password: 'password', first_name: 'Jim', last_name:"Slim" ,email: 'testing@nice.com',})

//         const login = await request(server)
//         .post('/api/auth/login')
//         .send({username: 'Jim112', password: 'password'})
//         .then(res => {
//           expect(res.body).toHaveProperty('token')
//               });

//     });

//         it("should return a failure message when login is incorrect", async () => {

//           const login = await request(server)
//           .post('/api/auth/login')
//           .send({username: 'Cheese', password: 'password'})
//           .then(res => {
//           expect(res.body.message).toBe('Error Logging in!')
//                 });

//   });
 
//  });


// });

// describe("api/users/profile", function () { 

//   describe("GET/", function () { 

//   it("GET should return an error message and status 403 when no authorization passed", async () => {

//     const res = await request(server)
//     .get('/api/users/profile')
//     .then(res => {
//       expect(res.body.error).toBe('You must be logged in to do that.')
//       expect(res.status).toBe(403);
//           });

// });

//     it("GET should return user profile info when successful", async () => {

//       const register = await request(server)
//         .post("/api/auth/register")
//         .send({username: 'Jim112', password: 'password', first_name: 'Jim', last_name:"Slim" ,email: 'testing@nice.com',})

//         const login = await request(server)
//         .post('/api/auth/login')
//         .send({username: 'Jim112', password: 'password'})

//         const profile = await request(server)
//         .get('/api/users/profile')
//         .set('authorization', login.body.token)
//         .then(res => {
//           expect(res.body).toHaveProperty('username','Jim112')
//           expect(res.body).toHaveProperty('first_name','Jim')
//           expect(res.body).toHaveProperty('last_name','Slim')
//           expect(res.body).toHaveProperty('email','testing@nice.com')
//           expect(res.body).toHaveProperty('auctions')
//           expect(res.body).toHaveProperty('bids')
//           expect(res.status).toBe(200);
//               });
// });
// });
//      describe("DELETE/", function () { 
//   it("should return error if not authorized", async () => {

//   const register = await request(server)
//     .post("/api/auth/register")
//     .send({username: 'Jim112', password: 'password', first_name: 'Jim', last_name:"Slim" ,email: 'testing@nice.com',})

//     const login = await request(server)
//     .post('/api/auth/login')
//     .send({username: 'Jim112', password: 'password'})

//     const profile = await request(server)
//     .delete('/api/users/profile')
//     .then(res => {
//       expect(res.body.error).toBe('You must be logged in to do that.')
//       expect(res.status).toBe(403);
//           });
//       });

//       it("should delete user profile when successful", async () => {

//         const register = await request(server)
//           .post("/api/auth/register")
//           .send({username: 'Jim112', password: 'password', first_name: 'Jim', last_name:"Slim" ,email: 'testing@nice.com',})
      
//           const login = await request(server)
//           .post('/api/auth/login')
//           .send({username: 'Jim112', password: 'password'})
      
//           const profile = await request(server)
//           .delete('/api/users/profile')
//           .set('authorization', login.body.token)
//           .then(res => {
//             expect(res.status).toBe(200);
//             expect(res.body.message).toBe('User deleted');
//                 });
//             });

//     });

//     describe("PUT/", function () { 
//       it("should return error if user tries to change ID", async () => {

//         const register = await request(server)
//           .post("/api/auth/register")
//           .send({username: 'Jim112', password: 'password', first_name: 'Jim', last_name:"Slim" ,email: 'testing@nice.com',})
      
//           const login = await request(server)
//           .post('/api/auth/login')
//           .send({username: 'Jim112', password: 'password'})
      
//           const put = await request(server)
//           .put('/api/users/profile')
//           .send({id: '123',email: 'putting@test.com',})
//           .set('authorization', login.body.token)
//           .then(res => {
//             expect(res.body.message).toBe("Can't change user ID")
//             expect(res.status).toBe(401);
//                 });

//             });
      
//       it("should change user profile info when successful", async () => {

//         const register = await request(server)
//           .post("/api/auth/register")
//           .send({username: 'Jim112', password: 'password', first_name: 'Jim', last_name:"Slim" ,email: 'testing@nice.com',})
      
//           const login = await request(server)
//           .post('/api/auth/login')
//           .send({username: 'Jim112', password: 'password'})
      
//           const put = await request(server)
//           .put('/api/users/profile')
//           .send({username: 'Jom123',email: 'putting@test.com',})
//           .set('authorization', login.body.token)

//           const profile = await request(server)
//           .get('/api/users/profile')
//           .set('authorization', login.body.token)
//           .then(res => {
//             expect(res.body).toHaveProperty('username','Jom123')
//             expect(res.body).toHaveProperty('email','putting@test.com')
//             expect(res.status).toBe(200);
//                 });



//             });
//     });
// });


describe("api/auctions/", function () { 

  describe("GET/", function () { 

  it("GET should return an error message and status 403 when no authorization passed", async () => {

    const res = await request(server)
    .get('/api/auctions')
    .then(res => {
      expect(res.body.error).toBe('You must be logged in to do that.')
      expect(res.status).toBe(403);
          });

});

    it("GET should return auction list when successful", async () => {

        const login = await request(server)
        .post('/api/auth/login')
        .send({username: 'Test2', password: 'password'})

        const profile = await request(server)
        .get('/api/auctions')
        .set('authorization', login.body.token)
        .then(res => {
          expect(res.body[0]).toHaveProperty('username')
          expect(res.body[0]).toHaveProperty('name')
          expect(res.body[0]).toHaveProperty('item_description')
          expect(res.body[0]).toHaveProperty('item_price')
          expect(res.body[0]).toHaveProperty('date_started')
          expect(res.body[0]).toHaveProperty('date_ending')
          expect(res.body[0]).toHaveProperty('image')
          expect(res.status).toBe(200);
              });
        });

    });

    describe("GET/:id", function () { 

      it("GET should return an error message and status 403 when no authorization passed", async () => {
    
        const res = await request(server)
        .get('/api/auctions/1')
        .then(res => {
          expect(res.body.error).toBe('You must be logged in to do that.')
          expect(res.status).toBe(403);
              });
    
    });
    
        it("GET should return auction info when successful", async () => {
    
            const login = await request(server)
            .post('/api/auth/login')
            .send({username: 'Test2', password: 'password'})
    
            const profile = await request(server)
            .get('/api/auctions/1')
            .set('authorization', login.body.token)
            .then(res => {
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('item_description')
            expect(res.body).toHaveProperty('item_price')
            expect(res.body).toHaveProperty('date_started')
            expect(res.body).toHaveProperty('date_ending')
            expect(res.body).toHaveProperty('image')
            expect(res.body).toHaveProperty('highestBid')
            expect(res.status).toBe(200);
                  });
            });

            it("GET should return auction info and bids list when successful", async () => {
    
              const login = await request(server)
              .post('/api/auth/login')
              .send({username: 'Test2', password: 'password'})
      
              const profile = await request(server)
              .get('/api/auctions/2')
              .set('authorization', login.body.token)
              .then(res => {
                expect(res.body).toHaveProperty('bids')
                expect(res.status).toBe(200);
                    });
              });
    
        });

});

 