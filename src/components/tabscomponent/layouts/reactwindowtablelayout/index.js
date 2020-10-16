//Basic imports
import React from "react";

//Windowing imports
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

//Material UI imports
import { makeStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
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

//Row Size
let deviceWidth = window.matchMedia("(max-width: 700px)")
const checkMediaWidth = (deviceWidth) => {
    if (deviceWidth.matches) { // If media query matches
        return 120
    } else {
        return  80
    }
}
const ROW_SIZE = checkMediaWidth(deviceWidth);

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
        width: "100%"
    },
    row: {
        display: "flex",
        '@media (max-width: 700px)': {
            display: "block",
        },        
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
    column: {},
}));


//Generating Table
export const ReactWindowTable = ({ data, columns, infotab }) => {
    const classes = useTableStyles();
    const itemData = createItemData(classes, columns, data);
    return (
        <div className={classes.root}>
            <Table className={classes.table} component="div" >
            <TableHead className={classes.thead} component="div" >
                <TableColumns classes={classes} columns={columns} infotab={infotab} />
            </TableHead>
            <TableBody component="div" className={classes.tbody}>
                <AutoSizer>
                {({ height, width }) => (
                    <List
                        key={itemKey}
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