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
import { GlobalContext } from '../../context/globalcontext'


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
            loading: false,
            searchTerm: "",    
        };
    }    
    /**
     * Description: Set state based on search input 
     * depending on datatable row
     * Author: Carlos Blanco
     * Date: 9/24/2020
     * Ticket: ET-351
     * */
    handleSearchTerm = (event) => {
        this.setState({
            searchTerm: event.target.value,
        }, () => {
            console.log(this.state)
        });
    }    
    async componentDidMount() {
        
        token = await this.props.oauthFetchToken()
        ctadata = await this.props.fetchCTAsData()
        tmpdata = await this.props.fetchEmergencyWOData()  
        if(tmpdata.data.work_orders!==undefined) {
            dtlsID = tmpdata.data.work_orders[0]['workOrderId']
        }
        historydata = await this.props.fetchHistoryWOData(dtlsID, token)
        detailsdata = await this.props.fetchDetailsWOData(dtlsID, token)
        notesdata = await this.props.fetchNotesWOData(dtlsID, token)
        attachmentsdata = await this.props.fetchAttachmentsWOData(dtlsID, token)
        //Set details first item
        this.setState({detailsId: dtlsID}, () => {
            console.log("setting detailsId: dtlsID")
        })
        console.log(this.state)
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
        if(prevState.targetId !== this.state.targetId || prevState.detailsId !== this.state.detailsId ||  prevState.searchTerm !== this.state.searchTerm) {
            //Set data for DataTable Component
            let searchTerm = this.state.searchTerm
            switch (this.state.targetId) {
                case "emergencyWO":
                    if(this.state.searchTerm.length>0) {
                        let tmp = await this.props.fetchEmergencyWOData()
                        let datatiux = tmp.data?tmp.data.work_orders:[]
                        let datos = datatiux.filter(term => term['description'].toLowerCase().includes(searchTerm.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: datos
                            }
                        } 
                    }else{
                        tmpdata = await this.props.fetchEmergencyWOData()
                    }                    
                    break; 
                case "pendingWO":
                    if(this.state.searchTerm.length>0) {
                        let tmp = await this.props.fetchPendingWOData()
                        let datatiux = tmp.data?tmp.data.work_orders:[]
                        let datos = datatiux.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: datos
                            }
                        } 
                    }else{
                        tmpdata = await this.props.fetchPendingWOData() 
                    }
                    break;                    
                case "assignedWO":
                    if(this.state.searchTerm.length>0) {
                        let tmp = await this.props.fetchAssignedToMeWOData()
                        let datatiux = tmp.data?tmp.data.work_orders:[]
                        let datos = datatiux.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: datos
                            }
                        } 
                    }else{
                        tmpdata = await this.props.fetchAssignedToMeWOData()
                    }                     
                    break;  
                case "unassignedWO":
                    if(this.state.searchTerm.length>0) {
                        let tmp = await this.props.fetchUnassignedWOData()
                        let datatiux = tmp.data?tmp.data.work_orders:[]
                        let datos = datatiux.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: datos
                            }
                        } 
                    }else{
                        tmpdata = await this.props.fetchUnassignedWOData()
                    }                    
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
                dtlsID = tmpdata.data.work_orders[0]!==undefined?tmpdata.data.work_orders[0]['workOrderId']:this.state.detailsId
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
        const globalFunctions = {
            dynamicDetails: this.dynamicDetails,
            dynamicData: this.dynamicData,
            handleSearchTerm: this.handleSearchTerm
        }
        return (
            <GlobalContext.Provider value={globalFunctions}>
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
            </GlobalContext.Provider>                   
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
    fetchHistoryWOData: () => dispatch(fetchHistoryWOData(dtlsID, token)),
    fetchNotesWOData: () => dispatch(fetchNotesWOData(dtlsID, token)),
    fetchAttachmentsWOData: ()=> dispatch(fetchAttachmentsWOData(dtlsID, token)),
})


const WorkOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(WorkOrdersBuilder)

export default WorkOrdersContainer;