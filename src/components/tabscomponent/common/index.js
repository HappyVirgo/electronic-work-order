/**
 * Description: Create Data Table Component for tabs
 * Author: Carlos Blanco
 * Created: 9/9/2020
 * Ticket: ET-249
 */

//Basic imports
import React, { useState, useEffect } from "react";

//Material UI imports
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

//Layouts
import { 
    ReactWindowTable
} from '../layouts'


let columnsHistory = [
    {
        label: "Updated Date",
        dataKey: "updatedDate",
        dateField: true,
        extraKey: false,
        numeric: false,
    },
    {
        label: "Note",
        dataKey: "note",
        extraKey: false,
        numeric: false,
    },   
    {
        label: "User",
        dataKey: "user",
        extraKey: "firstName",
        extraKeyLast: "lastName",
        nameField: true,
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
        label: "Date Created",
        dataKey: "dateCreated",
        dateField: true,
        extraKey: false,
        numeric: false,
    }, 
    {
        label: "Description",
        dataKey: "type",
        extraKey: "description",
        numeric: false,
    },
    {
        label: "Document Type",
        dataKey: "type",
        extraKey: "type",
        numeric: false,
    },
    {
        label: "Details",
        itsButton: true,
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