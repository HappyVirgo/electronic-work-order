export const filterByAssetType = (data) => {
    let uniqueList
    const newArray = data.map((item) => {
        let itemFilter = item.asset.assetType?item.asset.assetType.description:""
        return itemFilter
    })
    uniqueList = Object.values(newArray)    
    let result = uniqueList.filter((item,index) => {
        return uniqueList.indexOf(item) === index;
    })
    uniqueList = result
    return uniqueList
}