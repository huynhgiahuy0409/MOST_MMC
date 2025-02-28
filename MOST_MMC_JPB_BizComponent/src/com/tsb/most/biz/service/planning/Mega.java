package com.tsb.most.biz.service.planning;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.common.ISearchVesselCallDao;
import com.tsb.most.basebiz.parm.common.SearchVesselCallListParm;
import com.tsb.most.biz.dao.planning.IMegaDao;
import com.tsb.most.biz.dao.planning.IStaffAndDeploymentDao;
import com.tsb.most.biz.dataitem.planning.MegaItem;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.biz.parm.planning.SearchStaffAndDeploymentParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class Mega extends MOSTBaseService implements IMega{
	private IMegaDao megaDao;
	private IStaffAndDeploymentDao staffAndDeploymentDao;
	private ISearchVesselCallDao searchVesselCallDao;
	
	public void setMegaDao(IMegaDao megaDao) {
		this.megaDao = megaDao;
	}

	public void setStaffAndDeploymentDao(IStaffAndDeploymentDao staffAndDeploymentDao) {
		this.staffAndDeploymentDao = staffAndDeploymentDao;
	}

	public void setSearchVesselCallDao(ISearchVesselCallDao searchVesselCallDao) {
		this.searchVesselCallDao = searchVesselCallDao;
	}

	public DataItemList selectMegaList(SearchMegaParm parm) throws BizException {
        return megaDao.selectMegaList(parm);
    }
    
	public DataItemList selectMegaCgDtlList(SearchMegaParm parm) throws BizException {
        return megaDao.selectMegaCgDtlList(parm);
    }
	
    public DataItemList selectMegaWarehouseSnDoList(SearchMegaParm parm) throws BizException {
        return megaDao.selectShippingNoteList(parm);
    }

    public DataItemList selectMegaPenaltyList(SearchMegaParm parm) throws BizException {
    	DataItemList returnItems = new DataItemList();
        List list = null;
        
        if (parm.getSearchType().equals("sndolist")) {
            if (parm.getDivCd().equals("SN")) {
                list = megaDao.selectShippingNoteList(parm).getCollection();
            } else if (parm.getDivCd().equals("DO")) {
                list = megaDao.selectDeliveryOrderList(parm).getCollection();
            }
        } else if (parm.getSearchType().equals("penalty")) {
            list = megaDao.selectPenaltyCode(parm).getCollection();
        }
        
        returnItems.setCollection(list);

        return returnItems;
    }

    public DataItemList selectMegaEquipmentList(SearchMegaParm parm) throws BizException {
        return megaDao.selectMegaEquipmentList(parm);
    }
    
    public DataItemList selectMegaVesselCallId(SearchMegaParm parm) throws BizException {
    	SearchVesselCallListParm vslParam = new SearchVesselCallListParm();
    	DataItemList list = new DataItemList();
    	
    	vslParam.setVslCallId(parm.getVslCallId() == null ? "" : parm.getVslCallId());
		
        return searchVesselCallDao.selectSearchVesselCallId(vslParam);
    }
    
    public DataItemList selectValidationCode(SearchMegaParm parm) throws BizException {
		return megaDao.selectValidationCode(parm);
	}
    
    public DataItemList selectConfirmationSlipDryBreakBulk(SearchMegaParm parm) throws BizException {
        return megaDao.selectConfirmationSlipDryBreakBulk(parm);
    }
    
    public DataItemList selectMegaManpowerList(SearchMegaParm parm) throws BizException {
        return megaDao.selectMegaManpowerList(parm);
    }
    
    public DataItemList selectMegaDetailList(SearchMegaParm parm) throws BizException {
        return megaDao.selectMegaDetailList(parm);
    }
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
    	DataItemList returnList = new DataItemList();
    	DataItemList items = parm.getInsertItems();
        MegaItem insMegaItem = (MegaItem)items.get(0);
        SearchMegaParm parms = new SearchMegaParm();
        String tempRefNo = null;
        
        parms.setPurpTpCd(insMegaItem.getPurpTpCd());
        
        tempRefNo = insMegaItem.getRefNo();
        
        List list = megaDao.selectMaxMegaNoList(parms).getCollection();
        
        MegaItem maxMegaItem = (MegaItem) list.get(0);
        
        insMegaItem.setPurpType(maxMegaItem.getPurpType());
        
        if (insMegaItem.getMegaTpCd().equals(CodeConstant.MT_MGTPCD_A)) {
        	UpdateItemsBizParm updateBizParm = new UpdateItemsBizParm();
        	updateBizParm.setUpdateItems(items);
            
        	megaDao.updateMegaHistoryMasterItems(updateBizParm);
        }
        
        insMegaItem.setMegaNo(maxMegaItem.getMegaNo());
        
        if (tempRefNo != null && !"".equals(tempRefNo)) {
            insMegaItem.setRefNo(tempRefNo);
        }else{
            insMegaItem.setRefNo(maxMegaItem.getMegaNo());
        }
        
    	returnList = megaDao.insertMegaItems(parm);

    	insertMegaDetail(parm, insMegaItem, maxMegaItem);
    	
    	return returnList;
    }
    
    private DataItemList insertMegaDetail(InsertItemsBizParm parm, MegaItem insMegaItem, MegaItem maxMegaItem) throws BizException{
		DataItemList returnList = new DataItemList();

		returnList = megaDao.insertMegaDetailItems(parm);
		
		List<Object> equipmentItems = this.getOprInfoItems(insMegaItem, CodeConstant.MT_MGDIV_EQ);
		MegaItem equipmentMega = new MegaItem();
		equipmentMega.setUserId(insMegaItem.getUserId());
		equipmentMega.setInsertType("equipment");
		equipmentMega.setCollection(equipmentItems);
		equipmentMega.setMegaNo(maxMegaItem.getMegaNo());
		//Insert Equipment
		processMegaDtlEquipment(equipmentMega);
		
		List<Object> stevedoreTrimmingItems = this.getOprInfoItems(insMegaItem, CodeConstant.MT_MGDIV_MP);
		MegaItem stevedoreTrimmingMega = new MegaItem();
        stevedoreTrimmingMega.setUserId(insMegaItem.getUserId());
        stevedoreTrimmingMega.setMegaNo(maxMegaItem.getMegaNo());
        stevedoreTrimmingMega.setCollection(stevedoreTrimmingItems);
        //Insert Stevedore, Trimming
        processMegaDtlManpower(stevedoreTrimmingMega);
        
        insMegaItem.setMegaNo(insMegaItem.getMegaNo());
        insMegaItem.setVslCallId(insMegaItem.getVslCallId());
        insMegaItem.setPurpTpCd(insMegaItem.getPurpTpCd());
        insMegaItem.setStatCdNm(this.getMegaStatName(insMegaItem));
        insMegaItem.setViewType("UPDATE");
        insMegaItem.setStatCd(insMegaItem.getStatCd());
        insMegaItem.setPurpType(insMegaItem.getPurpType());
        insMegaItem.setMegaTpCd(insMegaItem.getMegaTpCd());
        insMegaItem.setUserMegaYn(insMegaItem.getUserMegaYn());
        insMegaItem.setWhApprYn(insMegaItem.getWhApprYn());
        
        returnList.add(insMegaItem);
    	
    	return returnList;
    }
    
    private String getMegaStatName(MegaItem item) {
    	if(item.getStatCd().equals(CodeConstant.MT_MEGASTAT_SU)) {
    		if(StringUtils.isEmpty((item.getAmdBy()))){
    			return "Submitted";
    		} else {
    			return "Submitted Amend";
    		}
    	} else if (item.getStatCd().equals(CodeConstant.MT_MEGASTAT_AP)) {
    		return "Approved";
    	} else if (item.getStatCd().equals(CodeConstant.MT_MEGASTAT_RC)) {
    		return "Cancellation Request";
    	} else if (item.getStatCd().equals(CodeConstant.MT_MEGASTAT_RJ)) {
    		return "Rejected";
    	} else if (item.getStatCd().equals(CodeConstant.MT_MEGASTAT_CR)) {
    		return "Created";
    	} else if (item.getStatCd().equals(CodeConstant.MT_MEGASTAT_CF)) {
    		return "Confirmed";
    	} else if (item.getStatCd().equals(CodeConstant.MT_MEGASTAT_CA)) {
    		return "Canceled";
    	}
    	
    	return "";
    } 
	
	@Override
	public void updateMegaInternaForkliftlItem(UpdateItemsBizParm parm) throws BizException {
       	megaDao.updateMegaInternalEquipmentItems(parm); // TMT_MEGA_DTL
       	megaDao.updateMegaInternalMasterItems(parm); 	// TMT_MEGA
   }

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList returnList = new DataItemList();
		MegaItem updMegaItem = (MegaItem) parm.getUpdateItems().get(0);

		returnList = megaDao.updateMegaItems(parm);

		updateOldPenaltyCd(updMegaItem);

		updateMegaDetail(parm);

		return returnList;
	}
	
	private void updateOldPenaltyCd(MegaItem megaItem) throws BizException {
		SearchMegaParm mParm = new SearchMegaParm();
		mParm.setMegaNo(megaItem.getMegaNo());
		MegaItem oldPenaltyMegaItem = (MegaItem) megaDao.selectOldPenaltyCd(mParm).getCollection().get(0);

		String oldPenaltyCode = oldPenaltyMegaItem.getOldPenaltyCd();
		String newPenaltyCode = megaItem.getPenaltyCd();

		if (newPenaltyCode != null && oldPenaltyCode != null && newPenaltyCode.equalsIgnoreCase(oldPenaltyCode)) {
			megaItem.setOldPenaltyCd("");
		} else {
			megaItem.setOldPenaltyCd(oldPenaltyCode);
		}
	}
    
	private DataItemList updateMegaDetail(UpdateItemsBizParm parm) throws BizException {

		DataItemList returnList = new DataItemList();
		returnList = megaDao.updateMegaDetailItems(parm);
		
		DataItemList megaDtlItems = new DataItemList();
		MegaItem updMegaItem = (MegaItem) parm.getUpdateItems().get(0);
		
		List<Object> equipmentItems = this.getOprInfoItems(updMegaItem, CodeConstant.MT_MGDIV_EQ);
		
		MegaItem equipmentMega = new MegaItem();
		equipmentMega.setMegaNo(updMegaItem.getMegaNo());
		equipmentMega.setUserId(updMegaItem.getUserId());
		equipmentMega.setCollection(equipmentItems);
		
		megaDtlItems.add(equipmentMega);
		//Update Equipment
		processMegaDtlEquipment(equipmentMega);
				
		List<Object> manpowerItems = this.getOprInfoItems(updMegaItem, CodeConstant.MT_MGDIV_MP);
		
		MegaItem stevedoreTrimmingMega = new MegaItem();
		stevedoreTrimmingMega.setMegaNo(updMegaItem.getMegaNo());
		stevedoreTrimmingMega.setUserId(updMegaItem.getUserId());
		stevedoreTrimmingMega.setCollection(manpowerItems);
		stevedoreTrimmingMega.setPenaltyCd(updMegaItem.getPenaltyCd());
		stevedoreTrimmingMega.setOldPenaltyCd(updMegaItem.getOldPenaltyCd());
		stevedoreTrimmingMega.setStatus(updMegaItem.getStatCd());
		
		megaDtlItems.add(stevedoreTrimmingMega);
		//Update Stevedore, Trimming
		processMegaDtlManpower(stevedoreTrimmingMega); 	

		if (!updMegaItem.getVslCallId().equals(CodeConstant.VESSEL_SCHEDULE_STRG)) {
			UpdateItemsBizParm updateCargoTonParm = new UpdateItemsBizParm();

			insertMegaDtlCgDtlNew(updMegaItem);
			megaDtlItems.add(updMegaItem);
			updateCargoTonParm.setUpdateItems(megaDtlItems);

			megaDao.updateCargoTonItems(updateCargoTonParm);
		}
		return returnList;
	}
	
	private List<Object> getOprInfoItems(MegaItem masterMegaItem, String mgDivTp) {
		List<Object> returnItems = new ArrayList<Object>();
		List<MegaItem> operInfoItems = new  ArrayList<MegaItem>();
		List<MegaItem> megaItems = new ArrayList<MegaItem>();
		
		if(CodeConstant.MT_MGDIV_MP.equals(mgDivTp)) { 
			megaItems.addAll(masterMegaItem.getStevedoreItems());
			megaItems.addAll(masterMegaItem.getTrimmingItems());
			operInfoItems.addAll(masterMegaItem.getOperInfoItemsForStevedore());
			operInfoItems.addAll(masterMegaItem.getOperInfoItemsForTrimming());
		} else if (CodeConstant.MT_MGDIV_EQ.equals(mgDivTp)) {
			megaItems.addAll(masterMegaItem.getGearsItems());
			megaItems.addAll(masterMegaItem.getForkliftItems());
			megaItems.addAll(masterMegaItem.getTrailerItems());
			megaItems.addAll(masterMegaItem.getMechenicalItems());
			megaItems.addAll(masterMegaItem.getPortCraneItems());

			operInfoItems.addAll(masterMegaItem.getOperInfoItemsForGears());
			operInfoItems.addAll(masterMegaItem.getOperInfoItemsForForklift());
			operInfoItems.addAll(masterMegaItem.getOperInfoItemsForTrailer());
			operInfoItems.addAll(masterMegaItem.getOperInfoItemsForMechanical());
			operInfoItems.addAll(masterMegaItem.getOperInfoItemsForPortCrane());
		}
		
		Map<String, List<Object>> operInfoMap = new HashMap<>();
		for (MegaItem operInfoItem : operInfoItems) {
            operInfoMap
            	.computeIfAbsent(operInfoItem.getRelationKey(), k -> new ArrayList<Object>())
            	.add(operInfoItem);
		}
		
		for (MegaItem megaItem : megaItems) {
			megaItem.setUserId(masterMegaItem.getUserId());
			megaItem.setCollection((operInfoMap.get(megaItem.getRelationKey())));
		}
		
		returnItems.addAll(megaItems);
        
        return returnItems;
	}
    
    public DataItemList updateRmk4MegaItems(UpdateItemsBizParm parm) throws BizException {
        return megaDao.updateMegaItems(parm);
    }

    public DataItemList deleteMegaItems(DeleteItemsBizParm parm) throws BizException {
       megaDao.deleteMegaItems(parm);
       return parm.getDeleteItems();
    }

    public void processMegaDtlEquipment(MegaItem megaItem) throws BizException {
        List megaDtlitems = megaItem.getCollection();

        MegaItem item;
        MegaItem maxSeqItem;
        SearchMegaParm maxSeqParm;
        List seqItems;
        List operItems;
        
        DataItemList megaDtlList = new DataItemList();
        InsertItemsBizParm insertMegaEQParm = new InsertItemsBizParm();
        UpdateItemsBizParm updateMegaEQParm = new UpdateItemsBizParm();
        DeleteItemsBizParm deleteMegaEQParm = new DeleteItemsBizParm();
        
        InsertItemsBizParm insertMegaOperParm = new InsertItemsBizParm();
        UpdateItemsBizParm updateMegaOperParm = new UpdateItemsBizParm();
        DeleteItemsBizParm deleteMegaOperParm = new DeleteItemsBizParm();
        
        // Mega Equipment
        for (int i = 0; i < megaDtlitems.size(); i++) {
            maxSeqItem = new MegaItem();
            maxSeqParm = new SearchMegaParm();

            item = (MegaItem) megaDtlitems.get(i);
            item.setMegaNo(megaItem.getMegaNo());
            item.setUserId(megaItem.getUserId());
            
            if (item.getWorkingStatus() != null) {
                if (
                	megaItem.getMegaTpCd() != null && 
                	megaItem.getMegaTpCd().equals(CodeConstant.MT_MGTPCD_A) || 
                	item.getWorkingStatus().equals(DAOProcessType.INSERT)
                ) {
                    maxSeqParm.setMegaNo(megaItem.getMegaNo());
                    seqItems = megaDao.selectMaxSeqNoList(maxSeqParm).getCollection();
                    maxSeqItem = (MegaItem) seqItems.get(0);
                    item.setSeq(maxSeqItem.getSeq());
                    
                    megaDtlList.add(item);
                    megaDao.insertMegaEquipmentItem(insertMegaEQParm.getTxTraceinfo(), item);
                } else if (item.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
                	megaDtlList.add(item);
                	
                	megaDao.updateMegaEquipmentItem(updateMegaEQParm.getTxTraceinfo(), item);
                } else if (item.getWorkingStatus().equals(DAOProcessType.DELETE)) {
                	megaDtlList.add(item);
                	megaDao.deleteMegaEquipmentItem(deleteMegaEQParm.getTxTraceinfo(), item);
                    continue;
                }
            }

            operItems = new ArrayList();
            operItems = item.getCollection();
            
            if (operItems == null)
                continue;
            for (int j = 0; j < operItems.size(); j++) {
                MegaItem operItem = (MegaItem) operItems.get(j);
                
                operItem.setUserId(megaItem.getUserId());
                operItem.setMegaNo(megaItem.getMegaNo());
                String workingStatus = operItem.getWorkingStatus();
                if (workingStatus != null) {
                    if (
                    	megaItem.getMegaTpCd() != null && 
                		megaItem.getMegaTpCd().equals(CodeConstant.MT_MGTPCD_A) || 
                		operItem.getWorkingStatus().equals(DAOProcessType.INSERT)
                    ) {
                        operItem.setMegaIdx(item.getSeq());
                        megaDtlList.add(operItem);
                        megaDao.insertMegaOperItems(insertMegaOperParm.getTxTraceinfo(), operItem);
                    } else if (workingStatus.equals(DAOProcessType.UPDATE)) {
                    	megaDtlList.add(operItem);
                    	megaDao.updateMegaOperItems(updateMegaOperParm.getTxTraceinfo(), operItem);
                    } else if (workingStatus.equals(DAOProcessType.DELETE)) {
                    	megaDtlList.add(operItem);
                    	deleteMegaOperParm.setDeleteItems(megaDtlList);
                    	megaDao.deleteMegaOperItems(deleteMegaOperParm.getTxTraceinfo(), operItem);
                    }
                }
            }
        }
    }
    
	public void processMegaDtlManpower(MegaItem megaItem) throws BizException {
		String newPenaltyCode = megaItem.getPenaltyCd();
		String oldPenaltyCode = megaItem.getOldPenaltyCd();
		String megaStatus = megaItem.getStatus();

		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();
		List<Object> megaOperInfoItems = new ArrayList<>();

		List<Object> manpowerItems = megaItem.getCollection();

		for (int j = 0; j < manpowerItems.size(); j++) {
			MegaItem megaStvdItem = (MegaItem) manpowerItems.get(j);

			megaStvdItem.setUserId(megaItem.getUserId());
			megaStvdItem.setMegaNo(megaItem.getMegaNo());

			if (newPenaltyCode != null && oldPenaltyCode != null && newPenaltyCode.equalsIgnoreCase(oldPenaltyCode)) {
				megaStvdItem.setAmountAmd("0");
			}

			if (megaStatus != null) {
				if (megaStatus.equalsIgnoreCase(CodeConstant.MT_MEGASTAT_SU)
						&& "0".equals(megaStvdItem.getAmountAmd())) {
					megaStvdItem.setStatCd(CodeConstant.MT_MEGASTAT_SU);
				}
			} else {
				megaStvdItem.setStatCd(CodeConstant.MT_MEGASTAT_AP);
			}
			
			String workingStatus = megaStvdItem.getWorkingStatus();
			List<Object> operInfoItems = megaStvdItem.getCollection();
			
			SearchMegaParm maxSeqParm = new SearchMegaParm();
			maxSeqParm.setMegaNo(megaItem.getMegaNo());
			
			MegaItem seqItem = (MegaItem) megaDao.selectMaxSeqNoList(maxSeqParm).getCollection().get(0);
			
			if (workingStatus != null) {
				if (DAOProcessType.INSERT.equals(workingStatus)) {
					megaStvdItem.setSeq(seqItem.getSeq() + j);				
					insertItems.add(megaStvdItem);
				} else if (DAOProcessType.UPDATE.equals(workingStatus)) {
					updateItems.add(megaStvdItem);
				} else if (DAOProcessType.DELETE.equals(workingStatus)) {
					deleteItems.add(megaStvdItem);
				}
			}
			
			if (operInfoItems != null && operInfoItems.size() > 0) {
				for (int i = 0; i < megaStvdItem.getCollection().size(); i++) {
					MegaItem operInfoItem = (MegaItem) megaStvdItem.getCollection().get(i);
					operInfoItem.setMegaIdx(megaStvdItem.getSeq());
					operInfoItem.setUserId(megaStvdItem.getUserId());
					operInfoItem.setMegaNo(megaStvdItem.getMegaNo());
				}
				megaOperInfoItems.addAll(operInfoItems);
			} 
		}

		if (insertItems.size() > 0) {
			InsertItemsBizParm insertManpowerParm = new InsertItemsBizParm();
			insertManpowerParm.setInsertItems(insertItems);
			megaDao.insertMegaManpowerItems(insertManpowerParm);
		}

		if (updateItems.size() > 0) {
			UpdateItemsBizParm updateManpowerParm = new UpdateItemsBizParm();
			updateManpowerParm.setUpdateItems(updateItems);
			megaDao.updateMegaManpowerItems(updateManpowerParm);
		}

		if (deleteItems.size() > 0) {
			DeleteItemsBizParm deleteManpowerParm = new DeleteItemsBizParm();
			deleteManpowerParm.setDeleteItems(deleteItems);
			megaDao.deleteMegaManpowerItems(deleteManpowerParm);
		}
		
		processMegaDtlManpowerOperInfoItems(megaOperInfoItems);
	}
	
	public void processMegaDtlManpowerOperInfoItems(List<Object> megaOperInfoItems) throws BizException { 
		
		if (megaOperInfoItems == null || megaOperInfoItems.size() == 0) {
			return;
		}

		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();

		for (int i = 0; i < megaOperInfoItems.size(); i++) {
			MegaItem manpowerOperInfoItem = (MegaItem) megaOperInfoItems.get(i);
			String workingStatus = manpowerOperInfoItem.getWorkingStatus();
			
			if (workingStatus != null) {
				if (DAOProcessType.INSERT.equals(workingStatus)) {
					insertItems.add(manpowerOperInfoItem);
				} else if (DAOProcessType.UPDATE.equals(workingStatus)) {
					updateItems.add(manpowerOperInfoItem);
				} else if (DAOProcessType.DELETE.equals(workingStatus)) {
					deleteItems.add(manpowerOperInfoItem);
				}
			}
		}

		if (insertItems.size() > 0) {
			InsertItemsBizParm insertManpowerOprInfoParm = new InsertItemsBizParm();
			insertManpowerOprInfoParm.setInsertItems(insertItems);
			megaDao.insertMegaManpowerOprInfoItems(insertManpowerOprInfoParm);
		}

		if (updateItems.size() > 0) {
			UpdateItemsBizParm updateManpowerOprInfoParm = new UpdateItemsBizParm();
			updateManpowerOprInfoParm.setUpdateItems(updateItems);
			megaDao.updateMegaManpowerOprInfoItems(updateManpowerOprInfoParm);
		}

		if (deleteItems.size() > 0) {
			DeleteItemsBizParm deleteManpowerOprInfoParm = new DeleteItemsBizParm();
			deleteManpowerOprInfoParm.setDeleteItems(deleteItems);
			megaDao.deleteMegaManpowerItems(deleteManpowerOprInfoParm);
		}
	}

    public void insertMegaDtlCgDtlNew(MegaItem masterMegaItem) throws BizException {
        DataItemList insItems = new DataItemList();

        for (int i = 0; i < masterMegaItem.getCargoDetailItems().size(); i++) {
            MegaItem insDataItem = masterMegaItem.getCargoDetailItems().get(i);
            
            insDataItem.setMegaNo(masterMegaItem.getMegaNo());
            insDataItem.setDivCd("CD");
            insDataItem.setUserId(masterMegaItem.getUserId());
            
            insItems.add(insDataItem);
        }

        if (insItems.size() > 0) {
        	InsertItemsBizParm insertMegaCgDtlParm = new InsertItemsBizParm();
        	
        	insertMegaCgDtlParm.setInsertItems(insItems);
        	
        	megaDao.insertMegaCgDtlItems(insertMegaCgDtlParm);
        }
    }

	public DataItemList selectStaffDeployMentList(SearchStaffAndDeploymentParm parm) throws BizException {
		DataItemList deploylist = new DataItemList();
		
		if (parm.getSubSearchType().equals("deploylist")) {
			deploylist = staffAndDeploymentDao.selectStaffDeployMentList(parm);
		}

		return deploylist;
	}
	
	public DataItemList selectInternalMegaList(SearchMegaParm parm) throws BizException {
        return megaDao.selectInternalMegaList(parm);
    } 
	
}
