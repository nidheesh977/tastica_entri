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

  let adminToken = ""
  let staffToken =""
beforeAll(async () => {
  adminToken = jwt.sign(
      { id: "680e76f3249cda3f70058a08", role: "admin" },
      process.env.JWT_SECRET_key,
      { expiresIn: "1d" }
  );

  staffToken = jwt.sign(
    { id: "6818492a2265c92b50b661a8", role: "staff" },
    process.env.JWT_SECRET_key,
    { expiresIn: "1d" }
  )
  await connectDB();
}, 10000);


afterAll(async () => {
  try {
      await mongoose.connection.close();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
})
 

//  it's for testing the express app
describe("Test the root path and endpoints of staff routes",() => {


    it('Test userExist', async () => {
      const response = await request(app).post('/api/v1/staff/login').send({
       phoneNumber:"9302748344",
       password:"akshai984",
      })
      .set('Accept', 'application/json')
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({success:false,message:"User not found"})
    
})


 

    it("POST staff login  /api/login", async () => {
        const response = await request(app).post('/api/v1/staff/login').send({
            phoneNumber:"9394857865",
            password:"akshai984",
        })

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({success:true,message:"Login Successfully",data:expect.any(Object)})
    })

})




describe('POST /api/v1/login-admin', () => {

  it("log into a admin panal ",async () => {

    const response = await request(app).post('/api/v1/admin/login').send({
      phoneNumber:"9394857465",
      password:"akshai984"	
    })

    console.log("Response Status:", response.statusCode); // Debugging
    console.log("Response Body:", response.body);
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({success:true,message:"admin Login Successfully",data:expect.any(Object)})
    
  })
})

describe('POST /api/v1/admin/-create-employee',() => {
  it('should return 400 if staff already exists',async () => {
    const response = await request(app)
    .post("/api/v1/admin/create-employee")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({userName: "newEmployee",
      email: "newEmployee@example.com",
      phoneNumber: "9876543210",
      password: "securePassword123",})

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({success:false,message:"staff already exists"})
  })
})

describe('POST /api/v1/admin/create-employee',() => {

  it("should Create a new staff successfully", async () => {
    const response = await request(app)
      .post("/api/v1/admin/create-employee")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        userName: "newEmployee2",
        email: "newEmployee2@example.com",
        phoneNumber: "9876543216",
        password: "securePassword123",
      });
  
    expect(response.statusCode).toBe(201); // Adjust if necessary
    expect(response.body).toEqual({
      success: true,
      message: "staff created successfully",
      
    });
  });
})

describe('GET /api/v1/admin/check-logged',() => {

  it('should return 403 if staff tries to access admin check route',async () => {
       const response = await request(app)
       .get('/api/v1/admin/check-logged')
       .set("Authorization", `Bearer ${staffToken}`)

       // Debugging logs (optional)
    console.log("Response Status:", response.statusCode);
    console.log("Response Body:", response.body);

       expect(response.statusCode).toBe(403)
       expect(response.body).toEqual({success:false,message:"Forbidden"})
  })

  it('Should verify if the admin is logged in successfully',async () =>{
       const response = await request(app)
       .get('/api/v1/admin/check-logged')
       .set("Authorization", `Bearer ${adminToken}`)
       expect(response.statusCode).toBe(200)
       expect(response.body).toEqual({success:true , message:"admin logged successfully"})
  })
})