//Basic imports
import React, { Component } from 'react';
import { connect } from "react-redux";

//Components
import { 
    CTASectionComponent, 
    DataTableComponent, 
    WorkOrderDetailsComponent,
    Alert, 
} from '../../components'


//Material UI
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

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
    fetchWarrantyWOData,
    createNoteWOData,
    updateWOStatus,
    fetchServiceProviders,
} from '../../actions';

//Context
import { GlobalContext } from '../../context/globalcontext'


//Declaring global variables
//Token
let token
//User ID
let userId
let userData
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
let trgtID
//Search
let searchTerm
let searchBy
//Warranty
let warrantydata
//Filter
let filterByAssetType
let filterByStatus
let filterByPriority

let newNote
let newNoteAvailable
let noteDescription

let workOrderUpdateResponse
let updatedStatus
let reassignToVal
let serviceProviders

class WorkOrdersBuilder extends Component {
    constructor() {
        super()
        this.state = {
            targetId: "emergencyWO",
            detailsId: "",
            loading: false,
            loadingDetails: false,
            loadingAll: false,
            searchTerm: "", 
            searchBy: 1,
            filterByAssetType: 1,
            filterByStatus: 1,
            filterByPriority: 1,
            newNote: '',
            newNoteAvailable: false,
            noteDescription: '',
            workOrderUpdateResponse: '',
            updatedStatus: '',
            reassignToVal: 1,
            reassignToAvailable: false,
            itsActive: false
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
    handleChangeStateFilterByAssetType = (value) => {
        filterByAssetType = value       
        console.log(filterByAssetType)
    }    
    handleFilterByAssetType = (event) => {
        let value = event.target.value
        this.setState({
            filterByAssetType: value,
        }, this.handleChangeStateFilterByAssetType(value))
    } 
    /**
     * Description: Create Filter Component
     * Author: Carlos Blanco
     * Created: 11/10/2020
     * Ticket: ET-246
     */  
    handleChangeStateFilterByStatus = (value) => {
        filterByStatus = value 
        console.log(filterByStatus)
    }    
    handleFilterByStatus = (event) => {
        let value = event.target.value
        this.setState({
            filterByStatus: value,
        }, this.handleChangeStateFilterByStatus(value))        
    } 
    /**
     * Description: Create Filter Component
     * Author: Carlos Blanco
     * Created: 11/10/2020
     * Ticket: ET-246
     */  
    handleChangeStateFilterByPriority = (value) => {
        filterByPriority = value       
        console.log(filterByPriority)
    }    
    handleFilterByPriority = (event) => {
        let value = event.target.value
        this.setState({
            filterByPriority: value,
        }, this.handleChangeStateFilterByPriority(value))        
    }

    handleChangeStateFilterClearAll = () => {
        filterByPriority = 1;
        filterByStatus = 1;
        filterByAssetType = 1; 
    }

    handleFilterClearAll = (event) => {
        this.setState({
            filterByAssetType: 1,
            filterByStatus: 1,
            filterByPriority: 1,
        }, this.handleChangeStateFilterClearAll()) 
    }

    handleChangeNoteInput = (value) => {
        noteDescription = value;
        console.log("description", noteDescription)
    }
    handleNoteInput = (event) => {
        let value = event.target.value
        this.setState({
            noteDescription: value
        }, this.handleChangeNoteInput(value))
    }

    handleAddNote = (isAvailable) => {
        newNoteAvailable = isAvailable
        console.log(newNoteAvailable)
    }
    createNoteWOData = (event) => {
        this.setState({
            newNoteAvailable: !newNoteAvailable,
            loadingDetails: true
        }, this.handleAddNote(!newNoteAvailable))
    }

    handleChangeReassignToSelect = (value) => {
        reassignToVal = value
        //console.log('reassignToVal', reassignToVal)
    }
    handleReassignToSelect = (event) => {
        console.log("id", event.target)
        let value = event.target.value
        this.setState({
            reassignToVal: value
        }, this.handleChangeReassignToSelect(value))
    }

    handleUpdateStatus = (target) => {
        if(target === "CANCEL"){
            updatedStatus = "CANCELLED"
        } else {
            updatedStatus = target
        }
        console.log("updatedStatus", updatedStatus)
    }
    updateWOStatus = (event) => {
        let target = event.target.parentElement.getAttribute("status")
        if(target !== 'Reassign') {
            target = target.toUpperCase().replace(' ', '_')
            this.setState({
                updatedStatus: target,
                loadingDetails: true,
            }, this.handleUpdateStatus(target))
        } else {
            target = target.toUpperCase().replace(' ', '_')
            this.setState({
                updatedStatus: target,
                reassignToAvailable: !this.state.reassignToAvailable,
                loadingDetails: true,
            }, this.handleUpdateStatus(target))
        }
    }
    /**
     * Description: Details components click events to change
     * depending on datatable row
     * Author: Carlos Blanco
     * Date: 9/24/2020
     * Ticket: ET-351
     * */
    handleDynamicDetails = (target) => {
        dtlsID = target 
    }           
    dynamicDetails = (event) => {
        event.preventDefault();
        let target = event.target.id
        if(target.length>0){
            this.setState({
                detailsId: target,
                loadingDetails: true
            }, this.handleDynamicDetails(target))
        }else{
            target = event.target.closest('div')
            target = target.id
            this.setState({
                detailsId: target,
                loadingDetails: true
            },  this.handleDynamicDetails(target))
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
    handleDynamicData = (target) => {
        trgtID = target
    }      
    dynamicData = (event) => {
        event.preventDefault();
        let target = event.target.id
        if(target.length>0){
            this.setState({
                targetId: target,
                loading: true
            }, this.handleDynamicData(target))
        }else{
            target = event.target.closest('div')
            target = target.id
            this.setState({
                targetId: target,
                loading: true
            }, this.handleDynamicData(target))
        }
        
    }

    // sortByDate = (a, b) => {
    //     a = new Date(a.createdAt)
    //     b = new Date(b.createdAt)
    //     return b - a
    // }

    // sortOrderNotesByDate = () => {
    //     let data = notesdata.data;
    //     let workOrderNotes = [];
    //     let proposalNotes = [];
    //     let invoiceNotes = [];
    //     if(!!notesdata.data.workOrderNotes) {
    //         workOrderNotes = notesdata.data.workOrderNotes.sort(this.sortByDate)
    //         data = {...data, workOrderNotes: workOrderNotes}
    //     }
    //     if(!!notesdata.data.proposalNotes) {
    //         proposalNotes = notesdata.data.proposalNotes.sort(this.sortByDate)
    //         data = {...data, proposalNotes: proposalNotes}
    //     }
    //     if(!!notesdata.data.invoiceNotes) {
    //         invoiceNotes = notesdata.data.invoiceNotes.sort(this.sortByDate);
    //         data = {...data, invoiceNotes: invoiceNotes}
    //     }
    //     notesdata = {...notesdata, data}
    // }
    
    async componentDidMount() {
        token = await this.props.oauthFetchToken()
        /*
        userData = await this.props.fetchUsersInformation()
        console.log(userData.userdata.user)
        userId = userData.userdata.user.user_id   
        */
        //Next line it's to develop in local     
        userId = "2152"
        this.setState({ 
            firstLoading: true
        })
        ctadata = await this.props.fetchCTAsData()
        tmpdata = await this.props.fetchEmergencyWOData()  
        if(tmpdata.data.work_orders!==undefined) {
            dtlsID = tmpdata.data.work_orders[0]['workOrderId']
            this.setState({
                detailsId: dtlsID,
            })
        }
        historydata = await this.props.fetchHistoryWOData()
        detailsdata = await this.props.fetchDetailsWOData()
        notesdata = await this.props.fetchNotesWOData()
        serviceProviders = await this.props.fetchServiceProviders();
        // this.sortOrderNotesByDate()
        warrantydata = await this.props.fetchWarrantyWOData()
        attachmentsdata = await this.props.fetchAttachmentsWOData()
        this.setState({ firstLoading: false })
        trgtID = trgtID===undefined?this.state.targetId:trgtID
    }

    /**
     * handleId() => loads data changes
     * handleAsyncId() => call async functions since cannot be pass through setState as callback
     * handleChangePrevState() => trigger setState 
     * 
     * Author: Carlos Blanco
     * Date: 11/13/2020
     * Ticket: ET-735
     * */
    handleId = async(id) => {
        dtlsID = id
        detailsdata = await this.props.fetchDetailsWOData(dtlsID, token)
        notesdata = await this.props.fetchNotesWOData(dtlsID, token)
        // this.sortOrderNotesByDate()
        attachmentsdata = await this.props.fetchAttachmentsWOData(dtlsID, token)
        historydata = await this.props.fetchHistoryWOData(dtlsID, token)
        warrantydata = await this.props.fetchWarrantyWOData(dtlsID, token)                  
    }

    handleAsyncId = (id) => {
        dtlsID = id
        this.handleId(dtlsID)
    }
    //Change details data
    handleChangePrevState = (id) => {
        dtlsID = id     
        this.setState({
            detailsId: dtlsID,
            loading: true
        }, this.handleAsyncId(id))        
    }
    //move active item to the top of grid
    // array_move = (arr, old_index, new_index) => {
    //     if (new_index >= arr.length) {
    //         let k = new_index - arr.length + 1;
    //         while (k--) {
    //             arr.push(undefined);
    //         }
    //     }
    //     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    //     return arr;
    // };
    // isCurrent = (element) => element.workOrderId.toString() === this.state.detailsId.toString();

    async componentDidUpdate(prevProps, prevState) {
        
        const searchTermIn = this.state.searchTerm
        const searchByIn = this.state.searchBy  
        const filterByInByAssetType = this.state.filterByAssetType
        const filterByInByStatus = this.state.filterByStatus
        const filterByInByPriority = this.state.filterByPriority
        if(
            prevState.targetId !== this.state.targetId ||
            prevState.detailsId !== this.state.detailsId ||
            prevState.searchTerm !== this.state.searchTerm ||
            prevState.searchBy !== this.state.searchBy ||
            prevState.filterByAssetType !== this.state.filterByAssetType ||
            prevState.filterByStatus !== this.state.filterByStatus ||
            prevState.filterByPriority !== this.state.filterByPriority ||
            prevState.newNoteAvailable !== this.state.newNoteAvailable ||
            prevState.updatedStatus !== this.state.updatedStatus ||
            prevState.reassignToAvailable !== this.state.reassignToAvailable
        ) {
            this.setState({loading: true})
            //Clean input if lenght is 0
            if(searchTermIn.length===0) {
                this.setState({
                    searchTerm: "",
                })
            }        
            //Set data for DataTable Component
            switch (this.state.targetId) {
                case "emergencyWO":
                    if(searchTermIn.length>3 && searchByIn<=1) {
                        let tmp = await this.props.fetchEmergencyWOData()
                        let dataSearch = tmp.data?tmp.data.work_orders:[]
                        if(filterByInByAssetType.length>0){
                            let dataSearched = dataSearch.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                            dataSearched = dataSearched.filter(term => term['asset']['assetType']['description'].toLowerCase().includes(filterByInByAssetType.toLowerCase()))
                            if(filterByInByPriority.length>0) {
                                dataSearched = dataSearched.filter(term => {
                                    let notNull = term['priority']!==null?term['priority']['description']:""
                                    return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                                })
                            } else if(filterByInByStatus.length>0) {
                                dataSearched = dataSearched.filter(term => {
                                    let notNull = term['status']!==null?term['status']['description']:""
                                    return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                                })                         
                            }
                            tmpdata = {
                                data: {
                                    work_orders: dataSearched
                                }
                            }                            
                        } else {
                            let dataSearched = dataSearch.filter(term => term['workOrderId'].toString().includes(searchTerm))
                            console.log(dataSearched)
                            tmpdata = {
                                data: {
                                    work_orders: dataSearched
                                }
                            } 
                        }
                    }else if(searchTermIn.length>3 && searchByIn>1){
                        let tmp = await this.props.fetchSearchData()
                        let dataSearched = tmp.data?tmp.data.work_orders:[]                        
                        if(filterByInByPriority.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['priority']!==null?term['priority']['description']:""
                                return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                            })
                            tmpdata = {
                                data: {
                                    work_orders: dataSearched
                                }
                            }                             
                        } else if(filterByInByStatus.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['status']!==null?term['status']['description']:""
                                return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                            })
                            tmpdata = {
                                data: {
                                    work_orders: dataSearched
                                }
                            }                                                      
                        } else if(filterByInByAssetType.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                                return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                            })
                            tmpdata = {
                                data: {
                                    work_orders: dataSearched
                                }
                            }   
                        } else {
                            tmpdata = await this.props.fetchSearchData()
                        }                        
                    //Default filter by asset type without search                        
                    }else if(filterByInByAssetType.length>0) {
                        let tmp = await this.props.fetchEmergencyWOData()
                        let dataSearch = tmp.data?tmp.data.work_orders:[]
                        let dataSearched = dataSearch.filter(term => {
                            let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                            return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                        })
                        if(filterByInByPriority.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['priority']!==null?term['priority']['description']:""
                                return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                            })
                        } else if(filterByInByStatus.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['status']!==null?term['status']['description']:""
                                return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                            })                         
                        }                        
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }
                    //Default filter by status without search   
                    }else if(filterByInByStatus.length>0) {
                        let tmp = await this.props.fetchEmergencyWOData()
                        let dataSearch = tmp.data?tmp.data.work_orders:[]
                        let dataSearched = dataSearch.filter(term => {
                            let notNull = term['status']!==null?term['status']['description']:""
                            return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                        })
                        if(filterByInByAssetType.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                                return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                            })
                        } else if(filterByInByPriority.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['priority']!==null?term['priority']['description']:""
                                return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                            })                         
                        }                        
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }  
                    //Default filter by priority without search   
                    }else if(filterByInByPriority.length>0) {
                        let tmp = await this.props.fetchEmergencyWOData()
                        let dataSearch = tmp.data?tmp.data.work_orders:[]
                        let dataSearched = dataSearch.filter(term => {
                            let notNull = term['priority']!==null?term['priority']['description']:""
                            return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                        })
                        if(filterByInByAssetType.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                                return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                            })
                        } else if(filterByInByStatus.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['status']!==null?term['status']['description']:""
                                return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                            })                         
                        }                        
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }                                              
                    }else if(searchTermIn.length === 0 && this.state.firstLoading === false) {
                        tmpdata = await this.props.fetchEmergencyWOData()
                    }                
                    break; 
                case "pendingWO":
                if(searchTermIn.length>3 && searchByIn<=1) {
                    let tmp = await this.props.fetchPendingWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    if(filterByInByAssetType.length>0){
                        let dataSearched = dataSearch.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        dataSearched = dataSearched.filter(term => term['asset']['assetType']['description'].toLowerCase().includes(filterByInByAssetType.toLowerCase()))
                        if(filterByInByPriority.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['priority']!==null?term['priority']['description']:""
                                return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                            })
                        } else if(filterByInByStatus.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['status']!==null?term['status']['description']:""
                                return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                            })                         
                        }
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }                            
                    } else {
                        let dataSearched = dataSearch.filter(term => term['workOrderId'].toString().includes(searchTerm))
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        } 
                    }
                }else if(searchTermIn.length>3 && searchByIn>1){
                    let tmp = await this.props.fetchSearchData()
                    let dataSearched = tmp.data?tmp.data.work_orders:[]                        
                    if(filterByInByPriority.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['priority']!==null?term['priority']['description']:""
                            return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                        })
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }                             
                    } else if(filterByInByStatus.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['status']!==null?term['status']['description']:""
                            return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                        })
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }                                                      
                    } else if(filterByInByAssetType.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                            return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                        })
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }   
                    } else {
                        tmpdata = await this.props.fetchSearchData()
                    }                        
                //Default filter by asset type without search                        
                }else if(filterByInByAssetType.length>0) {
                    let tmp = await this.props.fetchPendingWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    let dataSearched = dataSearch.filter(term => {
                        let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                        return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                    })
                    if(filterByInByPriority.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['priority']!==null?term['priority']['description']:""
                            return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                        })
                    } else if(filterByInByStatus.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['status']!==null?term['status']['description']:""
                            return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                        })                         
                    }                        
                    tmpdata = {
                        data: {
                            work_orders: dataSearched
                        }
                    }
                //Default filter by status without search   
                }else if(filterByInByStatus.length>0) {
                    let tmp = await this.props.fetchPendingWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    let dataSearched = dataSearch.filter(term => {
                        let notNull = term['status']!==null?term['status']['description']:""
                        return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                    })
                    if(filterByInByAssetType.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                            return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                        })
                    } else if(filterByInByPriority.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['priority']!==null?term['priority']['description']:""
                            return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                        })                         
                    }                        
                    tmpdata = {
                        data: {
                            work_orders: dataSearched
                        }
                    }  
                //Default filter by priority without search   
                }else if(filterByInByPriority.length>0) {
                    let tmp = await this.props.fetchPendingWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    let dataSearched = dataSearch.filter(term => {
                        let notNull = term['priority']!==null?term['priority']['description']:""
                        return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                    })
                    if(filterByInByAssetType.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                            return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                        })
                    } else if(filterByInByStatus.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['status']!==null?term['status']['description']:""
                            return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                        })                         
                    }                        
                    tmpdata = {
                        data: {
                            work_orders: dataSearched
                        }
                    }                                              
                }else {
                    tmpdata = await this.props.fetchPendingWOData()
                }                
                break;                   
                case "assignedWO":
                if(searchTermIn.length>3 && searchByIn<=1) {
                    let tmp = await this.props.fetchAssignedToMeWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    if(filterByInByAssetType.length>0){
                        let dataSearched = dataSearch.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        dataSearched = dataSearched.filter(term => term['asset']['assetType']['description'].toLowerCase().includes(filterByInByAssetType.toLowerCase()))
                        if(filterByInByPriority.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['priority']!==null?term['priority']['description']:""
                                return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                            })
                        } else if(filterByInByStatus.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['status']!==null?term['status']['description']:""
                                return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                            })                         
                        }
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }                            
                    } else {
                        let dataSearched = dataSearch.filter(term => term['workOrderId'].toString().includes(searchTerm))
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        } 
                    }
                }else if(searchTermIn.length>3 && searchByIn>1){
                    let tmp = await this.props.fetchSearchData()
                    let dataSearched = tmp.data?tmp.data.work_orders:[]                        
                    if(filterByInByPriority.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['priority']!==null?term['priority']['description']:""
                            return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                        })
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }                             
                    } else if(filterByInByStatus.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['status']!==null?term['status']['description']:""
                            return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                        })
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }                                                      
                    } else if(filterByInByAssetType.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                            return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                        })
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }   
                    } else {
                        tmpdata = await this.props.fetchSearchData()
                    }                        
                //Default filter by asset type without search                        
                }else if(filterByInByAssetType.length>0) {
                    let tmp = await this.props.fetchAssignedToMeWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    let dataSearched = dataSearch.filter(term => {
                        let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                        return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                    })
                    if(filterByInByPriority.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['priority']!==null?term['priority']['description']:""
                            return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                        })
                    } else if(filterByInByStatus.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['status']!==null?term['status']['description']:""
                            return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                        })                         
                    }                        
                    tmpdata = {
                        data: {
                            work_orders: dataSearched
                        }
                    }
                //Default filter by status without search   
                }else if(filterByInByStatus.length>0) {
                    let tmp = await this.props.fetchAssignedToMeWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    let dataSearched = dataSearch.filter(term => {
                        let notNull = term['status']!==null?term['status']['description']:""
                        return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                    })
                    if(filterByInByAssetType.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                            return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                        })
                    } else if(filterByInByPriority.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['priority']!==null?term['priority']['description']:""
                            return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                        })                         
                    }                        
                    tmpdata = {
                        data: {
                            work_orders: dataSearched
                        }
                    }  
                //Default filter by priority without search   
                }else if(filterByInByPriority.length>0) {
                    let tmp = await this.props.fetchAssignedToMeWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    let dataSearched = dataSearch.filter(term => {
                        let notNull = term['priority']!==null?term['priority']['description']:""
                        return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                    })
                    if(filterByInByAssetType.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                            return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                        })
                    } else if(filterByInByStatus.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['status']!==null?term['status']['description']:""
                            return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                        })                         
                    }                        
                    tmpdata = {
                        data: {
                            work_orders: dataSearched
                        }
                    }                                              
                }else {
                    tmpdata = await this.props.fetchAssignedToMeWOData()
                }                
                break; 
                case "unassignedWO":
                if(searchTermIn.length>3 && searchByIn<=1) {
                    let tmp = await this.props.fetchUnassignedWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    if(filterByInByAssetType.length>0){
                        let dataSearched = dataSearch.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        dataSearched = dataSearched.filter(term => term['asset']['assetType']['description'].toLowerCase().includes(filterByInByAssetType.toLowerCase()))
                        if(filterByInByPriority.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['priority']!==null?term['priority']['description']:""
                                return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                            })
                        } else if(filterByInByStatus.length>0) {
                            dataSearched = dataSearched.filter(term => {
                                let notNull = term['status']!==null?term['status']['description']:""
                                return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                            })                         
                        }
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }                            
                    } else {
                        let dataSearched = dataSearch.filter(term => term['workOrderId'].toString().includes(searchTerm))
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        } 
                    }
                }else if(searchTermIn.length>3 && searchByIn>1){
                    let tmp = await this.props.fetchSearchData()
                    let dataSearched = tmp.data?tmp.data.work_orders:[]                        
                    if(filterByInByPriority.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['priority']!==null?term['priority']['description']:""
                            return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                        })
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }                             
                    } else if(filterByInByStatus.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['status']!==null?term['status']['description']:""
                            return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                        })
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }                                                      
                    } else if(filterByInByAssetType.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                            return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                        })
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        }   
                    } else {
                        tmpdata = await this.props.fetchSearchData()
                    }                        
                //Default filter by asset type without search                        
                }else if(filterByInByAssetType.length>0) {
                    let tmp = await this.props.fetchUnassignedWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    let dataSearched = dataSearch.filter(term => {
                        let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                        return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                    })
                    if(filterByInByPriority.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['priority']!==null?term['priority']['description']:""
                            return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                        })
                    } else if(filterByInByStatus.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['status']!==null?term['status']['description']:""
                            return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                        })                         
                    }                        
                    tmpdata = {
                        data: {
                            work_orders: dataSearched
                        }
                    }
                //Default filter by status without search   
                }else if(filterByInByStatus.length>0) {
                    let tmp = await this.props.fetchUnassignedWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    let dataSearched = dataSearch.filter(term => {
                        let notNull = term['status']!==null?term['status']['description']:""
                        return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                    })
                    if(filterByInByAssetType.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                            return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                        })
                    } else if(filterByInByPriority.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['priority']!==null?term['priority']['description']:""
                            return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                        })                         
                    }                        
                    tmpdata = {
                        data: {
                            work_orders: dataSearched
                        }
                    }  
                //Default filter by priority without search   
                }else if(filterByInByPriority.length>0) {
                    let tmp = await this.props.fetchUnassignedWOData()
                    let dataSearch = tmp.data?tmp.data.work_orders:[]
                    let dataSearched = dataSearch.filter(term => {
                        let notNull = term['priority']!==null?term['priority']['description']:""
                        return notNull.toLowerCase().includes(filterByInByPriority.toLowerCase())
                    })
                    if(filterByInByAssetType.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                            return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                        })
                    } else if(filterByInByStatus.length>0) {
                        dataSearched = dataSearched.filter(term => {
                            let notNull = term['status']!==null?term['status']['description']:""
                            return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                        })                         
                    }                        
                    tmpdata = {
                        data: {
                            work_orders: dataSearched
                        }
                    }                                              
                }else {
                    tmpdata = await this.props.fetchUnassignedWOData()
                }                
                break;                                                       
                default:
                    tmpdata = await this.props.fetchEmergencyWOData()
                    break;
            }

            const handleId = async(dtlsID) => {
                if(this.state.firstLoading === false) {
                    detailsdata = await this.props.fetchDetailsWOData(dtlsID, token)
                    notesdata = await this.props.fetchNotesWOData(dtlsID, token)
                    serviceProviders = await this.props.fetchServiceProviders(dtlsID, token);
                    // this.sortOrderNotesByDate()
                    attachmentsdata = await this.props.fetchAttachmentsWOData(dtlsID, token)
                    historydata = await this.props.fetchHistoryWOData(dtlsID, token)
                    warrantydata = await this.props.fetchWarrantyWOData(dtlsID, token)
                }
                this.setState({loadingDetails: false})
            }
            //Change details data
            const handleChangePrevState = (dtlsID) => {
                const id = dtlsID
                handleId(id)
            }

            // let currentIndex =  tmpdata.data.work_orders.findIndex(this.isCurrent);
            // if(currentIndex === -1) currentIndex = 0
            // this.array_move(tmpdata.data.work_orders, currentIndex, 0)

            const prevSteDtls = prevState.detailsId
            const currentSteDtls = this.state.detailsId
            const tmpDtls = tmpdata.data!==undefined?
                                (tmpdata.data.work_orders!==null?
                                    (tmpdata.data.work_orders[0]!==undefined?
                                        tmpdata.data.work_orders[0]['workOrderId']:
                                        dtlsID):dtlsID):
                                        dtlsID
            //Choose if details preview it's based on the first response element or the selected by the user when clicks the row
            if( prevSteDtls !== ''){
                if( prevSteDtls !== currentSteDtls ) {
                    this.setState({
                        detailsId: dtlsID,
                        loadingDetails: true
                    }, handleChangePrevState(dtlsID)) 
                } else {
                    dtlsID = tmpDtls             
                    this.setState({
                        detailsId: dtlsID,
                    }, handleChangePrevState(dtlsID))    
                }
            }
            
            const prevNoteStatus = prevState.newNoteAvailable
            const currentNoteStatus = this.state.newNoteAvailable
            if( prevNoteStatus !== currentNoteStatus) {
                newNote = await this.props.createNoteWOData(noteDescription, dtlsID, token, userId)
                this.setState({
                    newNote: newNote.data,
                    loadingDetails: true
                }, handleChangePrevState(dtlsID))
            }

            const prevUpdatedStatus = prevState.updatedStatus
            const currentUpdatedStatus = this.state.updatedStatus
            if( prevUpdatedStatus !== currentUpdatedStatus) {
                console.log("USERID", userId)
                workOrderUpdateResponse = await this.props.updateWOStatus(dtlsID, token, updatedStatus, reassignToVal, userId)
                if(workOrderUpdateResponse) {
                    this.setState({
                        workOrderUpdateResponse: workOrderUpdateResponse,
                        loadingDetails: true
                    }, handleChangePrevState(dtlsID))
                } else {
                    alert("Server Error Occured")
                }
            }

            // console.log("dltsID", this.state.deta)
            //Normalize state to avoid missing data or state changes
            this.setState({
                detailsId: dtlsID,
                targetId: this.state.targetId,
                loading: false
            }, handleChangePrevState(dtlsID)) 
            
        }
    }
    render() {

        const globalState = {
            dynamicDetails: this.dynamicDetails,
            dynamicData: this.dynamicData,
            handleSearchTerm: this.handleSearchTerm,
            handleSearchBy: this.handleSearchBy,
            handleFilterByAssetType: this.handleFilterByAssetType,
            handleFilterByStatus: this.handleFilterByStatus,
            handleFilterByPriority: this.handleFilterByPriority,
            handleFilterClearAll: this.handleFilterClearAll,
            createNoteWOData: this.createNoteWOData,
            updateWOStatus: this.updateWOStatus,
            handleNoteInput: this.handleNoteInput,
            handleReassignToSelect: this.handleReassignToSelect,
            reassignToVal: this.state.reassignToVal,
            currentDtlsId: this.state.detailsId,
            noteDescription: this.state.noteDescription,
            filterByStateAssetType: this.state.filterByAssetType,
            filterByStateStatus: this.state.filterByStatus,
            filterByStatePriority: this.state.filterByPriority,                        
            searchByState: this.state.searchBy,
            searchTermState: this.state.searchTerm,
        }
        return (
            <GlobalContext.Provider value={globalState}>
                <div className="work-orders-container">
                    <Alert severity="warning" variant="filled">
                        <Link href="/admin/WorkOrders" target="_blank" rel="noopener" color="inherit">
                            <i>Missing Something? Go to the Old Version</i>
                        </Link>
                    </Alert>
                    <Grid className="cta-section-component">
                        <CTASectionComponent 
                            ctadata={ctadata}
                            tmpdata={tmpdata}
                            targetdata={trgtID} 
                        />
                    </Grid>            
                    <Grid container className="content-section">
                        <Grid item xs={12} md={7} lg={7}>
                            <DataTableComponent
                                tmpdata={tmpdata}
                                loading={this.state.loading}
                                firstLoading={this.state.firstLoading}
                            />
                        </Grid>        
                        <Grid item xs={12} md={5} lg={5}>
                            <WorkOrderDetailsComponent
                                loadingDetails={this.state.loadingDetails}
                                detailsdata={detailsdata}
                                history={historydata} 
                                attachments={attachmentsdata} 
                                notes={notesdata}
                                serviceProviders={serviceProviders}
                                firstLoading={this.state.firstLoading}
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
    fetchCTAsData: () => dispatch(fetchCTAsData(token, userId)),   
    fetchSearchData: () => dispatch(fetchSearchData(searchTerm, searchBy, token, userId)),   
    fetchWarrantyWOData: () => dispatch(fetchWarrantyWOData(dtlsID, token)),   
    fetchPendingWOData: () => dispatch(fetchPendingWOData(token, userId)),
    fetchEmergencyWOData: () => dispatch(fetchEmergencyWOData(token, userId)),
    fetchUsersInformation: () => dispatch(fetchUsersInformation(token)),
    fetchDetailsWOData: () => dispatch(fetchDetailsWOData(dtlsID, token)),
    updateWOStatus: () => dispatch(updateWOStatus(dtlsID, token, updatedStatus, reassignToVal, userId)),
    fetchServiceProviders: () => dispatch(fetchServiceProviders(dtlsID, token)),
    fetchAssignedToMeWOData: () => dispatch(fetchAssignedToMeWOData(token, userId)),
    fetchUnassignedWOData: () => dispatch(fetchUnassignedWOData(token, userId)),
    fetchHistoryWOData: () => dispatch(fetchHistoryWOData(dtlsID, token)),
    fetchNotesWOData: () => dispatch(fetchNotesWOData(dtlsID, token)),
    createNoteWOData: () => dispatch(createNoteWOData(noteDescription, dtlsID, token, userId)),
    fetchAttachmentsWOData: ()=> dispatch(fetchAttachmentsWOData(dtlsID, token)),
})


const WorkOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(WorkOrdersBuilder)

export default WorkOrdersContainer;