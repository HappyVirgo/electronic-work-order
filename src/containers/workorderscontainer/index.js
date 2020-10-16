//Basic imports
import React, { Component } from 'react';
import { connect } from "react-redux";


//Components
import { 
    CTASectionComponent, 
    DataTableComponent, 
    WorkOrderDetailsComponent,
} from '../../components'


//Material UI
import Grid from '@material-ui/core/Grid';

//Actions
import { 
    oauthFetchToken,
    fetchUsersInformation,
    fetchCTAsData, 
    fetchEmergencyWOData, 
    fetchPendingWOData, 
    fetchDetailsWOData,
    fetchAssignedToMeWOData,
    fetchUnassignedWOData,
    fetchHistoryWOData,
    fetchNotesWOData,
    fetchAttachmentsWOData
} from '../../actions';

//Context
import { DetailsContext } from '../../context/detailscontext'
import { DynamicDataTableContext } from '../../context/dynamicdatatablecontext'


//Declaring global variables
//Token
let token
//CTA component
let ctadata
//Datatable component
let tmpdata
//Details component
let detailsdata
//Tab component
let historydata
let notesdata
let attachmentsdata
let dtlsID

class WorkOrdersBuilder extends Component {
    constructor() {
        super()
        this.state = {
            targetId: "emergencyWO",
            detailsId: "",
            loading: false
        };
    }    

    async componentDidMount() {
        token = await this.props.oauthFetchToken()
        ctadata = await this.props.fetchCTAsData()
        attachmentsdata = await this.props.fetchAttachmentsWOData()
        tmpdata = await this.props.fetchEmergencyWOData()  
        if(tmpdata.data.work_orders!==undefined) {
            dtlsID = tmpdata.data.work_orders[0]['workOrderId']
        }
        historydata = await this.props.fetchHistoryWOData(token)
        detailsdata = await this.props.fetchDetailsWOData(dtlsID, token)
        notesdata = await this.props.fetchNotesWOData(dtlsID, token)
        //Set details first item
        this.setState({detailsId: dtlsID})
    }
    /**
     * Description: Details components click events to change
     * depending on datatable row
     * Author: Carlos Blanco
     * Date: 9/24/2020
     * Ticket: ET-351
     * */
    dynamicDetails = (event) => {
        event.preventDefault();
        let target = event.target.id
        if(target.length>0){
            this.setState({detailsId: target, loading: true}, () => {
                dtlsID = this.state.detailsId
            })
        }else{
            target = event.target.closest('div')
            target = target.id
            this.setState({detailsId: target, loading: true},  () => {
                dtlsID = this.state.detailsId
            })
            
        }
        
    }
    /**
     * Description: Catch id from CTA component and pass
     * to container state in order to set 
     * the new data for the datatable
     * Author: Carlos Blanco
     * Date: 9/7/2020
     * Ticket: ET-249
     * */
    dynamicData = (event) => {
        event.preventDefault();
        let target = event.target.id
        if(target.length>0){
            this.setState({targetId: target, loading: true})
        }else{
            target = event.target.closest('div')
            target = target.id
            this.setState({targetId: target, loading: true})
        }
        
    }
    //Change data asynchronously
    async componentDidUpdate(prevProps, prevState) {
        if(prevState.targetId !== this.state.targetId || prevState.detailsId !== this.state.detailsId ) {
            //Set data for DataTable Component
            switch (this.state.targetId) {
                case "pendingWO":
                    tmpdata = await this.props.fetchPendingWOData()
                    break;
                case "emergencyWO":
                    tmpdata = await this.props.fetchEmergencyWOData()
                    break; 
                case "assignedWO":
                    tmpdata = await this.props.fetchAssignedToMeWOData()
                    break;  
                case "unassignedWO":
                    tmpdata = await this.props.fetchUnassignedWOData()
                    break;  
                case "expiredWO":
                    tmpdata = await this.props.fetchAssignedToMeWOData()
                    break;                                                          
                default:
                    tmpdata = await this.props.fetchEmergencyWOData()
                    break;
            }
            //Change details data
            if(dtlsID!==prevState.detailsId){
                dtlsID = this.state.detailsId
                this.setState({detailsId: dtlsID, loading: true}, async () => {
                    detailsdata = await this.props.fetchDetailsWOData(dtlsID, token)
                    notesdata = await this.props.fetchNotesWOData(dtlsID, token)
                })                
            } else {
                dtlsID = tmpdata.data.work_orders[0]['workOrderId']  
                this.setState({detailsId: dtlsID, loading: true}, async () => {
                    detailsdata = await this.props.fetchDetailsWOData(dtlsID, token)
                    notesdata = await this.props.fetchNotesWOData(dtlsID, token)
                })                            
            }           
            //Normalize state to avoid missing data or state changes
            this.setState({
                detailsId: dtlsID,
                targetId: this.state.targetId,
                loading: true
            }, async () => {
                detailsdata = await this.props.fetchDetailsWOData(dtlsID, token)
            })  
            this.setState({
                detailsId: dtlsID,
                targetId: this.state.targetId,
                loading: true
            }, async () => {
                notesdata = await this.props.fetchNotesWOData(dtlsID, token)
            }) 
        }
    }
    render() {
        return (
            <DetailsContext.Provider value={this.dynamicDetails}>
            <DynamicDataTableContext.Provider value={this.dynamicData}>
                <div className="work-orders-container">
                    <Grid className="cta-section-component">
                        <CTASectionComponent 
                            ctadata={ctadata} 
                            changeData={this.dynamicData}
                        />
                    </Grid>            
                    <Grid container className="content-section">
                        <Grid item xs={12} md={12} lg={7}>
                            <DataTableComponent
                                tmpdata={tmpdata}
                            />
                        </Grid>        
                        <Grid item xs={12} md={12} lg={5}>
                            <WorkOrderDetailsComponent
                                detailsdata={detailsdata}
                                history={historydata} 
                                attachments={attachmentsdata} 
                                notes={notesdata}
                            />
                        </Grid>  
                    </Grid>  
                </div>  
            </DynamicDataTableContext.Provider>   
            </DetailsContext.Provider>                   
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    oauthFetchToken: () => dispatch(oauthFetchToken()),
    fetchCTAsData: () => dispatch(fetchCTAsData(token)),    
    fetchPendingWOData: () => dispatch(fetchPendingWOData(token)),
    fetchEmergencyWOData: () => dispatch(fetchEmergencyWOData(token)),
    fetchUsersInformation: () => dispatch(fetchUsersInformation(token)),
    fetchDetailsWOData: () => dispatch(fetchDetailsWOData(dtlsID, token)),
    fetchAssignedToMeWOData: () => dispatch(fetchAssignedToMeWOData(token)),
    fetchUnassignedWOData: () => dispatch(fetchUnassignedWOData(token)),
    fetchHistoryWOData: () => dispatch(fetchHistoryWOData(token)),
    fetchNotesWOData: () => dispatch(fetchNotesWOData(dtlsID, token)),
    fetchAttachmentsWOData: ()=> dispatch(fetchAttachmentsWOData(token)),
})


const WorkOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(WorkOrdersBuilder)

export default WorkOrdersContainer;