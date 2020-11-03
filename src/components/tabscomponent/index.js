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
                {children}
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

const TabsComponent = ({history, attachments, /*notes*/}) => { 
    let infotab = true
    //Counters
    let historyCount = history?history.data.work_order_histories:[]
    historyCount = historyCount.length
    let attachmentsCount = attachments?attachments.data.documents:[]
    attachmentsCount = attachmentsCount.length
    /*
    let notesCount_Workorders = notes?notes.data.workOrderNotes:[]
    notesCount_Workorders = notesCount_Workorders?notesCount_Workorders.length:0
    let notesCount_Proposal = notes?notes.data.proposalNotes:[]
    notesCount_Proposal = notesCount_Proposal?notesCount_Proposal.length:0
    let notesCount_Invoices = notes?notes.data.invoiceNotes:[]
    notesCount_Invoices = notesCount_Invoices?notesCount_Invoices.length:0 
    let notesCount = notesCount_Workorders + notesCount_Proposal + notesCount_Invoices
    */

    //Loading custom styles Material UI
    const classes = useStyles();
    //Setting values for the tabs
    const [value, setValue] = useState(0);
    //Handle data change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
/*
                    <Tabs value={value} onChange={handleChange} aria-label="tabs" className={'tab-list'} TabIndicatorProps={{style: {background:'#0072CE'}}}>
                        <Tab label={`Notes (${notesCount})`} {...a11yProps(0)} className={classes.tabParent}/>
                        <Tab label={`Attachments (${attachmentsCount})`} {...a11yProps(1)} className={classes.tabParent} />
                        <Tab label={`History (${historyCount})`} {...a11yProps(0)} className={classes.tabParent} />
                    </Tabs>*/
    return (
        <div className={`${classes.root} work-order-details-component`}>
                <AppBar position="static" className={classes.tabNav}>
                    <Tabs value={value} onChange={handleChange} aria-label="tabs" className={'tab-list'} TabIndicatorProps={{style: {background:'#0072CE'}}}>
                        <Tab label={`Notes (8)`} {...a11yProps(0)} className={classes.tabParent}/>
                        <Tab label={`Attachments (${attachmentsCount})`} {...a11yProps(1)} className={classes.tabParent} />
                        <Tab label={`History (${historyCount})`} {...a11yProps(0)} className={classes.tabParent} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} className={'tab-panel'}>
                    <span></span>
                </TabPanel>
                <TabPanel value={value} index={1} className={'tab-panel'}>
                    <CommonTable tmpdata={attachments}></CommonTable>
                </TabPanel>
                <TabPanel value={value} index={2} className={'tab-panel'}>
                    <CommonTable tmpdata={history}></CommonTable>
                </TabPanel>     
        </div>
    );
};
/*
                <TabPanel value={value} index={0} className={'tab-panel'}>
                    <CommonTable tmpdata={notes} infotab={infotab}></CommonTable>
                </TabPanel>
                <TabPanel value={value} index={1} className={'tab-panel'}>
                    <CommonTable tmpdata={attachments}></CommonTable>
                </TabPanel>
                <TabPanel value={value} index={2} className={'tab-panel'}>
                    <CommonTable tmpdata={history}></CommonTable>
                </TabPanel>
*/
export default React.memo(TabsComponent);