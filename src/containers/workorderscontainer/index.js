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
let filterByAssetType
let filterByStatus
let filterByPriority

class WorkOrdersBuilder extends Component {
    constructor() {
        super()
        this.state = {
            targetId: "emergencyWO",
            detailsId: "",
            loading: false,
            searchTerm: "", 
            searchBy: 1,
            filterByAssetType: 1,
            filterByStatus: 1,
            filterByPriority: 1,
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
    /**
     * Description: Details components click events to change
     * depending on datatable row
     * Author: Carlos Blanco
     * Date: 9/24/2020
     * Ticket: ET-351
     * */
    handleDynamicDetails = (target) => {
        dtlsID = target 
        console.log("Details**")
        console.log(dtlsID)
        console.log(this.state)
    }      
    dynamicDetails = (event) => {
        event.preventDefault();
        let target = event.target.id
        if(target.length>0){
            this.setState({
                detailsId: target,
                loading: true
            }, this.handleDynamicDetails(target))
        }else{
            target = event.target.closest('div')
            target = target.id
            this.setState({
                detailsId: target,
                loading: true
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
        //dtlsID = target 
        console.log("Data**")
        console.log(target)
        console.log(dtlsID)
        console.log(this.state)
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
    
    async componentDidMount() {
        token = await this.props.oauthFetchToken()
        ctadata = await this.props.fetchCTAsData()
        tmpdata = await this.props.fetchEmergencyWOData()  
        if(tmpdata.data.work_orders!==undefined) {
            dtlsID = tmpdata.data.work_orders[0]['workOrderId']
        }
        historydata = await this.props.fetchHistoryWOData()
        detailsdata = await this.props.fetchDetailsWOData()
        notesdata = await this.props.fetchNotesWOData()
        warrantydata = await this.props.fetchWarrantyWOData()
        attachmentsdata = await this.props.fetchAttachmentsWOData()
        //Set details first item
        /*
        this.setState({
            detailsId: dtlsID
        })
        */
        console.log("1**")
        console.log(this.state)   
    }
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
            prevState.filterByPriority !== this.state.filterByPriority
        ) {
            //Clean input if lenght is 0
            if(searchTermIn.length===0){
                this.setState({
                    searchTerm: "",
                })
            }            
            //Set data for DataTable Component
            switch (this.state.targetId) {
                case "emergencyWO":
                    if(searchTermIn.length>0 && searchByIn<=1) {
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
                            let dataSearched = dataSearch.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                            tmpdata = {
                                data: {
                                    work_orders: dataSearched
                                }
                            } 
                        }
                    }else if(searchTermIn.length>0 && searchByIn>1){
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
                    }else {
                        tmpdata = await this.props.fetchEmergencyWOData()
                    }                
                    break; 
                case "pendingWO":
                if(searchTermIn.length>0 && searchByIn<=1) {
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
                        let dataSearched = dataSearch.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        } 
                    }
                }else if(searchTermIn.length>0 && searchByIn>1){
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
                if(searchTermIn.length>0 && searchByIn<=1) {
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
                        let dataSearched = dataSearch.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        } 
                    }
                }else if(searchTermIn.length>0 && searchByIn>1){
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
                if(searchTermIn.length>0 && searchByIn<=1) {
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
                        let dataSearched = dataSearch.filter(term => term['description'].includes(searchTerm.toLowerCase()))
                        tmpdata = {
                            data: {
                                work_orders: dataSearched
                            }
                        } 
                    }
                }else if(searchTermIn.length>0 && searchByIn>1){
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
                detailsdata = await this.props.fetchDetailsWOData(dtlsID, token)
                notesdata = await this.props.fetchNotesWOData(dtlsID, token)
                attachmentsdata = await this.props.fetchAttachmentsWOData(dtlsID, token)
                historydata = await this.props.fetchHistoryWOData(dtlsID, token)
                warrantydata = await this.props.fetchWarrantyWOData(dtlsID, token)                  
            }
            //Change details data
            const handleChangePrevState = (dtlsID) => {
                console.log("handleChangePrevState")
                const id = dtlsID
                handleId(id)
            }
            
            if(dtlsID!==prevState.detailsId){
                dtlsID = this.state.detailsId
                console.log(dtlsID)
                console.log(prevState.detailsId)             
                this.setState({detailsId: dtlsID, loading: true}, async () => {
                    detailsdata = await this.props.fetchDetailsWOData()
                    notesdata = await this.props.fetchNotesWOData()
                    warrantydata = await this.props.fetchWarrantyWOData()
                })                
            } else {
                dtlsID = tmpdata.data!==undefined?(tmpdata.data.work_orders!==null?(tmpdata.data.work_orders[0]!==undefined?tmpdata.data.work_orders[0]['workOrderId']:this.state.detailsId):this.state.detailsId):this.state.detailsId
                console.log(dtlsID)
                console.log(prevState.detailsId)     
                this.setState({
                    detailsId: dtlsID,
                    loading: true
                }, handleChangePrevState(dtlsID))                            
            }         
            //Normalize state to avoid missing data or state changes
            this.setState({
                detailsId: dtlsID,
                targetId: this.state.targetId,
                loading: true
            }, async () => {
                console.log("detailsdata")
                detailsdata = await this.props.fetchDetailsWOData()
            })  
            this.setState({
                detailsId: dtlsID,
                targetId: this.state.targetId,
                loading: true
            }, async () => {
                console.log("notesdata")
                notesdata = await this.props.fetchNotesWOData()
            }) 
            this.setState({
                detailsId: dtlsID,
                targetId: this.state.targetId,
                loading: true
            }, async () => {
                console.log("attachmentsdata")
                attachmentsdata = await this.props.fetchAttachmentsWOData()
            }) 
            this.setState({
                detailsId: dtlsID,
                targetId: this.state.targetId,
                loading: true
            }, async () => {
                console.log("historydata")
                historydata = await this.props.fetchHistoryWOData()
            }) 
            this.setState({
                detailsId: dtlsID,
                targetId: this.state.targetId,
                loading: true
            }, async () => {
                console.log("warrantydata")
                warrantydata = await this.props.fetchWarrantyWOData()
            })             
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
            filterByStateAssetType: this.state.filterByAssetType,
            filterByStateStatus: this.state.filterByStatus,
            filterByStatePriority: this.state.filterByPriority,                        
            searchByState: this.state.searchBy,
            searchTermState: this.state.searchTerm,
        }
        return (
            <GlobalContext.Provider value={globalState}>
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