import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as PostService from './services/PostService'
import Axios from 'axios';
import PopUp from './components/PopUp'
import RateLimit from './helpers/RateLimit'
import Posts from './components/Posts'
import Pagination from './components/Pagination'
import ErrorComponent from './components/ErrorComponent'
class App extends React.Component{
constructor(props){
  super(props);
  this.state={
    currentPosts:[],
    allPosts:localStorage.getItem('posts')?JSON.parse(localStorage.getItem('posts')):[],
    error:null,
    rateLimit:new RateLimit(2,2),
    currentPage: null,
   totalPages: null,
   showPopUpError:false
  }
  
}
  
  componentDidMount(){
   
 this.state.rateLimit.fetchPost().then(posts=>{
    console.log(posts)
    this.setState({allPosts:posts})
  }).catch(({error})=>{
    console.log(error)
    this.setState({error,showPopUpError:true})
   })

 }
 closeErrorPopup=()=>{
  this.setState({error:null,showPopUpError:false})
 }
 onPageChanged = data => {
  const { allPosts } = this.state;
  const { currentPage, totalPages, pageLimit } = data;

  const offset = (currentPage - 1) * pageLimit;
  const currentPosts = allPosts.slice(offset, offset + pageLimit);
  console.log(currentPosts)
  this.setState({ currentPage, currentPosts, totalPages });
}
   getData=async(e)=>{
     e.preventDefault();
     console.log(this.state.rateLimit.apiCallCounter)
    await this.state.rateLimit.fetchPost().then(posts=>{
      this.setState({posts})
    }).catch(({error})=>{
      console.log(error)
      this.setState({error,showPopUpError:true})
         })
  }
 render(){ 
   const {allPosts,currentPosts,currentPage,totalPages,error,showPopUpError}=this.state
   const totalPosts=allPosts.length
console.log(error)
   if (totalPosts === 0) return null;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <button onClick={this.getData}>Update Data</button>
        </header>
        <Pagination totalRecords={totalPosts} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged}/>
        <ErrorComponent error={error} closePopup={this.closeErrorPopup} showPopUp={showPopUpError}></ErrorComponent>     
      <Posts posts={currentPosts}/>
    </div>
  );
  }
} 

export default App;
