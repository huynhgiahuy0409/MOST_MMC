package com.tsb.most.biz.service.planning;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.commons.lang.StringUtils;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.common.ISearchVesselCallDao;
import com.tsb.most.basebiz.dao.common.ICommonCodeDao;
import com.tsb.most.basebiz.dao.common.ILocationCodeDao;
import com.tsb.most.basebiz.dataitem.common.CodeMasterListItem;
import com.tsb.most.basebiz.dataitem.common.CommonCodeItem;
import com.tsb.most.basebiz.dataitem.common.LocationCodeItem;
import com.tsb.most.basebiz.parm.codes.CodeMasterListParm;
import com.tsb.most.basebiz.parm.codes.PartnerCodeParm;
import com.tsb.most.basebiz.parm.common.CommonCodeParm;
import com.tsb.most.basebiz.parm.common.EquipmentCodeParm;
import com.tsb.most.basebiz.parm.common.LocationCodeParm;
import com.tsb.most.basebiz.parm.common.SearchVesselCallListParm;
import com.tsb.most.biz.dao.planning.IMegaDao;
import com.tsb.most.biz.dao.planning.IShiftGroupDefDao;
import com.tsb.most.biz.dao.planning.IPartnerInformationDao;
import com.tsb.most.biz.dao.planning.IStaffAndDeploymentDao;
import com.tsb.most.biz.dataitem.planning.MegaCgDtlItem;
import com.tsb.most.biz.dataitem.planning.MegaItem;
import com.tsb.most.biz.parm.planning.PartnerInformationParm;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.biz.parm.planning.SearchStaffAndDeploymentParm;
import com.tsb.most.biz.parm.planning.SearchShiftGroupDefParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.biz.dao.planning.IConfirmationSlipDao;
import com.tsb.most.basebiz.service.common.ICommonCode;


public class Mega extends MOSTBaseService implements IMega{
    private int MAX_HATCH_NO = 11;
	private String AREA_WHS = "WHS";			//WORKING AREA WEIGH SCALE
	private String AREA_HATCH = "HTC";			// WORKING AREA HATCH
	private String AREA_WHARF = "WRF";          // WORKING AREA WHARF 
	private String AREA_EDIBLE = "EDJ";         // WORKING AREA EDIBLE
	private String AREA_NON_EDIBLE = "NDJ";     // WORKING AREA NON EDIBLE
	private String AREA_OTHERS = "OTH";         // WORKING AREA OTHES
	private String AREA_WHAREHOUSE = "WHO";     // WORKING AREA WAREHOUSE
	private String AREA_ALL = "ALL";			// WORKING AREA ALL
	private String MAX_MEGA_NO = "";			// MAX MEGA NO
	private String PURP_TYPE = "";
    
	private IMegaDao megaDao;
	private IStaffAndDeploymentDao staffAndDeploymentDao;
	private ISearchVesselCallDao searchVesselCallDao;
	private IShiftGroupDefDao shiftGroupDefDao;
	private ICommonCodeDao commonCodeDao;
    private ICommonCode commonCode;
    private IPartnerInformationDao partnerInformationDao;
    private IConfirmationSlipDao confirmationSlipDao;
    private ILocationCodeDao locationCodeDao;
	
	public void setMegaDao(IMegaDao megaDao) {
		this.megaDao = megaDao;
	}
    
    public void setCommonCodeDao(ICommonCodeDao commonCodeDao) {
		this.commonCodeDao = commonCodeDao;
	}

	public void setStaffAndDeploymentDao(IStaffAndDeploymentDao staffAndDeploymentDao) {
		this.staffAndDeploymentDao = staffAndDeploymentDao;
	}

	public void setSearchVesselCallDao(ISearchVesselCallDao searchVesselCallDao) {
		this.searchVesselCallDao = searchVesselCallDao;
	}
    
    public void setShiftGroupDefDao(IShiftGroupDefDao shiftGroupDefDao) {
		this.shiftGroupDefDao = shiftGroupDefDao;
	}
    
    public void setPartnerInformationDao(IPartnerInformationDao partnerInformationDao) {
		this.partnerInformationDao = partnerInformationDao;
	}

