import { agent as request } from "supertest";
import app from "../index.js";
import mongoose from "mongoose"
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

dotenv.config();

async function connectDB() {
    try {
      await mongoose.connect(process.env.MONGODB_URI,{
        connectTimeoutMS: 10000, // Set a timeout for the connection attempt
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error; // Re-throw the error to fail the test setup
    }
  }

 

//  it's for testing the express app
describe("Test the root path and endpoints of staff routes",() => {

    beforeAll(async () => {
        await connectDB()        
    },10000) 

    afterAll(async () => {
        try {
            await mongoose.connection.close();
            console.log('Disconnected from MongoDB');
          } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
          }
    })

    it('Test userExist', async () => {
      const response = await request(app).post('/api/v1/staff/login').send({
       phonenumber:"9302748344",
       password:"akshai984",
      })
      .set('Accept', 'application/json')
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({success:false,message:"User not found"})
    
})

it('Test password is correct', async () => {
      const response = await request(app).post('/api/v1/staff/login').send({
        username:"9302748564",
        password:"akshai983"
      }).set('Accept', 'application/json')

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({success:false,message:"Invalid credentials"})
})

 

    it("POST staff login  /api/login", async () => {
        const response = await request(app).post('/api/v1/staff/login').send({
            phonenumber:"9302748564",
            password:"akshai984",
        })

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({success:true,message:"Login Successfully"})
    })

})




describe("Test the admin route and protected route", () => {

   beforeAll(async () => { 
        await connectDB()        
    },10000) 

    afterAll(async () => {
        try {
            await mongoose.connection.close();
            console.log('Disconnected from MongoDB');
          } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
          }
    })
 
    const adminToken = jwt.sign({id:"680e76f3249cda3f70058a08",role:"admin"},process.env.JWT_SECRET_key,{expiresIn:"1d"})
  console.log(adminToken)
    //  for admin login 
    it("POST /api/login-admin",async () => {

      const response = await request(app).post('/api/v1/admin/login').send({
        phonenumber:"9394857465",
	      password:"akshai984"	
      }).set("Content-Type","application/json")
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({success:true,message:"admin Login Successfully"})
      
      
    })

    it("POST /api/v1/admin/create-employee", async () => {
        const response = await request(app).post('/api/v1/admin/create-employee')
        expect(response.statusCode).toBe(401)
      })

      

    it("POST /api/create-employee", async () => {
      
    
        const response = await request(app).post('/api/v1/admin/create-employee')
        .set("Authorization",`Bearer ${adminToken}`)
        .send({
            username: "testuser18",
            email: "test18@gmail.com",
            phonenumber:"9200394578",
            password:"test01kg",
        })
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({success:true,message:"User Created Successfully"})       
        
    })
})
