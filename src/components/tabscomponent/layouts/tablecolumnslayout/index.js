//Basic imports
import React from "react";
import clsx from "clsx";

//Material UI imports
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";


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
const ROW_SIZE_NOT_NOTES = 40

export const TableColumns = ({ classes, columns, infotab }) => {
    let notesheader = infotab!==true?"data-tab-row":"data-tab-row-notes"
    let rowsize= infotab!==true?ROW_SIZE_NOT_NOTES:ROW_SIZE
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
                height: rowsize
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