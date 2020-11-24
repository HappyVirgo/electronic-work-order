//Basic imports
import React from "react";
import clsx from "clsx";
//Material UI imports
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from '@material-ui/core/Button';

//Row Size
const ROW_SIZE = 70;

const buttonSort = (
    <Button variant="text" color="secondary">
        <span>Sort</span>
    </Button>  
)

export const TableColumns = ({ classes, columns }) => {
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
                {`${column.label}`}
                {column.label!=="Image"?buttonSort:""}
            </TableCell>
            );
        })}
        </TableRow>
    );
};