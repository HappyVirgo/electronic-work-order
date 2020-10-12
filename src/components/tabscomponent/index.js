/**
 * Description: Create Tab View Component
 * Author: Carlos Blanco
 * Created: 9/10/2020
 * Ticket: ET-256
 */

//Basic Imports
import React, {useState} from 'react';
//import PropTypes from 'prop-types';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//Common Components
import CommonTable from './common'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "25px"
    },
    tabNav: {
        backgroundColor: "transparent",
        color: "#444444",
        boxShadow: "none"
    },
    tabParent: {
        backgroundColor: "#E8E8E8",
        fontWeight: 800,
        color: "#0072CE",
        marginRight: "5px",
        textTransform: "capitalize"
    }  
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
                <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}
const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabsComponent = ({history, attachments, notes}) => { 
    let historyCount = history!==undefined?history.data.work_order_histories:null
    historyCount = historyCount.length
    let attachmentsCount = history!==undefined?attachments.data.documents:null
    attachmentsCount = attachmentsCount.length
    let notesCount_Workorders = history!==undefined?notes.data.workOrderNotes:null
    let notesCount_Proposal = history!==undefined?notes.data.proposalNotes:null
    let notesCount_Invoices = history!==undefined?notes.data.invoiceNotes:null
    let notesCount = notesCount_Workorders.length + notesCount_Proposal.length + notesCount_Invoices.length

    //Loading custom styles Material UI
    const classes = useStyles();
    //Setting values for the tabs
    const [value, setValue] = useState(0);
    //Handle data change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={`${classes.root} work-order-details-component`}>
                <AppBar position="static" className={classes.tabNav}>
                    <Tabs value={value} onChange={handleChange} aria-label="tabs" TabIndicatorProps={{style: {background:'#0072CE'}}}>
                        <Tab label={`History (${historyCount})`} {...a11yProps(0)} className={classes.tabParent} />
                        <Tab label={`Attachments (${attachmentsCount})`} {...a11yProps(1)} className={classes.tabParent} />
                        <Tab label={`Notes (${notesCount})`} {...a11yProps(2)}  className={classes.tabParent}/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} className={'tab-panel'}>
                    <CommonTable tmpdata={history}></CommonTable>
                </TabPanel>
                <TabPanel value={value} index={1} className={'tab-panel'}>
                    <CommonTable tmpdata={attachments}></CommonTable>
                </TabPanel>
                <TabPanel value={value} index={2} className={'tab-panel'}>
                    <CommonTable tmpdata={notes}></CommonTable>
                </TabPanel>     
        </div>
    );
};

export default React.memo(TabsComponent);