	public DataItemList selectMegaList(SearchMegaParm parm) throws BizException {
        return megaDao.selectMegaList(parm);
    }
    
    public void setConfirmationSlipDao(IConfirmationSlipDao confirmationSlipDao) {
		this.confirmationSlipDao = confirmationSlipDao;
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
    	vslParam.setVslCallId(parm.getVslCallId() == null ? "" : parm.getVslCallId());
		
        return searchVesselCallDao.selectSearchVesselCallId(vslParam);
    }
    
    public DataItemList selectValidationCode(SearchMegaParm parm) throws BizException {
		return megaDao.selectValidationCode(parm);
	}
    
    public DataItemList selectConfirmationSlipDryBreakBulk(SearchMegaParm parm) throws BizException {
        return megaDao.selectConfirmationSlipDryBreakBulk(parm);
    }
    
    public DataItemList selectMegaStevedoreList(SearchMegaParm parm) throws BizException {
        return megaDao.selectMegaStevedoreList(parm);
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
		DataItemList stevedoreItems = new DataItemList();
		DataItemList megaDtlItems = new DataItemList();
		MegaItem equipmentMega = new MegaItem();
		MegaItem stevedoreTrimmingMega = new MegaItem();
		List<Object> stevedoreTrimmingItems = new ArrayList<Object>();

		returnList = megaDao.insertMegaDetailItems(parm);

		equipmentMega.setUserId(insMegaItem.getUserId());
		equipmentMega.setInsertType("equipment");

		List<Object> equipmentItems = this.getEquipmentItems(insMegaItem);
		
		equipmentMega.setCollection(equipmentItems);
		megaDtlItems.add(equipmentMega);
		
        stevedoreTrimmingMega.setUserId(insMegaItem.getUserId());
        stevedoreTrimmingMega.setInsertType("stevedore");
        
        stevedoreTrimmingItems.addAll(insMegaItem.getStevedoreItems());
        stevedoreTrimmingMega.setCollection(stevedoreTrimmingItems);
        megaDtlItems.add(stevedoreTrimmingMega);
        
        for (int i = 0; i < megaDtlItems.getCollection().size(); i++) {
        	MegaItem dtlItem = (MegaItem) megaDtlItems.getCollection().get(i);
        	
        	dtlItem.setMegaNo(maxMegaItem.getMegaNo());
            dtlItem.setMegaTpCd(insMegaItem.getMegaTpCd());
            
            if (dtlItem.getInsertType().equals("stevedore")) {
            	List megaStvdItemList = dtlItem.getCollection();
            	
            	for (int j = 0; j < megaStvdItemList.size(); j++) {
            		MegaItem megaStvdItem = (MegaItem) megaStvdItemList.get(j);
            		
                    megaStvdItem.setUserId(insMegaItem.getUserId());
                    megaStvdItem.setMegaNo(maxMegaItem.getMegaNo());
                    stevedoreItems.add(megaStvdItem);
            	}
            	
            	InsertItemsBizParm insertStevedoreParm = new InsertItemsBizParm();
            	
            	insertStevedoreParm.setInsertItems(stevedoreItems);
                
            	returnList = megaDao.insertMegaStevedoreItems(insertStevedoreParm);
            	
            	continue;
            }
            
            if (dtlItem.getInsertType().equals("equipment")) {
            	processMegaDtlEquipment(dtlItem);
            	continue;
            }
        }
        
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
    
	private List<Object> getEquipmentItems(MegaItem masterMegaItem) {
		List<Object> returnItems = new ArrayList<Object>();
		
        if(masterMegaItem.getGearsItems() != null) {
        	for(MegaItem megaItem : masterMegaItem.getGearsItems()) {
            	if(masterMegaItem.getOperInfoItemsForGears() != null) {
            		List<Object> addItems = masterMegaItem.getOperInfoItemsForGears().stream().filter(e -> e.getRelationKey().equals(megaItem.getRelationKey())).collect(Collectors.toList());
            		megaItem.setCollection(addItems);
            	}
            }
            
        	returnItems.addAll(masterMegaItem.getGearsItems());
        }
        
        if(masterMegaItem.getForkliftItems() != null) {
        	for(MegaItem megaItem : masterMegaItem.getForkliftItems()) {
            	if(masterMegaItem.getOperInfoItemsForForklift() != null) {
            		List<Object> addItems = masterMegaItem.getOperInfoItemsForForklift().stream().filter(e -> e.getRelationKey().equals(megaItem.getRelationKey())).collect(Collectors.toList());
            		
            		megaItem.setCollection(addItems);
            	}
            }
            
        	returnItems.addAll(masterMegaItem.getForkliftItems());
        }
        
        if(masterMegaItem.getTrailerItems() != null) {
        	for(MegaItem megaItem : masterMegaItem.getTrailerItems()) {
            	if(masterMegaItem.getOperInfoItemsForTrailer() != null) {
            		List<Object> addItems = masterMegaItem.getOperInfoItemsForTrailer().stream().filter(e -> e.getRelationKey().equals(megaItem.getRelationKey())).collect(Collectors.toList());
            		
            		megaItem.setCollection(addItems);
            	}
            }
            
        	returnItems.addAll(masterMegaItem.getTrailerItems());
        }
        
        if(masterMegaItem.getMechenicalItems() != null) {
        	for(MegaItem megaItem : masterMegaItem.getMechenicalItems()) {
            	if(masterMegaItem.getOperInfoItemsForMechanical() != null) {
            		List<Object> addItems = masterMegaItem.getOperInfoItemsForMechanical().stream().filter(e -> e.getRelationKey().equals(megaItem.getRelationKey())).collect(Collectors.toList());
            		
            		megaItem.setCollection(addItems);
            	}
            }
            
        	returnItems.addAll(masterMegaItem.getMechenicalItems());
        }
        
        if(masterMegaItem.getPortCraneItems() != null) {
        	for(MegaItem megaItem : masterMegaItem.getPortCraneItems()) {
            	if(masterMegaItem.getOperInfoItemsForPortCrane() != null) {
            		List<Object> addItems = masterMegaItem.getOperInfoItemsForPortCrane().stream().filter(e -> e.getRelationKey().equals(megaItem.getRelationKey())).collect(Collectors.toList());
            		
            		megaItem.setCollection(addItems);
            	}
            }
            
        	returnItems.addAll(masterMegaItem.getPortCraneItems());
        }
        
        return returnItems;
	}
	
	@Override
	public void updateMegaInternaForkliftlItem(UpdateItemsBizParm parm) throws BizException {
       	megaDao.updateMegaInternalEquipmentItems(parm); // TMT_MEGA_DTL
       	megaDao.updateMegaInternalMasterItems(parm); 	// TMT_MEGA
   }

    public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
    	DataItemList returnList = new DataItemList();
    	DataItemList items = parm.getUpdateItems();
    	String status = null;

    	returnList = megaDao.updateMegaItems(parm);
    	
    	MegaItem updMegaItem = (MegaItem)items.get(0);
    	
    	status = updMegaItem.getStatCd();
    	SearchMegaParm mParm = new SearchMegaParm();
    	mParm.setMegaNo(updMegaItem.getMegaNo());
		List list1 = megaDao.selectOldPenaltyCd(mParm).getCollection();
		
		MegaItem oldPenaltyMegaItem = (MegaItem) list1.get(0);
		((MegaItem) items.get(0)).setOldPenaltyCd(oldPenaltyMegaItem.getOldPenaltyCd());
		String newPenaltyCode = null;
		String oldPenaltyCode = null;
		String changeOriginalAmount = null;
		
		oldPenaltyCode = oldPenaltyMegaItem.getOldPenaltyCd();
		newPenaltyCode = updMegaItem.getPenaltyCd();
		
		if(newPenaltyCode != null && oldPenaltyCode != null ){
			if (newPenaltyCode.equalsIgnoreCase(oldPenaltyCode) ){
				((MegaItem) items.get(0)).setOldPenaltyCd("");
			}
		}
    	
    	returnList = updateMegaDetail(parm, updMegaItem, oldPenaltyCode, newPenaltyCode, status, changeOriginalAmount);
    	
    	return returnList;
    }
    
