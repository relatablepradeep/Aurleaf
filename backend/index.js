import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connect from './connection.js';
import reviewRoutes from './Route/Review.js'


dotenv.config();

const app=express();

app.use(cors());

const port=process.env.port ||3003;



app.use(express.json());

app.use('/api/reviews', reviewRoutes);


 app.get('/email',(req,res)=>{
    res.send("hey there connected")
  })



connect()
  .then(()=>{
    app.listen(port,()=>{
      console.log(`server is connected on port ${port}`);
    })
  })
  .catch((err)=>{
    console.log(`mongoose is not connected ${err}`)
  })


 



//   app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });




