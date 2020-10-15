//Basic imports
import React from "react";
import clsx from "clsx";

//Material UI
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


//Layouts
import { 
    RenderMultiItem,
    renderSingleItem,
} from '../index'

//Constants
const ROW_SIZE = 50;


//Building rows
export const Row = ({ index, style, data: { columns, items, classes } }) => {
    const item = items[index];
    return (
        <TableRow className={classes.row} style={style} component="div">
            {columns.map((column, colIndex) => {
            //Capturing data 
            let getExtraKey = column.extraKey
            let getDataKey = column.dataKey
            let getMultiItem = column.multi_item
            let getWorkOrderId = column.workorderid
            //Notes Tab
            let getDataKeyWo = column.dataKey_wo
            let getDataKeyWoDate =column.dataKey_wo_date
            let getDataKeyWoUser = column.dataKey_wo_user
            let getDataKeyWoCompany = column.dataKey_wo_company
            let getDataKeyPrps = column.dataKey_prps
            let getDataKeyPrpsDate= column.dataKey_prps_date
            let getDataKeyPrpsUser = column.dataKey_prps_user
            let getDataKeyPrpsCompany = column.dataKey_prps_company
            let getDataKeyInvs = column.dataKey_invs
            let getDataKeyInvsDate = column.dataKey_invs_date
            let getDataKeyInvsUser = column.dataKey_invs_user
            let getDataKeyInvsCompany = column.dataKey_invs_company          
            //Index for map
            let index = item['wonId']?(item['pnId']?(item['invId']?item['invId']:null):item['pnId']):item['wonId']
            return (
                <TableCell
                    component="div"
                    key={index + colIndex}
                    variant="body"
                    align={column.numeric || false ? "right" : "left"}
                    className={clsx(
                        classes.cell,
                        !column.width && classes.expandingCell
                    )}
                    style={{
                        flexBasis: column.width || false,
                        height: ROW_SIZE
                    }}
                >
                {getMultiItem===true?<RenderMultiItem
                    getDataKeyWo={getDataKeyWo}
                    getDataKeyWoDate={getDataKeyWoDate}
                    getDataKeyWoUser={getDataKeyWoUser}
                    getDataKeyWoCompany={getDataKeyWoCompany}
                    getDataKeyPrps={getDataKeyPrps}
                    getDataKeyPrpsDate={getDataKeyPrpsDate}
                    getDataKeyPrpsUser={getDataKeyPrpsUser}
                    getDataKeyPrpsCompany={getDataKeyPrpsCompany}
                    getDataKeyInvs={getDataKeyInvs}
                    getDataKeyInvsDate={getDataKeyInvsDate}
                    getDataKeyInvsUser={getDataKeyInvsUser}
                    getDataKeyInvsCompany={getDataKeyInvsCompany}
                    item={item}
                />:renderSingleItem({
                    getExtraKey,
                    getDataKey,
                    item,
                    getWorkOrderId
                })}
                </TableCell>
            );
            })}
        </TableRow>
    );
};