    private DataItemList updateMegaDetail(UpdateItemsBizParm parm, MegaItem updMegaItem, String oldPenaltyCode, String newPenaltyCode, String status, String changeOriginalAmount) throws BizException {
		DataItemList returnList = new DataItemList();
		returnList =  megaDao.updateMegaDetailItems(parm);
			
		DataItemList stevedoreItems = new DataItemList();
		DataItemList megaDtlItems = new DataItemList();
		MegaItem equipmentMega = new MegaItem();
		
		equipmentMega.setUserId(updMegaItem.getUserId());
		equipmentMega.setInsertType("equipment");
		
		List<Object> equipmentItems = this.getEquipmentItems(updMegaItem);
		
		equipmentMega.setCollection(equipmentItems);
		megaDtlItems.add(equipmentMega);
		
		MegaItem stevedoreTrimmingMega = new MegaItem();
		stevedoreTrimmingMega.setUserId(updMegaItem.getUserId());
		stevedoreTrimmingMega.setInsertType("stevedore");
		  
		List<Object> stevedoreTrimmingItems = new ArrayList<Object>();
		stevedoreTrimmingItems.addAll(updMegaItem.getStevedoreItems());
		  
		stevedoreTrimmingMega.setCollection(stevedoreTrimmingItems);
		megaDtlItems.add(stevedoreTrimmingMega);
		
		  for (int i = 0; i < megaDtlItems.size(); i++) {
		      MegaItem dtlItem = (MegaItem) megaDtlItems.get(i);
		      dtlItem.setMegaNo(updMegaItem.getMegaNo());
		      dtlItem.setNewVersion(UUID.randomUUID().toString());
		
		  if (dtlItem.getInsertType().equals("stevedore")) {
			  List megaStvdItemList = dtlItem.getCollection();
			  
			  for (int j = 0; j < megaStvdItemList.size(); j++) {
			      MegaItem megaStvdItem = (MegaItem) megaStvdItemList.get(j);
			      
			      megaStvdItem.setUserId(updMegaItem.getUserId());
			      megaStvdItem.setMegaNo(dtlItem.getMegaNo());
			      megaStvdItem.setNewVersion(UUID.randomUUID().toString());
			      
			      if(newPenaltyCode != null && oldPenaltyCode != null){
			    	  if (newPenaltyCode.equalsIgnoreCase(oldPenaltyCode) ){
			    		  megaStvdItem.setAmountAmd("0");
			    	  }
		    	  }
			      
			      changeOriginalAmount = megaStvdItem.getAmountAmd();
			      
				  if (status != null){
					  if (status.equalsIgnoreCase(CodeConstant.MT_MEGASTAT_SU) && changeOriginalAmount == "0") {
					      megaStvdItem.setStatCd(CodeConstant.MT_MEGASTAT_SU);
					  }	
				  } else {
					  megaStvdItem.setStatCd(CodeConstant.MT_MEGASTAT_AP);
		          }
				  
		          stevedoreItems.add(megaStvdItem);
		      }
		      
		      UpdateItemsBizParm updateStevedoreParm = new UpdateItemsBizParm();
		      
		      updateStevedoreParm.setUpdateItems(stevedoreItems);
		     
		      returnList = megaDao.updateMegaStevedoreItems(updateStevedoreParm);
		      
		      continue;
		  }
		
		  if (dtlItem.getInsertType().equals("equipment")) {
		          processMegaDtlEquipment(dtlItem);
		          continue;
		      }
		  }
		  
		  if (!updMegaItem.getVslCallId().equals(CodeConstant.VESSEL_SCHEDULE_STRG)) {
			  UpdateItemsBizParm updateCargoTonParm = new UpdateItemsBizParm();
			  
		      insertMegaDtlCgDtlNew(updMegaItem);
		      megaDtlItems.add(updMegaItem);
		      updateCargoTonParm.setUpdateItems(megaDtlItems);
		      
		      megaDao.updateCargoTonItems(updateCargoTonParm);
		  }
		  return returnList;
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
                if (megaItem.getMegaTpCd() != null && megaItem.getMegaTpCd().equals(CodeConstant.MT_MGTPCD_A) || item.getWorkingStatus().equals(DAOProcessType.INSERT)) {
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
                
                if (operItem.getWorkingStatus() != null) {
                    if (megaItem.getMegaTpCd() != null && megaItem.getMegaTpCd().equals(CodeConstant.MT_MGTPCD_A) || operItem.getWorkingStatus().equals(DAOProcessType.INSERT)) {
                        operItem.setMegaIdx(item.getSeq());
                        
                        megaDtlList.add(operItem);
                        megaDao.insertMegaOperItems(insertMegaOperParm.getTxTraceinfo(), operItem);
                    } else if (operItem.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
                    	megaDtlList.add(operItem);
                    	megaDao.updateMegaOperItems(updateMegaOperParm.getTxTraceinfo(), operItem);
                    } else if (operItem.getWorkingStatus().equals(DAOProcessType.DELETE)) {
                    	megaDtlList.add(operItem);
                    	deleteMegaOperParm.setDeleteItems(megaDtlList);
                    	megaDao.deleteMegaOperItems(deleteMegaOperParm.getTxTraceinfo(), operItem);
                    }
                }
            }
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
	
    // Working Area All Combo Data
	public DataItemList getWorkingAreaAllComboList(SearchMegaParm parm) throws BizException {
		List<CommonCodeItem> returnList = new ArrayList<CommonCodeItem>();
		
		// WHS, OTHERS
		CommonCodeParm commonCodeParm = new CommonCodeParm();
		commonCodeParm.setSearchType("COMM");
		commonCodeParm.setLcd("MT");
		commonCodeParm.setDivCd(this.AREA_WHS);
		
		DataItemList whsItem = this.commonCode.getCommonCodeList(commonCodeParm);
		
		if(whsItem.getCollection() != null) {
			List<CodeMasterListItem> whsList = (List<CodeMasterListItem>) whsItem.getCollection();
			
			for(CodeMasterListItem item : whsList) {
				CommonCodeItem addItem = new CommonCodeItem();
				addItem.setTyCd(this.AREA_WHS);
				addItem.setCd(item.getCd());
				addItem.setCdNm(item.getCdNm());
				returnList.add(addItem);
			}
		}
		
		commonCodeParm = new CommonCodeParm();
		commonCodeParm.setSearchType("COMM");
		commonCodeParm.setLcd("MT");
		commonCodeParm.setDivCd(this.AREA_OTHERS);
		
		DataItemList othersItem = this.commonCode.getCommonCodeList(commonCodeParm);
		
		if(othersItem.getCollection() != null) {
			List<CodeMasterListItem> whsList = (List<CodeMasterListItem>) othersItem.getCollection();
			
			for(CodeMasterListItem item : whsList) {
				CommonCodeItem addItem = new CommonCodeItem();
				addItem.setTyCd(this.AREA_OTHERS);
				addItem.setCd(item.getCd());
				addItem.setCdNm(item.getCdNm());
				returnList.add(addItem);
			}
		}
		
		// WHARF, EDIBLE, NON EDIBLE
        LocationCodeParm locationCodeParm = new LocationCodeParm();
        locationCodeParm.setSearchType("BerthLoc");
        locationCodeParm.setLocCd("BBT");
        locationCodeParm.setBerthTp(this.AREA_WHARF);
        
        List<LocationCodeItem> wharfList = (List<LocationCodeItem>) this.locationCodeDao.getLocationCodeList(locationCodeParm);
        
        for(LocationCodeItem item : wharfList) {
			CommonCodeItem addItem = new CommonCodeItem();
			addItem.setTyCd(this.AREA_WHARF);
			addItem.setCd(item.getCd());
			addItem.setCdNm(item.getCdNm());
			returnList.add(addItem);
		}
        
        locationCodeParm = new LocationCodeParm();
        locationCodeParm.setSearchType("BerthLoc");
        locationCodeParm.setLocCd("BBT");
        locationCodeParm.setBerthTp(this.AREA_EDIBLE);
        
        List<LocationCodeItem> edibleList = (List<LocationCodeItem>) this.locationCodeDao.getLocationCodeList(locationCodeParm);
        
        for(LocationCodeItem item : edibleList) {
			CommonCodeItem addItem = new CommonCodeItem();
			addItem.setTyCd(this.AREA_EDIBLE);
			addItem.setCd(item.getCd());
			addItem.setCdNm(item.getCdNm());
			returnList.add(addItem);
		}
        
        locationCodeParm = new LocationCodeParm();
        locationCodeParm.setSearchType("BerthLoc");
        locationCodeParm.setLocCd("BBT");
        locationCodeParm.setBerthTp(this.AREA_NON_EDIBLE);
        
        List<LocationCodeItem> nonEdibleList = (List<LocationCodeItem>) this.locationCodeDao.getLocationCodeList(locationCodeParm);
        
        for(LocationCodeItem item : nonEdibleList) {
			CommonCodeItem addItem = new CommonCodeItem();
			addItem.setTyCd(this.AREA_NON_EDIBLE);
			addItem.setCd(item.getCd());
			addItem.setCdNm(item.getCdNm());
			returnList.add(addItem);
		}
        
        // HATCH
		for(int i=0; i<this.MAX_HATCH_NO; i++) {
			CommonCodeItem addItem = new CommonCodeItem();
			addItem.setTyCd(this.AREA_HATCH);
			addItem.setCd(String.format("H%d", i+1));
			addItem.setCdNm(String.format("H%d", i+1));
			returnList.add(addItem);
		}
		
		locationCodeParm = new LocationCodeParm();
        locationCodeParm.setSearchType("LocDef");
        locationCodeParm.setLocDivCd(this.AREA_WHAREHOUSE);
        
        List<LocationCodeItem> warehouseList = (List<LocationCodeItem>) this.locationCodeDao.getLocationCodeList(locationCodeParm);
        
        for(LocationCodeItem item : warehouseList) {
			CommonCodeItem addItem = new CommonCodeItem();
			addItem.setTyCd(this.AREA_WHAREHOUSE);
			addItem.setCd(item.getCd());
			addItem.setCdNm(item.getCdNm());
			returnList.add(addItem);
		}
		
		return (DataItemList) returnList;
	}
    
	public DataItemList selectMegaComboList(SearchMegaParm parm) throws BizException {
		DataItemList returnList = new DataItemList();
        MegaItem returnItem = new MegaItem();
        
        if ("searchcombolist".equals(parm.getSubSearchType())) {

            /**
             * MEGA Purpose Search
             */
            CodeMasterListParm partyCode = new CodeMasterListParm();
            partyCode.setLcd("MT");
            partyCode.setMcd("MGPURP"); // MEGA Purpose
            if (parm.getUserType().equals("E")) {
                partyCode.setSearchType("MGPURPEX");
            }
            partyCode.setScdUse("Y"); // S_CD_USE = 'Y';
            returnItem.setPurposeList(commonCodeDao.getCodeMasterList(partyCode));

            /**
             * TMT_SHIFT TABLE <SHIFT LIST> 
             */
            SearchShiftGroupDefParm shiftParm = new SearchShiftGroupDefParm();
            shiftParm.setShftMethCd(parm.getShftMethCd()); // Standard Shift
            if(parm.getDivCd() != null || !("".equalsIgnoreCase(parm.getDivCd()))) {
            	shiftParm.setDivCd(parm.getDivCd());
            }
            DataItemList listShift = shiftGroupDefDao.selectShiftGroupDefShiftMegaList(shiftParm);
            returnItem.setShiftList(listShift);

            /**
             * TB_PTNR_USER TABLE <PTNR_CODE>
             */
            PartnerInformationParm ptnrParm = new PartnerInformationParm();
            ptnrParm.setPtnrType(parm.getPtnrType());
            ptnrParm.setUserId(parm.getUserId());
            DataItemList listPtnr = partnerInformationDao.getPartnerList(ptnrParm);
            returnItem.setPatnerList(listPtnr);

            /**
             * Vessel Call Id
             */
            SearchVesselCallListParm vslInfoParm = new SearchVesselCallListParm();
        	vslInfoParm.setVslCallId(parm.getVslCallId());
            DataItemList vslList = searchVesselCallDao.selectSearchVesselCallId(vslInfoParm);
            returnItem.setVesselCallIdList(vslList);

            /**
             * MEGA Status Search
             */
            partyCode.setLcd("MT");
            partyCode.setMcd("MEGASTAT"); // MEGA Status
            partyCode.setScdUse("Y"); // S_CD_USE = 'Y'
            partyCode.setSearchType(null);

            returnItem.setMegaStatusList(commonCodeDao.getCodeMasterList(partyCode));

        } else {

            /**
             * TMT_SHIFT TABLE <SHIFT LIST>
             */
            SearchShiftGroupDefParm shiftParm = new SearchShiftGroupDefParm();
            //shiftParm.setDivCd(parm.getPurpTpCd()); //fix issue wrong shiftId in Mega requisition detail screen
            shiftParm.setShftMethCd(parm.getShftMethCd()); // Standard Shift 
            // Type
            DataItemList listShift = shiftGroupDefDao.selectShiftGroupDefShiftMegaList(shiftParm);
            returnItem.setShiftList(listShift);

            /**
             * Common Code of CagroType Combo
             */
            CodeMasterListParm partyCode = new CodeMasterListParm();
            partyCode.setLcd("MT");
            partyCode.setMcd("CGTP");
            partyCode.setScdUse("Y"); // S_CD_USE = 'Y'

            returnItem.setCargoTypeList(commonCodeDao.getCodeMasterList(partyCode));

            /**
             * MEGA CSC Purpose Search
             */
            partyCode.setLcd("MT");
            partyCode.setMcd("MGPURP"); // MEGA Purpose
            if (parm.getUserType().equals("E")) {
                partyCode.setSearchType("MGPURPEX");
            }
            partyCode.setScdUse("Y"); // S_CD_USE = 'Y'

            returnItem.setCscPurposeList(commonCodeDao.getCodeMasterList(partyCode));
            /**
             * MEGA Cargo Detail Code
             */
            partyCode.setLcd("MT");
            partyCode.setMcd("CGDESC"); // Cargo Description
            partyCode.setScdUse("Y"); // S_CD_USE = 'Y'
            partyCode.setSearchType(null);

            returnItem.setCargoDetailList(commonCodeDao.getCodeMasterList(partyCode));

            /**
             * Vessel Call Id
             */
            SearchVesselCallListParm vslParam = new SearchVesselCallListParm();
            vslParam.setVslCallId(parm.getVslCallId());
            DataItemList vslList = searchVesselCallDao.selectSearchVesselCallId(vslParam);
            returnItem.setVesselCallIdList(vslList);

            //Vesselschedule ( Dry Bulk / Break Bulk )
    		returnItem.setConfirmationSlipDryBreakBulk(confirmationSlipDao.getConfirmationSlipDetail(parm));
            
            // Gears Requisition Combo
            EquipmentCodeParm equipmentCodeParm = new EquipmentCodeParm();
            equipmentCodeParm.setSearchType("equipmentcapa");
            equipmentCodeParm.setEqDivCd("GR");
            equipmentCodeParm.setScdLgv("");
            equipmentCodeParm.setScdVal("");
            DataItemList gearsRequisitionItem = this.commonCode.getEquipmentCodeList(equipmentCodeParm);
            returnItem.setGearsRequisitionList(gearsRequisitionItem);
            
            // Forklift Equipment Combo
            equipmentCodeParm = new EquipmentCodeParm();
            equipmentCodeParm.setSearchType("equipmentcapa");
            equipmentCodeParm.setEqDivCd("FL");
            equipmentCodeParm.setScdLgv("EQ");
            DataItemList forkliftEquipmentItem = this.commonCode.getEquipmentCodeList(equipmentCodeParm);
            returnItem.setForkliftEquipmentList(forkliftEquipmentItem);
            
            // Trailer Requisition Combo
            equipmentCodeParm = new EquipmentCodeParm();
            equipmentCodeParm.setSearchType("equipmentcapa");
            equipmentCodeParm.setEqDivCd("TR");
            equipmentCodeParm.setScdLgv("");
            equipmentCodeParm.setScdVal("");
            DataItemList trailerEquipmentItem = this.commonCode.getEquipmentCodeList(equipmentCodeParm);
            returnItem.setTrailerEquipmentList(trailerEquipmentItem);
            
            // Mechanical Equipment Type Code Combo
            equipmentCodeParm = new EquipmentCodeParm();
            equipmentCodeParm.setSearchType("mechanicalInitial");
            equipmentCodeParm.setScdLgv("EQ");
            equipmentCodeParm.setScdVal("MC");
            DataItemList mechanicalEquipmentTypeItem = this.commonCode.getEquipmentCodeList(equipmentCodeParm);
            returnItem.setMechanicalEquipmentTypeList(mechanicalEquipmentTypeItem);
            
            // PortCrane Equipment Type Code Combo
            equipmentCodeParm = new EquipmentCodeParm();
            equipmentCodeParm.setSearchType("mechanicalInitial");
            equipmentCodeParm.setScdLgv("EQ");
            equipmentCodeParm.setScdVal("PC");
            DataItemList portCraneEquipmentTypeItem = this.commonCode.getEquipmentCodeList(equipmentCodeParm);
            returnItem.setPortCraneEquipmentTypeList(portCraneEquipmentTypeItem);
            
            // Category Code Combo
            CommonCodeParm commonCodeParm = new CommonCodeParm();
            commonCodeParm.setSearchType("COMM");
            commonCodeParm.setLcd("MT");
            commonCodeParm.setDivCd("LOCDIV1");
            DataItemList categoryResponseItem = this.commonCode.getCommonCodeList(commonCodeParm);
            returnItem.setCategoryList(categoryResponseItem);
            
            // Working Area Combo
            returnItem.setWorkingAreaList(this.getWorkingAreaAllComboList(parm));
            
            PartnerCodeParm partnerCodeParm = new PartnerCodeParm();
            partnerCodeParm.setTyCd("CD");
            partnerCodeParm.setPtyDivCd("CTT");
            DataItemList partnerCodeItem = this.commonCode.getPartnerCodeList(partnerCodeParm);
            returnItem.setCompanyList(partnerCodeItem);
            
            if ("tabInitialUpdate".equals(parm.getSubSearchType())) {
                /**
                 * Mega Detail
                 */
                DataItemList megaDetailList = megaDao.selectMegaDetailList(parm);
                returnItem.setDetailList(megaDetailList);

                /**
                 * Mega Stevedore
                 */
                List megaStevedoreList = megaDao.selectMegaStevedoreList(parm).getCollection();
                returnItem.setStevedoreItems((ArrayList<MegaItem>) megaStevedoreList);

                /**
                 * ==================================================================
                 * Equipment Start
                 */
                parm.setDivCd("EQ");
                // Gears
                parm.setEqDivCdType("GR");
                returnItem.setGearsItems((ArrayList<MegaItem>) megaDao.selectMegaEquipmentList(parm).getCollection());
                
                // Forklift
                parm.setEqDivCdType("FL");
                returnItem.setForkliftItems((ArrayList<MegaItem>) megaDao.selectMegaEquipmentList(parm).getCollection());
                
                // Trailer
                parm.setEqDivCdType("TR");
                returnItem.setTrailerItems((ArrayList<MegaItem>) megaDao.selectMegaEquipmentList(parm).getCollection());
                
                // Mechanical
                parm.setEqDivCdType("MC");
                returnItem.setMechenicalItems((ArrayList<MegaItem>) megaDao.selectMegaEquipmentList(parm).getCollection());
                
                // POrtCrane
                parm.setEqDivCdType("PC");
                returnItem.setPortCraneItems((ArrayList<MegaItem>) megaDao.selectMegaEquipmentList(parm).getCollection());

                /**
                 * Equipment End
                 * ==================================================================
                 */
                
                /**
                 * CargoDetail Operation
                 */
                returnItem.setCargoDetailItems((ArrayList<MegaItem>) megaDao.selectMegaCgDtlList(parm).getCollection());
                
                // CargoDetail Commodity Combo for Popup - Tonny.Kim
                partyCode = new CodeMasterListParm();
                partyCode.setLcd("");
                partyCode.setMcd("");
                partyCode.setScdUse("");
                returnItem.setCommodityCodeList(this.commonCodeDao.getCMDTCodeList(partyCode));
                
                // CargoDetail Package Combo for Popup - Tonny.Kim
                partyCode = new CodeMasterListParm();
                partyCode.setLcd("MT");
                partyCode.setMcd("PKGTP");
                returnItem.setPackageList(this.commonCodeDao.getCodeMasterList(partyCode));
            }
        }
        //System.out.println("tests: "  + returnItem.getGearsItems().get(0).getDspReqhhmm());
        returnList.add(returnItem);

		return returnList;
    }
}
