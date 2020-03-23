import PostService from "../services/PostService"
import  * as DateHelper from './Datehelper'

const lastUpdate=localStorage.getItem('updatedAt')
console.log(lastUpdate)
function RateLimit(days,apiCallLimit){
    this.limitDays=days
    this.apiCallLimit=apiCallLimit
    this.apiCallCounter=localStorage.getItem('apiCallCounter')||0
    this.lastUpdate= localStorage.getItem('updatedAt')?new Date(localStorage.getItem('updatedAt')) : new Date(Date.now())
    this.currentDate = new Date(Date.now())
    this.setUpdateAt=(date)=>{
        this.lastUpdate=date;
        console.log(`Set last Update  date ${date}`)
        localStorage.setItem('updatedAt',date)
        
    }
    this.incrementApiCounter=()=>{
        this.apiCallCounter+=1;
        localStorage.setItem('apiCallCounter',this.apiCallCounter)
    }
    /**
     * Function check Rate Limit If Api can be Updated
     */
    this.checkForApiUpdate=function(){
    console.log("Api calls "+this.lastUpdate)
    console.log("Api calls counter "+this.apiCallCounter)
    console.log("Api calls  days limit "+this.limitDays)
    console.log("Ckeck call limit "+ this.apiCallLimit > this.apiCallCounter)
    console.log("Check day limit "+DateHelper.dayDifference(this.currentDate,this.lastUpdate))
    console.log(DateHelper.dayDifference(this.currentDate,this.lastUpdate)>this.limitDays)
    console.log(DateHelper.dayDifference(this.currentDate,this.lastUpdate)<=this.limitDays
    && this.apiCallLimit>this.apiCallCounter)
/**
 * If DayDifference between (now and lastUpdate) is greater than LimitDays call API
 * Or  DayDifference between (now and lastUpdate) is less than or equal LimitDays and
 * ApiCallLimit is greater than ApiCallCounter
 */
if(DateHelper.dayDifference(this.currentDate,this.lastUpdate)>this.limitDays){
    this.apiCallCounter=0
    this.incrementApiCounter()
    console.log("Set again Api Limiter due to Limit days before lastUpdate")
    this.setUpdateAt(this.currentDate)
return true
}
    if(DateHelper.dayDifference(this.currentDate,this.lastUpdate)<=this.limitDays
    && this.apiCallLimit>this.apiCallCounter){ 
        console.log("TIGIENETEA")
        this.setUpdateAt(this.lastUpdate)
        this.incrementApiCounter()
       return true
    }
   return false
 
}

/**
 * Function Fecthing Post through Post Service
 */
this.fetchPost=function(){

    return new Promise((resolve,reject)=>{
        console.log("Api calls "+this.lastUpdate)
        console.log("Api calls limit "+this.apiCallCounter)
        console.log("Api calls  days limit "+this.limitDays)
        console.log("Ckeck call limit "+ this.apiCallLimit > this.apiCallCounter)
        console.log("Check day limit "+DateHelper.dayDifference(this.currentDate,this.lastUpdate)<=this.days)
    /**
     * If DayDifference between (now and lastUpdate) is greater than LimitDays call API
     * Or  DayDifference between (now and lastUpdate) is less than or equal LimitDays and
     * ApiCallLimit is greater than ApiCallCounter
     */
        if(DateHelper.dayDifference(this.currentDate,this.lastUpdate)>this.limitDays ||
      DateHelper.dayDifference(this.currentDate,this.lastUpdate)<=this.limitDays
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