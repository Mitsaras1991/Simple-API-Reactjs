


    const dayDifference=(currentDate,lastUpdate)=>{
        var Difference_In_Time = currentDate.getTime()-lastUpdate.getTime()
        var Difference_In_Days =Difference_In_Time/ (1000 * 3600 * 24);
        console.log("Day differnce before last update " +Math.floor(Difference_In_Days ))
        return Math.floor(Difference_In_Days )
    }


export  {dayDifference} 

