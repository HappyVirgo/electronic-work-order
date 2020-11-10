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
    fetchSearchData,
    fetchEmergencyWOData, 
    fetchPendingWOData, 
    fetchDetailsWOData,
    fetchAssignedToMeWOData,
    fetchUnassignedWOData,
    fetchHistoryWOData,
    fetchNotesWOData,
    fetchAttachmentsWOData,
    fetchWarrantyWOData
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
//Search
let searchTerm
let searchBy
//Warranty
let warrantydata
//Filter
let filterBy

class WorkOrdersBuilder extends Component {
    constructor() {
        super()
        this.state = {
            targetId: "emergencyWO",
            detailsId: "",
            loading: false,
            searchTerm: "", 
            searchBy: 1,
            filterBy: ""
        };
    }    
    /**
     * Description: Set state based on search input 
     * Author: Carlos Blanco
     * Date: 10/29/2020
     * Ticket: ET-237
     * */
    handleChangeStateSearchTerm = (value) => {
        searchTerm = value     
    }
    handleSearchTerm = (event) => {
        let value = event.target.value
        this.setState({
            searchTerm: value,
        }, this.handleChangeStateSearchTerm(value));
    } 
    /**
     * Description: Set state based on search select 
     * Author: Carlos Blanco
     * Date: 10/30/2020
     * Ticket: ET-237
     * */    
    handleChangeStateSearchBy = (value) => {
        searchBy = value  
    }    
    handleSearchBy = (event) => {
        let value = event.target.value
        this.setState({
            searchBy: value
        }, this.handleChangeStateSearchBy(value));
    }
/**
 * Description: Create Filter Component
 * Author: Carlos Blanco
 * Created: 11/06/2020
 * Ticket: ET-246
 */  
    handleChangeStateFilterBy = (value) => {
        filterBy = value 
        console.log(filterBy) 
        console.log(filterBy.length)
    }    
    handleFilterBy = (event) => {
        let value = event.target.value
        this.setState({
            filterBy: value
        }, this.handleChangeStateFilterBy(value));
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
        warrantydata = await this.props.fetchWarrantyWOData(dtlsID, token)
        attachmentsdata = await this.props.fetchAttachmentsWOData(dtlsID, token)
        //Set details first item
        this.setState({
            detailsId: dtlsID
        })
    }
    async componentDidUpdate(prevProps, prevState) {
        const searchTermIn = this.state.searchTerm
        const searchByIn = this.state.searchBy  
        const filterByIn = this.state.filterBy

        if(
        prevState.targetId !== this.state.targetId ||
        prevState.detailsId !== this.state.detailsId ||
        prevState.searchTerm !== this.state.searchTerm ||
        prevState.searchBy !== this.state.searchBy ||
        prevState.filterBy !== this.state.filterBy
        ) {
            //Clean input if lenght is 0
            if(searchTermIn.length===0){
                this.setState({
                    searchTerm: ""
                })
            }      
            //Set data for DataTable Component
            switch (this.state.targetId) {
                case "emergencyWO":
                    if(searchTermIn.length>0 && searchByIn<=1) {
                        let tmp = await this.props.fetchEmergencyWOData()
                        let dataSearch = tmp.data?tmp.data.work_orders:[]
                        let dataSearched = dataSearch.filter(term => term['description'].toLowerCase().includes(searchTermIn.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }
                    }else if(searchTermIn.length>0 && searchByIn>1){
                        tmpdata = await this.props.fetchSearchData()
                    }else if(filterByIn.length>0) {
                        let tmp = await this.props.fetchEmergencyWOData()
                        let dataSearch = tmp.data?tmp.data.work_orders:[]
                        let dataSearched = dataSearch.filter(term => term['description'].toLowerCase().includes(filterByIn.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }
                    }else {
                        tmpdata = await this.props.fetchEmergencyWOData()
                    }                
                    break; 
                case "pendingWO":
                    if(searchTermIn.length>0 && searchByIn<=1) {
                        let tmp = await this.props.fetchPendingWOData()
                        let dataSearch = tmp.data?tmp.data.work_orders:[]
                        let dataSearched = dataSearch.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        } 
                    }else if(searchTermIn.length>0 && searchByIn>1){
                        tmpdata = await this.props.fetchSearchData()
                    }else {
                        tmpdata = await this.props.fetchPendingWOData()
                    } 
                    break;                    
                case "assignedWO":
                    if(searchTermIn.length>0 && searchByIn<=1) {
                        let tmp = await this.props.fetchAssignedToMeWOData()
                        let dataSearch = tmp.data?tmp.data.work_orders:[]
                        let dataSearched = dataSearch.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }
                    }else if(searchTermIn.length>0 && searchByIn>1){
                        tmpdata = await this.props.fetchSearchData()
                    }else {
                        tmpdata = await this.props.fetchAssignedToMeWOData()
                    }                    
                    break;  
                case "unassignedWO":
                    if(searchTermIn.length>0 && searchByIn<=1) {
                        let tmp = await this.props.fetchUnassignedWOData()
                        let dataSearch = tmp.data?tmp.data.work_orders:[]
                        let dataSearched = dataSearch.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        } 
                    }else if(searchTermIn.length>0 && searchByIn>1){
                        tmpdata = await this.props.fetchSearchData()
                    }else {
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
                    detailsdata = await this.props.fetchDetailsWOData()
                    notesdata = await this.props.fetchNotesWOData()
                    warrantydata = await this.props.fetchWarrantyWOData()
                })                
            } else {
                dtlsID = tmpdata.data!==undefined?(tmpdata.data.work_orders!==null?(tmpdata.data.work_orders[0]!==undefined?tmpdata.data.work_orders[0]['workOrderId']:this.state.detailsId):this.state.detailsId):this.state.detailsId
                this.setState({detailsId: dtlsID, loading: true}, async () => {
                    detailsdata = await this.props.fetchDetailsWOData()
                    notesdata = await this.props.fetchNotesWOData()
                    warrantydata = await this.props.fetchWarrantyWOData()
                })                            
            }           
            //Normalize state to avoid missing data or state changes
            this.setState({
                detailsId: dtlsID,
                targetId: this.state.targetId,
                loading: true
            }, async () => {
                detailsdata = await this.props.fetchDetailsWOData()
            })  
            this.setState({
                detailsId: dtlsID,
                targetId: this.state.targetId,
                loading: true
            }, async () => {
                notesdata = await this.props.fetchNotesWOData()
                
            }) 
            this.setState({
                detailsId: dtlsID,
                targetId: this.state.targetId,
                loading: true
            }, async () => {
                warrantydata = await this.props.fetchWarrantyWOData()
            })             
        }
    }
    render() {
        const globalFunctions = {
            dynamicDetails: this.dynamicDetails,
            dynamicData: this.dynamicData,
            handleSearchTerm: this.handleSearchTerm,
            handleSearchBy: this.handleSearchBy,
            handleFilterBy: this.handleFilterBy,
            filterByState: this.state.filterBy,
            searchByState: this.state.searchBy,
            searchTermState: this.state.searchTerm
        }
        return (
            <GlobalContext.Provider value={globalFunctions}>
                <div className="work-orders-container">
                    <Grid className="cta-section-component">
                        <CTASectionComponent 
                            ctadata={ctadata}
                            tmpdata={tmpdata} 
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
                                warranty={warrantydata}
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
    fetchSearchData: () => dispatch(fetchSearchData(searchTerm, searchBy, token)),   
    fetchWarrantyWOData: () => dispatch(fetchWarrantyWOData(dtlsID, token)),   
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