const supertest = require('supertest');
const app = require('../server');
const TestimonialUser = require('../src/models/testimonialUser')

const user = {
    "name": "Michel",
    "post": "CEO",
    "lastname": "Kumar",
    "description": "I am CEO of Adani Group",
    "image": "dfghjk"
}
const updateUser = {
    "name": "Elon",
    "post": "CEO",
    "lastname": "Bhaiya",
    "description": "I am CEO of Tesla And accuired SpaceX",
    "image": "abcabacc"
}
let testimonialId;
describe('Testing TestimonialUser Apis', () => {
    beforeAll(async () => {
   // describe('should create testimonialuser', () => {
       // describe('when details is valid', () => {
            //test('should return success true', async () => {
                const res = await supertest(app)
                    .post('/api/createUser')
                    .send(user)
                    .expect(201);
                expect(res.body.message).toBe('User created successfully');
                expect(res.body.user.name).toBe(`${user.name}`);
                expect(res.body.user.post).toBe(`${user.post}`);
                testimonialId=res.body.user.testimonialId
           // });
       // });
   // });
});
    describe('Get All Testimonial User', () => {
        test('should return All Users', async () => {
            const res = await supertest(app)
                .get('/api/getuser')
                .expect(200);
        });
    });
    describe('Update Testimonial User', () => {
        test('Should Update user', async () => {
            const res = await supertest(app)
                .put(`/api/updateUser/`+testimonialId)
                .send(updateUser)
                .expect(200);
                expect(res.body.user.testimonialId).toBe(testimonialId);
                expect(res.body.message).toBe('User Updated successfully');
        });
    });
    describe('Delete Testimonial User', () => {
        test('Should Delete User', async () => {
            const res = await supertest(app)
                .delete(`/api/deleteUser/`+testimonialId)
                .expect(200);
              expect(res.body.message).toBe('User Deleted successfully');
              expect(res.body.user.isActive).toBe(false);
              expect(res.body.user.testimonialId).toBe(testimonialId);
        });
    });
});



