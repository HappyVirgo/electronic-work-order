//Basic imports
import React from "react";
import clsx from "clsx";
//Material UI imports
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

//Row Size
const ROW_SIZE = 80;

export const TableColumns = ({ classes, columns, infotab }) => {
    let notesheader = infotab!==true?"data-tab-row":"data-tab-row-notes"
    return (
    <TableRow className={`${clsx(classes.row, classes.headerRow)} ${notesheader}`} component="div">
        {columns.map((column, colIndex) => {
        return (
            <TableCell
            component="div" 
            key={colIndex}
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