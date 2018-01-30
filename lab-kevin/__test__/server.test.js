'use strict';

const debug = require('debug')('http:server-test');
const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

describe('Server Integration', function() {
  beforeAll(() => server.start(4000), () => console.log(4000));
  afterAll(() => server.stop());
  
  describe('Valid requests', () => {

    beforeAll(()=> {
      return  superagent.post(':4000/api/v1/note')
        .send({subject: 'hello', comment: 'Funkn-A'})
        .then( res => {
          this.resPost = res;
        })
        .catch(err => {
          debug('superagent error ', err);
        });
    });

    describe('POST /api/v1/note => create', () => {
      it('should post and create a new record', () => {
        debug('this.resPost.body', this.resPost.body);
        expect(this.resPost.body.subject).toEqual('hello');
        expect(this.resPost.body.comment).toEqual('Funkn-A');
      });
      it('should post with 201', () => {
        expect(this.resPost.status).toEqual(201);
      });
      it('should should have id on the response body', () => {
        expect(this.resPost.body).toHaveProperty('id');
      });
    });

    describe('GET /api/v1/note/someid => fetchOne', () => {
      
      beforeAll(() => {
        debug('this.resPost.body.id', this.resPost.body.id);
        return superagent.get(`:4000/api/v1/note/${this.resPost.body.id}`)
          .then(res => this.getOne = res);       
      });

      it('should return json data', () => {
        debug('this.getOne.body', this.getOne.body);
        expect(this.getOne.body.id).toEqual(this.resPost.body.id);
      });
      it('should return status code 200', () => {
        expect(this.getOne.status).toEqual(200);
      });
    });

    describe('GET /api/v1/note => fetchAll', () => {
      
      beforeAll(() => {
        return superagent.get(':4000/api/v1/note')
          .then(res => this.getAll = res);       
      });

      it('should return json data', () => {
        debug('this.getAll.body', this.getAll.body);
        debug('this.getAll.text', this.getAll.text);
        expect(JSON.parse(this.getAll.text)).toEqual(expect.arrayContaining([this.resPost.body.id]));
      });
      it('should return status code 200', () => {
        expect(this.getAll.status).toEqual(200);
      });
    });

    describe('PUT /api/v1/note => update', () => {
      
      beforeAll(() => {
        return superagent.put(`:4000/api/v1/note/${this.resPost.body.id}`)
          .send({subject: 'goodbye', comment: 'Funkn-B'})
          .then(res => this.getAll = res);       
      });
      beforeAll(() => {
        debug('this.resPost.body.id', this.resPost.body.id);
        return superagent.get(`:4000/api/v1/note/${this.resPost.body.id}`)
          .then(res => this.getOne = res);       
      });



      it('should return json data', () => {
        debug('this.getAll.body', this.getAll.body);
        expect(JSON.parse(this.getAll.text)).toEqual(expect.arrayContaining([this.resPost.body.id]));
      });
      it('should return status code 200', () => {
        expect(this.getAll.status).toEqual(200);
      });
    });

  });

  //     beforeAll(() => {
  //       return superagent.get(`:4000/api/v1/note?id=${postTwo.body.id}`)
  //         .then(res => getOne = res);       
  //     });

  //     it('should return a status of 200', () => {
  //       expect(getOne.status).toEqual(200);
  //     });

  //     it('Should return the item with the id that was requested', () => {
  //       expect(getOne.body.id).toEqual(postTwo.body.id);
  //       expect(getOne.body.subject).toEqual(postTwo.body.subject);
  //       expect(getOne.body.comment).toEqual(postTwo.body.comment);
  //     });

  //     it('Should return the item with a correctly formed uuid.', () => {
  //       expect(getOne.body.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  //     });
  //   });

  //   describe('GET /api/v1/note => fetchAll', () => {
  //     let getTwo, items;

  //     beforeAll(() => {
  //       return superagent.get(':4000/api/v1/note')
  //         .then(res => {
  //           getTwo = res;
  //           items = JSON.parse(getTwo.text);
  //         });       
  //     });

  //     it('should return a status of 200', () => {
  //       expect(getTwo.status).toEqual(200);
  //     });

  //     it('Should return an array', () => {
  //       expect(items).toBeInstanceOf(Array);
  //     });

  //     it('Should return an array of all the ids', () => {
  //       expect(items).toContain(`${postTwo.body.id}`);
  //       expect(items).toContain(`${postOne.body.id}`);
  //     });

  //   });

  //   describe('PUT /api/v1/note => update', () => {

  //     let putPost, putOne, putGet;
  //     beforeAll(() => {
  //       return superagent.post(':4000/api/v1/note')
  //         .send({subject: 'hello', comment: 'Funkn-A'})
  //         .then( res => {
  //           putPost = res;
  //         });
  //     });

  //     beforeAll(() => {
  //       return superagent.put(`:4000/api/v1/note?id=${putPost.body.id}`)
  //         .send({subject: 'Bonjour', comment: 'Sacre Bleu'})
  //         .then( res => {
  //           putOne = res;
  //         });
  //     });

  //     beforeAll(() => {
  //       return superagent.get(`:4000/api/v1/note?id=${putPost.body.id}`)
  //         .send({subject: 'Bonjour', comment: 'Sacre Bleu'})
  //         .then( res => {
  //           putGet = res;
  //         })
  //         .catch(console.err);
  //     });

  //     it('should return a status cone of 204', () => {
  //       expect(putOne.status).toBe(204);
  //     }); 

  //     it('should have values from the put data', () => {
  //       let getBody = JSON.parse(putGet.text);  
  //       expect(getBody.subject).toEqual(putOne.request._data.subject);
  //       expect(getBody.comment).toEqual(putOne.request._data.comment);
  //     }); 

  //     it('should have different values form the original post data', () => {
  //       let getBody = JSON.parse(putGet.text);  
  //       expect(getBody.subject).toEqual(putOne.request._data.subject);
  //       expect(getBody.comment).toEqual(putOne.request._data.comment);
  //     }); 
      
  //     it('should have the same id as the original item created by post', () => {
  //       let getBody = JSON.parse(putGet.text);
  //       expect(getBody.id).toEqual(putPost.body.id);
  //     }); 

  //   });

  //   describe('DELETE /api/v1/note => delete', () => {

  //     let dPost, deleteRes, dGet;
  //     beforeAll(() => {
  //       return superagent.post(':4000/api/v1/note')
  //         .send({subject: 'hello', comment: 'Funkn-A'})
  //         .then( res => {
  //           dPost = res;
  //         });
  //     });

  //     beforeAll(() => {
  //       return superagent.delete(`:4000/api/v1/note?id=${dPost.body.id}`)
  //         .then( res => {
  //           deleteRes = res;
  //         });
  //     });

  //     beforeAll(() => {
  //       return superagent.get(`:4000/api/v1/note?id=${dPost.body.id}`)
  //         .catch( res => {
  //           dGet = res;
  //         });
  //     });

  //     it('should return a 204 status', () => {
  //       expect(deleteRes.status).toEqual(204);  
  //     });

  //     it('should not have data in the body', () => {
  //       expect(deleteRes.body).toEqual(expect.objectContaining({}));  
  //     });

  //     it('should delete an item', () => {
  //       expect(dGet.status).toEqual(400);  
  //     });

  //   });

  // });

  // describe('Invalid requests', () => {
  //   describe('GET', () => {
  //     beforeEach(() => {
  //       return  superagent.get(':4000/api/v1')
  //         .catch( res => {
  //           this.resPost = res;
  //         });
  //     });
  //     it('Should return a 404 error when sending a request to the wrong route', () => {
  //       expect(this.resPost.response.status).toEqual(404);
  //     });
  //   });
  //   describe('POST', () => {
  //     beforeEach(() => {
  //       return  superagent.post(':4000/api/v1')
  //         .send({subject: 'hello', comment: 'Funkn-A'})
  //         .catch( res => {
  //           this.resPost = res;
  //         });
  //     });
  //     it('Should return a 404 error when posting a request to the wrong route', () => {
  //       expect(this.resPost.response.status).toEqual(404);
  //     });
  //   });

  //   describe('PUT', () => {
  //     beforeEach(() => {
  //       return  superagent.post(':4000/api/v1?id=')
  //         .send({subject: 'hello', comment: 'Funkn-A'})
  //         .catch( res => {
  //           this.resPost = res;
  //         });
  //     });
  //     it('Should return a 404 error when making a PUT request to the wrong route', () => {
  //       expect(this.resPost.response.status).toEqual(404);
  //     });
  //   });

  //   describe('DELETE', () => {
  //     beforeEach(() => {
  //       return  superagent.post(':4000/api/v1?id=')
  //         .send({subject: 'hello', comment: 'Funkn-A'})
  //         .catch( res => {
  //           this.resPost = res;
  //         });
  //     });
  //     it('Should return a 404 error when making a DELETE request to the wrong route', () => {
  //       expect(this.resPost.response.status).toEqual(404);
  //     });

  //   });

  //});

});
    

