require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5000;
// const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('연결')).catch((e)=>console.log(e));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));
app.use('/api/category', require('./routes/category'));
if(process.env.NODE_ENV === 'production'){    
  app.use(express.static('client/build'))  // set static folder 
  //returning frontend for any route other than api 
  const path = require('path');
  app.get('*',(req,res)=>{     
    res.sendFile (path.resolve(__dirname,'client','build', 'index.html' ));    
  });
}

app.listen(PORT, () => {
  console.log(`Example app listening at ${PORT}`)
})