/**
 * Description: Create Data Table Component
 * Author: Carlos Blanco
 * Created: 9/2/2020
 * Ticket: ET-249
 */

//Basic imports
import React, {useState, useEffect} from "react";
import clsx from "clsx";
import memoize from "memoize-one";

//Windowing imports
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

//Material UI imports
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


const useTableStyles = makeStyles(theme => ({
    root: {
    display: "block",
    flex: 1
    },
    table: {
    height: "100%",
    width: "100%"
    },
    list: {},
    thead: {},
    tbody: {
    width: "100%"
    },
    row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    boxSizing: "border-box",
    minWidth: "100%",
    width: "100%"
    },
    headerRow: {},
    cell: {
    display: "block",
    flexGrow: 0,
    flexShrink: 0
    // flex: 1
    },
    expandingCell: {
    flex: 1
    },
    column: {}
}));

const TableColumns = ({ classes, columns }) => {
return (
    <TableRow component="div" className={`${clsx(classes.row, classes.headerRow)} data-table-row`}>
        {columns.map((column, colIndex) => {
        return (
            <TableCell
            key={colIndex}
            component="div"
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            className={clsx(
                classes.cell,
                classes.column,
                !column.width && classes.expandingCell
            )}
            style={{
                flexBasis: column.width || false,
                height: ROW_SIZE
            }}
            scope="col"
            >
            {column.label}
            </TableCell>
        );
        })}
    </TableRow>
    );
};

/**
* Description: Check for multi-item column 
* Author: Carlos Blanco
* Date: 9/8/2020
* Ticket: ET-249 
* */

//Set render structure for multi-item column
const renderMultiItem = ({getExtraKey, getDataKey, checkItem, item, getServiceProvider, getServiceProvider_index, getWorkOrderId}) => {
    return (
        <div id={getWorkOrderId}>
        <strong>{getExtraKey!==false?checkItem:item[getDataKey]}</strong><br/>
        <span><small>Service Provider: <b>{item[getServiceProvider_index][getServiceProvider]}</b></small></span><br/>
        <span><small>Work Orders: <b>{item[getWorkOrderId]}</b></small></span>
        </div>
    );
}
///Set render structure for single-item column
const renderSingleItem = ({getExtraKey, getDataKey, checkItem, item, getWorkOrderId}) => {
    return (
        <div id={getWorkOrderId}>
            <span>
            {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>
    );
}

//Row Size
const ROW_SIZE = 45;

//Building rows
const Row = ({ index, style, data: { columns, items, classes } }) => {
    const item = items[index];
    return (
        <TableRow component="div" className={classes.row} style={style}>
            {columns.map((column, colIndex) => {
            //Capturing data 
            let checkItem
            let getExtraKey = column.extraKey
            let getDataKey = column.dataKey
            let getMultiItem = column.multi_item
            let getServiceProvider_index = column.serviceprovider_index
            let getServiceProvider = column.serviceprovider
            let getWorkOrderId = column.workorderid
            //Check if object value are null and avoid broken loops  
            checkItem = item[getDataKey]===null?checkItem="null":item[getDataKey][getExtraKey]
            return (
                <TableCell
                key={item.id + colIndex}
                component="div"
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
                {getMultiItem===true?renderMultiItem({getExtraKey, getDataKey, checkItem, item, getServiceProvider, getServiceProvider_index, getWorkOrderId}):renderSingleItem({getExtraKey, getDataKey, checkItem, item, getWorkOrderId})}
                </TableCell>
            );
            })}
        </TableRow>
    );
};

//Setting index as key to avoid weird behaviours on array mapping
const itemKey = (index, data) => data.items[index].workOrderId;

//Creating item to map and memoize the data to improve performance
const createItemData = memoize((classes, columns, data) => ({
    columns,
    classes,
    items: data
}));

//Generating Table
const ReactWindowTable = ({ data, columns }) => {
    const classes = useTableStyles();

    const itemData = createItemData(classes, columns, data);
    return (
        <div className={classes.root}>
            <Table className={classes.table} component="div">
            <TableHead component="div" className={classes.thead}>
                <TableColumns classes={classes} columns={columns} />
            </TableHead>

            <TableBody component="div" className={classes.tbody}>
                <AutoSizer>
                {({ height, width }) => (
                    <List
                    className={classes.list}
                    height={height}
                    width={width}
                    itemCount={data.length}
                    itemSize={ROW_SIZE}
                    itemKey={itemKey}
                    itemData={itemData}
                    >
                    {Row}
                    </List>
                )}
                </AutoSizer>
            </TableBody>
            </Table>
        </div>
    );
};

/**
* label: Name displayed on view
* dataKey: Name of the array/object index to select
* extraKey: Second array/oject index in is needed (Multi-dimensional array/object)
* numeric: If is a number, float to right
* witdh: Column width
*/
let columnsHistory = [
    {
        label: "Work Order ID",
        dataKey: "workOrderId",
        extraKey: false,
        numeric: true,
        width: 150
    },   
    {
        label: "Note",
        dataKey: "note",
        extraKey: false,
        numeric: false,
        width: 150
    },
    {
        label: "Status",
        dataKey: "status",
        extraKey: "description",
        numeric: false,
        width: 150
    } 
];

let columnsAttachments = [
    {
        label: "Doc ID",
        dataKey: "documentId",
        extraKey: false,
        numeric: true,
        width: 150
    },   
    {
        label: "Description",
        dataKey: "type",
        extraKey: "description",
        numeric: false,
        width: 150
    },
    {
        label: "Type",
        dataKey: "type",
        extraKey: "type",
        numeric: false,
        width: 150
    } 
];

let columnsNotes = [
    {
        label: "WO Note ID",
        dataKey: "wonId",
        extraKey: false,
        numeric: true,
        width: 150
    },   
    {
        label: "Description",
        dataKey: "wonNote",
        extraKey: false,
        numeric: false,
        width: 150
    },
    {
        label: "Company Name",
        dataKey: "user",
        extraKey: "companyName",
        numeric: false,
        width: 150
    } 
];

//First Data to dsiplay
let columns = columnsHistory

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    container: {
        flexGrow: 1,
        height: 150
    },
    paper: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        borderRadius: "0px"    
    },
    title: {
        flex: "0 0 auto"
    },
    spacer: {
        flex: "1 1 100%"
    }            
}));

const CommonTable = ({tmpdata}) => {
    const classes = useStyles();

    //Set state with data
    const [data, setData] = useState([]);

    //Getting the data
    
    useEffect(() => {
    //Updates data from state
    if(tmpdata!==undefined){
        let tabId
        if (tmpdata.data.work_order_histories!==undefined) {
            tabId="work_order_histories"
            columns = columnsHistory
        } else if(tmpdata.data.documents!==undefined)         {
            tabId="documents"
            columns = columnsAttachments
        } else {
            tabId="workOrderNotes"
            columns = columnsNotes
        }       
        setData(tmpdata.data[tabId]) 
        }
        
    }, [tmpdata]);
    

    return (
        <div className={`${classes.root} common-table-component`}>
            <Container maxWidth="lg" className={classes.container}>
                <Paper className={classes.paper}>
                    <ReactWindowTable data={data} columns={columns}/>
                </Paper>
            </Container>
        </div>
    );
};

export default React.memo(CommonTable);