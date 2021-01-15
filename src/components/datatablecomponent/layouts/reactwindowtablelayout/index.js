//Basic imports
import React, {useState, useEffect} from "react";

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
const ROW_SIZE = 140;

const useTableStyles = makeStyles(theme => ({
    root: {
        display: "block",
        flex: 1
    },
    table: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    thead: {},
    tbody: {
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        minHieght:"100%",
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
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    },
    dtableCols: {
        width: "100%",
        height: "100%",
    },
    column: {}
}));
//Generating Table
const topOfList = React.createRef();
const span = (<span ref={topOfList} />);
const scrollToTop = () => {
    if (topOfList.current) {
      topOfList.current.scrollIntoView({block: 'center'});
    }
};
export const ReactWindowTable = ({ data, columns, firstLoading }) => {
    const classes = useTableStyles();
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(data);
        scrollToTop();
    }, [data])
    const itemData = createItemData(classes, columns, items, span);
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
                        <Skeleton variant="rect" height="18%" style={{margin: '1%'}} />
                        <Skeleton variant="rect" height="18%" style={{margin: '1%'}} />
                        <Skeleton variant="rect" height="18%" style={{margin: '1%'}} />
                        <Skeleton variant="rect" height="18%" style={{margin: '1%'}} />
                        <Skeleton variant="rect" height="18%" style={{margin: '1%'}} />
                    </>
                    ):(data.length?(
                        <AutoSizer>
                            {({ height, width }) => (
                                <List
                                    key={itemKey}
                                    className={`list-table`}
                                    height={height}
                                    width={width}
                                    itemCount={items.length}
                                    itemSize={ROW_SIZE}
                                    itemKey={itemKey}
                                    itemData={itemData}
                                >
                                    {Row}
                                </List>    
                            )}
                        </AutoSizer>
                    ):(<div style={{margin: '20px', display: 'flex', justifyContent: 'center'}}>No Available Data</div>))
            }
            </TableBody>
        </Table>
        </div>
    );
};