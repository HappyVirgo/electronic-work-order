/**
 * Description: Create Filter Component
 * Author: Carlos Blanco
 * Created: 11/10/2020
 * Ticket: ET-246
 */ 
export const filterByPriority = (data) => {
    let uniqueList
    //Build new object from data
    const newObj = data.map((item) => {
        //console.log(item)
        let itemFilter = item?(item.priority?item.priority.description:""):""
        return itemFilter
    })
    //Convert object into array
    uniqueList = Object.values(newObj)    
    //Remove duplicate data
    let result = uniqueList.filter((item,index) => {
        return uniqueList.indexOf(item) === index
    })
    //Remove empty values
    uniqueList = result.filter(item => item);
    uniqueList.sort()
    return uniqueList
}