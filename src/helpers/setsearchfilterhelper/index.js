export const setSearchFilterHelper = async({tmpdata, searchTerm, searchTermIn, searchByIn, filterByInByAssetType, filterByInByStatus, filterByInByPriority, currentState, props}) => {
    switch (currentState) {
        /**
         * All "term" arrays elements should be modified in order
         * to work with the new APIs
         */
        //Each case should be the CTA id
        case "emergencyWO":
            if(searchTermIn.length>3 && searchByIn<=1) {
                let tmp = await props.fetchEmergencyWOData()
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
                let tmp = await props.fetchSearchData()
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
                    tmpdata = await props.fetchSearchData()
                }                        
            //Default filter by asset type without search                        
            }else if(filterByInByAssetType.length>0) {
                let tmp = await props.fetchEmergencyWOData()
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
                let tmp = await props.fetchEmergencyWOData()
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
                let tmp = await props.fetchEmergencyWOData()
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
            }else if(searchTermIn.length === 0) {
                tmpdata = await props.fetchEmergencyWOData()
            }                
            break; 
        case "pendingWO":
        if(searchTermIn.length>3 && searchByIn<=1) {
            let tmp = await props.fetchPendingWOData()
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
            let tmp = await props.fetchSearchData()
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
                tmpdata = await props.fetchSearchData()
            }                        
        //Default filter by asset type without search                        
        }else if(filterByInByAssetType.length>0) {
            let tmp = await props.fetchPendingWOData()
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
            let tmp = await props.fetchPendingWOData()
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
            let tmp = await props.fetchPendingWOData()
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
            tmpdata = await props.fetchPendingWOData()
        }                
        break;                   
        case "assignedWO":
        if(searchTermIn.length>3 && searchByIn<=1) {
            let tmp = await props.fetchAssignedToMeWOData()
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
            let tmp = await props.fetchSearchData()
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
                tmpdata = await props.fetchSearchData()
            }                        
        //Default filter by asset type without search                        
        }else if(filterByInByAssetType.length>0) {
            let tmp = await props.fetchAssignedToMeWOData()
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
            let tmp = await props.fetchAssignedToMeWOData()
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
            let tmp = await props.fetchAssignedToMeWOData()
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
            tmpdata = await props.fetchAssignedToMeWOData()
        }                
        break; 
        case "unassignedWO":
        if(searchTermIn.length>3 && searchByIn<=1) {
            let tmp = await props.fetchUnassignedWOData()
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
            let tmp = await props.fetchSearchData()
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
                tmpdata = await props.fetchSearchData()
            }                        
        //Default filter by asset type without search                        
        }else if(filterByInByAssetType.length>0) {
            let tmp = await props.fetchUnassignedWOData()
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
            let tmp = await props.fetchUnassignedWOData()
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
            let tmp = await props.fetchUnassignedWOData()
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
            tmpdata = await props.fetchUnassignedWOData()
        }                
        break;                                                       
        default:
            tmpdata = await props.fetchEmergencyWOData()
            break;
    }
    return tmpdata;
};
