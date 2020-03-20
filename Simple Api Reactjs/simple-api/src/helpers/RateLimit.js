import PostService from "../services/PostService"
import  * as DateHelper from './Datehelper'

const lastUpdate=localStorage.getItem('updatedAt')
console.log(lastUpdate)
function RateLimit(days,apiCallLimit){
    this.days=days
    this.apiCallLimit=apiCallLimit
    this.apiCallCounter=0
    this.lastUpdate=localStorage.getItem('updatedAt')?new Date(localStorage.getItem('updatedAt')) : new Date(Date.now())
    this.currentDate = new Date(Date.now())
    this.setUpdateAt=(date)=>{
        this.lastUpdate=date;
        console.log(`Set last Update  date ${this.currentDate}`)
        localStorage.setItem('updatedAt',this.currentDate)
    }
    this.incrementApiCounter=()=>{
        this.apiCallCounter+=1;
    }
    this.fetchPost=function(){

        return new Promise((resolve,reject)=>{
            console.log("Api calls "+this.lastUpdate)
            console.log("Api calls limit "+this.apiCallCounter)
            console.log("Api calls  days limit "+this.days)
            console.log("Ckeck call limit "+ this.apiCallLimit > this.apiCallCounter)
            console.log("Check day limit "+DateHelper.dayDifference(this.currentDate,this.lastUpdate)<=this.days)
          if(DateHelper.dayDifference(this.currentDate,this.lastUpdate)<=this.days
            && this.apiCallLimit>this.apiCallCounter){ 

                  PostService.fetchPosts().then(data=>{
                    console.log(data)
                    this.setUpdateAt(this.currentDate)
                    this.incrementApiCounter()
                    resolve(data)
                }).catch(err=> reject(err))
            }
              else    reject({error:"No more updates"})
        })
        
    }
}



export default RateLimit;