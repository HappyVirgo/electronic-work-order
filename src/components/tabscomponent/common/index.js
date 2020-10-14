/**
 * Description: Create Data Table Component
 * Author: Carlos Blanco
 * Created: 9/|/2020
 * Ticket: ET-249
 */

//Basic imports
import React, {useState, useEffect} from "react";
import clsx from "clsx";
import memoize from "memoize-one";

//Excerpt 
import excerptHtml from "excerpt-html"

//Date Format
import Moment from 'react-moment';

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
    flexShrink: 0,
    flex: 1
    },
    expandingCell: {
    flex: 1
    },
    column: {}
}));

const TableColumns = ({ classes, columns, infotab }) => {
    let notesheader = infotab!==true?"data-tab-row":"data-tab-row-notes"
return (
    <TableRow component="div" className={`${clsx(classes.row, classes.headerRow)} ${notesheader}`}>
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
* Description: Check for notes column
* Author: Carlos Blanco
* Date: 10/14/2020
* Ticket: ET-352 
* */
//Set render structure for multi-item column
const RenderMultiItem = ({
    getDataKeyWo,
    getDataKeyWoDate,
    getDataKeyWoUser,
    getDataKeyWoCompany,
    getDataKeyPrps,
    getDataKeyPrpsDate,
    getDataKeyPrpsUser,
    getDataKeyPrpsCompany,
    getDataKeyInvs,
    getDataKeyInvsDate,
    getDataKeyInvsUser,
    getDataKeyInvsCompany,
    item,
    }) => {
    const classes = useStyles();
    let id
    let describer
    let company
    let date
    if (item[getDataKeyWo]) {
        id = getDataKeyWo
        describer = "Work Order Note"
        company = item[getDataKeyWoUser][getDataKeyWoCompany]
        date = item[getDataKeyWoDate]
    } else if (item[getDataKeyPrps]) {
        id = getDataKeyPrps
        describer = "Proposal Note"
        company = item[getDataKeyPrpsUser][getDataKeyPrpsCompany]
        date = item[getDataKeyPrpsDate]
    } else {
        id = getDataKeyInvs
        describer = "Invoice Note"
        company = item[getDataKeyInvsUser][getDataKeyInvsCompany]
        date = item[getDataKeyInvsDate]
    }
    return (
        <TableCell id={item[id]}>
            <strong className={classes.rowTitle}>{describer} - <Moment format="MMMM D, YYYY hh:mm a">{date}</Moment> / {company}</strong><br/>
            <span>{excerptHtml(item[id], {
                pruneLength: 80, // Amount of characters that the excerpt should contain
            })}</span>
        </TableCell>
    );
}

///Set render structure for single-item column
const renderSingleItem = ({getExtraKey, getDataKey, checkItem, item, getWorkOrderId}) => {
    return (
        <TableCell id={getWorkOrderId}>
            <span>
            {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </TableCell>
    );
}

//Row Size
const ROW_SIZE = 50

//Building rows
const Row = ({ index, style, data: { columns, items, classes } }) => {
    const item = items[index];
    return (
        <TableRow component="div" className={classes.row} style={style}>
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
                    key={index + colIndex}
                    tag="div"
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

//Setting index as key to avoid weird behaviours on array mapping
const itemKey = (index, data) => data.items[index];

//Creating item to map and memoize the data to improve performance
const createItemData = memoize((classes, columns, data) => ({
    columns,
    classes,
    items: data
}));

//Generating Table
const ReactWindowTable = ({ data, columns, infotab }) => {
    const classes = useTableStyles();

    const itemData = createItemData(classes, columns, data);
    return (
        <div className={classes.root}>
            <Table className={classes.table} component="div">
            <TableHead component="div" className={classes.thead}>
                <TableColumns classes={classes} columns={columns} infotab={infotab} />
            </TableHead>

            <TableBody component="div" tag="div" className={classes.tbody}>
                <AutoSizer>
                {({ height, width }) => (
                    <List
                        tag="div"
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
        numeric: false,
    },   
    {
        label: "columnsHistory",
        dataKey: "note",
        extraKey: false,
        numeric: false,
    },
    {
        label: "Status",
        dataKey: "status",
        extraKey: "description",
        numeric: false,
    } 
];

let columnsAttachments = [
    {
        label: "Doc ID",
        dataKey: "documentId",
        extraKey: false,
        numeric: false,
    },   
    {
        label: "columnsAttachments",
        dataKey: "type",
        extraKey: "description",
        numeric: false,
    },
    {
        label: "Type",
        dataKey: "type",
        extraKey: "type",
        numeric: false,
    } 
];


let columnsNotes = [ 
    {
        label: "",
        dataKey_wo: "wonNote",
        dataKey_wo_date: "createdAt",
        dataKey_wo_user: "user",
        dataKey_wo_company: "companyName",
        dataKey_prps: "pnote",
        dataKey_prps_date: "createdAt",
        dataKey_prps_user: "user",
        dataKey_prps_company: "companyName",
        dataKey_invs: "invNote",
        dataKey_invs_date: "createdAt",
        dataKey_invs_user: "user",
        dataKey_invs_company: "companyName",  
        dataKey: null,                     
        extraKey: false,
        numeric: false,
        multi_item: true,

    }
];

//First Data to dsiplay
let columns = columnsNotes

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    container: {
        flexGrow: 1,
        height: 180
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
    },
    rowTitle: {
        color: "#0072CE"
    }
}));

const CommonTable = ({tmpdata, infotab}) => {
    const classes = useStyles();

    //Set state with data
    const [data, setData] = useState([]);

    //Getting the data
    
    useEffect(() => {
    //Updates data from state
    if(tmpdata!==undefined){
            let dataSetup
            if (tmpdata.data.work_order_histories!==undefined) {
                dataSetup = tmpdata.data['work_order_histories']
                columns = columnsHistory
            } else if(tmpdata.data.documents!==undefined) {
                dataSetup = tmpdata.data['documents']
                columns = columnsAttachments
            } else {
                let wo_notes
                wo_notes = !tmpdata.data['workOrderNotes']?wo_notes=[]:tmpdata.data['workOrderNotes']
                let prp_notes
                prp_notes = !tmpdata.data['proposalNotes']?prp_notes=[]:tmpdata.data['proposalNotes']
                let inv_notes = tmpdata.data['invoiceNotes']
                inv_notes = !tmpdata.data['invoiceNotes']?inv_notes=[]:tmpdata.data['invoiceNotes']
                let pre_notes = wo_notes.concat(prp_notes)
                let notes = pre_notes.concat(inv_notes)
                dataSetup = notes
                columns = columnsNotes
            }       
            setData(dataSetup) 
        }
        
    }, [tmpdata]);
    

    return (
        <div className={`${classes.root} common-table-component`}>
            <Container maxWidth="lg" className={classes.container}>
                <Paper className={classes.paper}>
                    <ReactWindowTable data={data} columns={columns} infotab={infotab}/>
                </Paper>
            </Container>
        </div>
    );
};

export default React.memo(CommonTable);