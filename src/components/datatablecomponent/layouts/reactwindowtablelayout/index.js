//Basic imports
import React from "react";

//Windowing imports
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

//Material UI imports
import { makeStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Skeleton from '@material-ui/lab/Skeleton';
import TableHead from "@material-ui/core/TableHead";

//Layouts
import { 
    TableColumns,
    Row
} from '../index'

//Helpers
import { 
    itemKey,
    createItemData
} from '../../helpers'

//Constants
// const ROW_SIZE = 150;
const ROW_SIZE = 120;

const useTableStyles = makeStyles(theme => ({
    root: {
        display: "block",
        flex: 1
    },
    table: {
        height: "100%",
        width: "100%"
    },
    thead: {},
    tbody: {
        width: "100%",
        maxWidth: "100%",
        height: "80vw",
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
    dtableCols: {
        width: "100%",
        height: "100%"
    },
    column: {}
}));
const topOfList = React.createRef();
const scrollToTop = (topOfList) => {
    if (topOfList.current) {
        console.log("called")
        topOfList.current.scrollIntoView();
        window.scrollTo({top:0})
    }
};
const span = (<span ref={topOfList} />)
let savedData;

//Generating Table
export const ReactWindowTable = ({ data, columns, firstLoading }) => {
    const classes = useTableStyles();
    const itemData = createItemData(classes, columns, data, span);
    console.log(data)
    if(!Object.is(data, savedData))
        scrollToTop(topOfList)
    savedData = data
    return (
        <div className={classes.root}>
        <Table className={classes.table} component="div">
            <TableHead component="div" className={classes.thead}>
            <TableColumns classes={classes} columns={columns} />
            </TableHead>
            <TableBody component="div" className={classes.tbody}>
            {
                firstLoading?(
                    <>
                        <Skeleton variant="rect" height="18%" style={{margin: '20px'}} />
                        <Skeleton variant="rect" height="18%" style={{margin: '20px'}} />
                        <Skeleton variant="rect" height="18%" style={{margin: '20px'}} />
                        <Skeleton variant="rect" height="18%" style={{margin: '20px'}} />
                        <Skeleton variant="rect" height="18%" style={{margin: '20px'}} />
                    </>
                    ):(
                    <AutoSizer>
                        {({ height, width }) => (
                        <List
                            key={itemKey}
                            className={`list-table`}
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
                )
            }
            </TableBody>
        </Table>
        </div>
    );
};