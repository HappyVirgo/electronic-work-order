/**
 * Description: Create Filter Component
 * Author: Carlos Blanco
 * Created: 11/06/2020
 * Ticket: ET-246
 */ 
export const filterByAssetType = (data) => {
    let uniqueList
    //Build new object from data
    const newObj = data.map((item) => {
        //console.log(item)
        let itemFilter = item?(item.asset?item.asset.assetType.description:""):""
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
    return uniqueList
}