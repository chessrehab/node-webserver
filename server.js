const express= require('express');
const hbs= require('hbs');
const fs=require('fs');


var app= express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');



app.use((req,res,next)=>{
  var now= new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n', (err)=>{
    if(err) {
      console.log('unable');
    }
  });

  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
//   next();
// });
app.use(express.static(__dirname+'/public'));



hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});


app.get('/',(req,res)=> {
  // res.send('<h1>hello!!</h1>');
  res.render('home.hbs',{
    pageTitle:'home page',
    welcomeMessage: 'welcome mofo',

  });
});

app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pageTitle:'about page',
  });
  //res.send('About page');
})
app.listen(3000,()=> {
  console.log('server is up on port 3000');
});
