//Setting index as key to avoid weird behaviours on array mapping
export const itemKey = (index, data) => {
    console.log(data)
    return data.items[index].workOrderId;
}