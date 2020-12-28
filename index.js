const {ApolloServer}=require('apollo-server');
const gql=require('graphql-tag');
const mongoose=require('mongoose');
const {RESTDataSource}=require('apollo-datasource-rest');
require("dotenv").config();

const typeDefs=require('./graphql/typeDefs');
const resolvers=require('./graphql/resolvers/index');



const server=new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req})
});

// class Routers extends RESTDataSource{
//     constructor(){
//         super();
//         this.baseUrl=`http://localhost:${process.env.PORT}`;
//     }
// async getThat(){
//    console.log(this.get('/authenticate/google'));
// }


// }

// const rx=new Routers();
// rx.getThat();

mongoose.connect(process.env.MONGODB,{useUnifiedTopology:true,useNewUrlParser:true})
.then(res=>{
    console.log('MongoDB Connected');
    return server.listen({port:process.env.PORT || 5000});
}).then((res)=>{
    console.log(`Server Running at url ${res.url}`);
}).catch((err)=>{
    console.error(err);
});
