import memoize from "memoize-one";

//Creating item to map and memoize the data to improve performance
export const createItemData = memoize((classes, columns, data) => ({
    columns,
    classes,
    items: data
}));