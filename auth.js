const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 

// authentication
passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
    try{

        console.log('Received credential:', USERNAME , password);
        const user = await Person.findOne({usename:USERNAME});

        if(!user){
            return done(null,false,{message:'Incorrect username.'});
        }

        const isPasswordMatch = user.password === password?true:false;

        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'Incorrect password.'});
        }

    }catch(error){
          return done(err);
    }
}))


module.exports=passport;