//Basic imports
import React from "react";
import clsx from "clsx";
//Material UI imports
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

//Row Size
const ROW_SIZE = 70;

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
                // !column.width && classes.expandingCell
                classes.expandingCell
                )}
                style={{
                // flexBasis: column.width || false,
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