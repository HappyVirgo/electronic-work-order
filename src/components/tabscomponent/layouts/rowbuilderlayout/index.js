//Basic imports
import React from "react";
import clsx from "clsx";

//Material UI
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


//Layouts
import { 
    RenderMultiItem,
    RenderSingleItem,
    RenderDateItem
} from '../index'

//Helpers
import { 
    itemKey,
} from '../../helpers'

//Constants
const ROW_SIZE = 50;


//Building rows
export const Row = ({ index, style, data: { columns, items, classes } }) => {
    const item = items[index];
    return (
        <TableRow className={classes.row} style={style} component="div">
            {columns.map((column, colIndex) => {
            //Capturing data 
            //General
            let checkItem
            let checkNameField
            let typeOfTab = column.typeOfTab
            let getExtraKey = column.extraKey
            let getDataKey = column.dataKey
            let getExtraKeyLast = column.extraKeyLast
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
            //History Tab
            let getNameField =  column.nameField
            let getDateField = column.dateField
            //Attachments Tab
            let getDetailsButton = column.itsButton

            //Check if object value are null and avoid broken loops  
            if(item[getDataKey]){
                checkItem = item[getDataKey]===null?checkItem=null:item[getDataKey][getExtraKey]
            }
            if(item[getDataKey]){
                checkNameField = item[getDataKey]===null?checkNameField=null:item[getDataKey][getExtraKeyLast]
            }            
            
            return (
                <TableCell
                    component="div"
                    key={itemKey + colIndex}
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
                {
                    (getMultiItem===true)?
                    <RenderMultiItem
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
                />:
                    ((getDateField===true)?
                        <RenderDateItem 
                        checkItem={checkItem}
                        getExtraKey={getExtraKey}
                        getDataKey={getDataKey}
                        item={item}
                        getWorkOrderId={getWorkOrderId}
                        />:
                        <RenderSingleItem 
                        typeOfTab={typeOfTab}
                        getDetailsButton={getDetailsButton}
                        checkItem={checkItem}
                        checkNameField={checkNameField}
                        getExtraKeyLast={getExtraKeyLast}
                        getExtraKey={getExtraKey}
                        getDataKey={getDataKey}
                        getNameField={getNameField}
                        item={item}
                        getWorkOrderId={getWorkOrderId}
                    />
                    )}
                </TableCell>
            );
            })}
        </TableRow>
    );
};