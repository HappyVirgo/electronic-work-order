//Setting index as key to avoid weird behaviours on array mapping
export const itemKey = (index, data) => {
    let id
    if(data.items[index].wonId) {
        id = data.items[index].wonId
    } else if(data.items[index].pnId) {
        id = data.items[index].pnId
    } else {
        id = data.items[index].invId
    }
    return id
}