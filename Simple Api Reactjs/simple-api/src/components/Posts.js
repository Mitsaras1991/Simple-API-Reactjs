import React from 'react'
import TableRow from './TableRow'
 const Posts=({posts})=>{
    const rendrPosts=posts.length?
    <table className="table table-hover">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col" >UserId</th>
      <th scope="col">Title</th>
      <th scope="col">View</th>
    </tr>
  </thead>
  <tbody>
      {posts.map((post,index)=><TableRow index={index} post={post}/>)}      
    </tbody>
    </table>
    :<div>No Post Available</div>
    return rendrPosts
}

export default Posts