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
import Paper from "@material-ui/core/Paper";
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
    },
    paper: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "25px",
        boxShadow: "none",
        borderRadius: "0px"
    },
}));

function TabPanel(props) {
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
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabsComponent = ({history, attachments, notes}) => {
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
            <Paper className={classes.paper}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="History" {...a11yProps(0)} />
                        <Tab label="Attachments" {...a11yProps(1)} />
                        <Tab label="Notes" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <CommonTable tmpdata={history}></CommonTable>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CommonTable tmpdata={attachments}></CommonTable>
                </TabPanel>
                <TabPanel value={value} index={2}>
                <CommonTable tmpdata={notes}></CommonTable>
                </TabPanel> 
            </Paper>      
        </div>
    );
};

export default React.memo(TabsComponent);