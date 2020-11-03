//Setting index as key to avoid weird behaviours on array mapping
export const itemKey = (index, data) => {
    let id
    if(data.items[index].wonId) {
        id = data.items[index].wonId
    } else if(data.items[index].pnId) {
        id = data.items[index].pnId
    } else if(data.items[index].invId){
        id = data.items[index].invId
    } else if(data.items[index].id) {
        id = data.items[index].id
    } else if(data.items[index].documentId) {
        id = data.items[index].documentId
    } else {
        id = data.items[index].workOrderId
    }
    return id
}