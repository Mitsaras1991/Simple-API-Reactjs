
import axios from 'axios'
import RateLimit from '../helpers/RateLimit'
export function PostService(){
  this.RateLimit=new RateLimit(2,2)
  this.posts=localStorage.getItem('posts')||[]

  this.setPosts=(posts)=>{
    console.log("SET POSTS")
    this.posts=posts
    localStorage.setItem('posts',JSON.stringify(posts))
  }
  this.fetchPosts=function (){   
    return   new Promise(async (resolve,reject)=>
    { 
      if(!this.RateLimit.checkForApiUpdate()) reject("Api due to Call limit could not be updated")
      else{
          await   axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res=>{
              console.log(res)
              this.setPosts(res.data)     
              console.log(this.posts)        
              resolve(this.posts)
            })
            .catch(err=>{
              console.log(err) 
              reject({errorMessage:"Server Error"})
            })
      }  
    }) 
  };
  
}

  function fetchPosts(){
  return  new Promise(async (resolve,reject)=>{
await   axios.get('https://jsonplaceholder.typicode.com/posts').then(res=>{
        console.log(res)
        localStorage.setItem('posts',JSON.stringify(res.data))
        resolve(res.data)
    })
    .catch(err=>{
        console.log(err) 
        reject({errorMessage:"Server Error"})
    })
}) 
}
const updatePosts=()=>{

}
export default {fetchPosts,updatePosts,PostService}