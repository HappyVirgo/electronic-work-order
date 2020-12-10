//Basic imports
import React, { useContext } from "react";
import clsx from "clsx";

//Material UI
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

//Context
import { GlobalContext } from "../../../../context/globalcontext";

//Layouts
import { 
    renderMultiItem,
    renderSingleItem,
    renderImage
} from '../index'

//Constants
// const ROW_SIZE = 140;
//Building rows

export const Row = ({ index, style, data: { columns, items, classes, span } }) => {
    const item = items[index];
    let woitemID = item?item.workOrderId:""
    let change = useContext(GlobalContext)
    const currentDtlsId = change.currentDtlsId
    change = change.dynamicDetails
    return (
        <>
        {span}
        <TableRow component="div" className={`${classes.row} datatable-row ${woitemID.toString() === currentDtlsId.toString()?'selected':''}`} style={style}>
        {columns.map((column, colIndex) => {
            //Check for null items 
            let checkItem
            //Capturing data 
            let getExtraKey = column.extraKey
            let getDataKey = column.dataKey
            let getMultiItem = column.multi_item
            let getImage = column.image
            let getImgPath = column.imgPath
            let getServiceProvider_index = column.serviceprovider_index
            let getServiceProvider = column.serviceprovider
            let getWorkOrderId = column.workorderid
            //Check if object value are null and avoid broken loops 
            console.log(getDataKey)       
            console.log(getExtraKey)    
            console.log(item?item[getDataKey]:"NADA") 
            let firstCheck = item?item[getDataKey]:null
            let fullCheck = firstCheck?item[getDataKey][getExtraKey]:null
            checkItem = !item?checkItem=null:fullCheck
            return (
            <TableCell
                key={!item?"":item['workOrderId'] * colIndex}
                component="div"
                variant="body"
                align={column.numeric || false ? "right" : "left"}
                className={clsx(
                classes.cell,
                !column.width && classes.expandingCell
                )}
                style={{
                flexBasis: column.width || false,
                // height: ROW_SIZE
                }}
            >
                {
                    (getMultiItem===true)?
                        renderMultiItem({getExtraKey, getDataKey, checkItem, item, getServiceProvider, getServiceProvider_index, getWorkOrderId, change}):
                    ((getImage===true)?
                        renderImage({getImgPath, getExtraKey, getDataKey, checkItem, item, getWorkOrderId, change}):
                        renderSingleItem({getExtraKey, getDataKey, checkItem, item, getWorkOrderId, change})
                    )
                }
            </TableCell>
            );
        })}
        </TableRow>
        </>
    );
};