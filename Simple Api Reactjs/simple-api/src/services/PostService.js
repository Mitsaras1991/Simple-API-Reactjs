
import axios from 'axios'
const posts=localStorage.getItem('posts')||[]
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
export default {fetchPosts,updatePosts}