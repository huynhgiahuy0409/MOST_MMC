package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dao.configuration.IWhConfigurationDao;
import com.tsb.most.basebiz.dataitem.configuration.WhConfigurationItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.basebiz.parm.configuration.SearchWhConfigurationParm;
import com.tsb.most.biz.dao.document.IBLDao;
import com.tsb.most.biz.dao.document.IDeliveryOrderDao;
import com.tsb.most.biz.dao.document.IGoodsReceiptDao;
import com.tsb.most.biz.dao.document.IShippingNoteDao;
import com.tsb.most.biz.dao.operation.ICargoLoadingDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dao.operation.IOperationSettingDao;
import com.tsb.most.biz.dao.operation.IRehandleGCDao;
import com.tsb.most.biz.dataitem.document.BLItem;
import com.tsb.most.biz.dataitem.document.GoodsReceiptItem;
import com.tsb.most.biz.dataitem.document.ShippingNoteItem;
import com.tsb.most.biz.dataitem.operation.CargoJobItem;
import com.tsb.most.biz.dataitem.operation.CargoLoadingItem;
import com.tsb.most.biz.dataitem.operation.CargoMasterItem;
import com.tsb.most.biz.dataitem.operation.OperationSettingItem;
import com.tsb.most.biz.dataitem.operation.RehandleGCItem;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchDeliveryOrderParm;
import com.tsb.most.biz.parm.document.SearchGoodsReceiptParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.biz.parm.operation.SearchRehandleGCParm;
import com.tsb.most.biz.service.document.IShippingNote;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public class RehandleGC extends MOSTBaseService implements IRehandleGC {
	private IRehandleGCDao rehandleGCDao;
	private IShippingNoteDao shippingNoteDao;
	private IBLDao blDao;
	private IGoodsReceiptDao goodsReceiptDao;
	private IDeliveryOrderDao deliveryOrderDao;
	private ICodeMasterDao codeMasterDao;
	private IWhConfigurationDao whConfigurationDao;
	private ICargoLoadingDao cargoLoadingDao;
	private IOperationSettingDao operationSetDao;
	private ICargoMasterDao cargoMasterDao;
	private IShippingNote shippingNote;

	public void setRehandleGCDao(IRehandleGCDao rehandleGCDao) {
		this.rehandleGCDao = rehandleGCDao;
	}
	public void setShippingNoteDao(IShippingNoteDao shippingNoteDao) {
		this.shippingNoteDao = shippingNoteDao;
	}
	public void setBlDao(IBLDao blDao) {
		this.blDao = blDao;
	}
	public void setDeliveryOrderDao(IDeliveryOrderDao deliveryOrderDao) {
		this.deliveryOrderDao = deliveryOrderDao;
	}
	public void setWhConfigurationDao(IWhConfigurationDao whConfigurationDao) {
		this.whConfigurationDao = whConfigurationDao;
	}
	public void setCargoLoadingDao(ICargoLoadingDao cargoLoadingDao) {
		this.cargoLoadingDao = cargoLoadingDao;
	}
	public void setOperationSetDao(IOperationSettingDao operationSetDao) {
		this.operationSetDao = operationSetDao;
	}
	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}
	public void setGoodsReceiptDao(IGoodsReceiptDao goodsReceiptDao) {
		this.goodsReceiptDao = goodsReceiptDao;
	}
	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}
	public void setShippingNote(IShippingNote shippingNote) {
		this.shippingNote = shippingNote;
	}
	public DataItemList selectCargoRehandlingComboList(SearchRehandleGCParm parm) throws BizException {
        RehandleGCItem returnItem = new RehandleGCItem();
        DataItemList returnItems = new DataItemList();
        if (parm.getSearchType().equals("initComboList")) {
        	SearchCodeMasterParm partyCode = new SearchCodeMasterParm();

            partyCode.setLcd("MT");
            partyCode.setMcd("CATGTP"); // event type
            if ("RHDL".equals(parm.getScreanNm())) {
                partyCode.setCol1("G");
            }
            returnItem.setCategoryList(this.codeMasterDao.selectCodeMasterList(partyCode).getCollection());

            partyCode = new SearchCodeMasterParm();
            partyCode.setLcd("MT");
            partyCode.setMcd("RHDLMODE"); // event type
            if (parm.getCol3() != null && parm.getCol3() != "") {
                partyCode.setCol3(parm.getCol3());
            }

            returnItem.setRehandlingModeList(this.codeMasterDao.selectCodeMasterList(partyCode).getCollection());

            partyCode = new SearchCodeMasterParm();
            partyCode.setLcd("MT");
            partyCode.setMcd("CGCOCD"); // event type
            returnItem.setCargoConditionList(this.codeMasterDao.selectCodeMasterList(partyCode).getCollection());

            partyCode = new SearchCodeMasterParm();
            partyCode.setLcd("MT");
            partyCode.setMcd("SPCACOCD"); // event type
            returnItem.setSpecialCgList(this.codeMasterDao.selectCodeMasterList(partyCode).getCollection());

            returnItem.setCommodityGroupList(rehandleGCDao.selectCommodityGroupList(parm).getCollection());
            
            returnItems.add(returnItem);
        } else {
        	return rehandleGCDao.selectCargoRehandlingComboList(parm);
        }
        
        return returnItems;
    }

    public DataItemList selectCommodityGroupList(SearchRehandleGCParm parm) throws BizException {
    	return rehandleGCDao.selectCommodityGroupList(parm);
    }
    
    public DataItemList selectCommodtiyCodeList(SearchRehandleGCParm parm) throws BizException {
    	return rehandleGCDao.selectCommodtiyCodeList(parm);
    }
    
    public DataItemList selectRhdlShippingNoteComboList(SearchRehandleGCParm parm) throws BizException {
    	return rehandleGCDao.selectRhdlShippingNoteComboList(parm);
    }

    public DataItemList selectRhdlGrNoComboList(SearchRehandleGCParm parm) throws BizException {
    	return rehandleGCDao.selectRhdlGrNoComboList(parm);
    }

    public DataItemList selectCargoRehandlingPopupList(SearchRehandleGCParm parm) throws BizException {
        return rehandleGCDao.selectCargoRehandlingPopupList(parm);
    }
    
    public DataItemList selectCargoRehandlingDetailList(SearchRehandleGCParm parm) throws BizException {
    	return rehandleGCDao.selectCargoRehandlingDetailList(parm);
    }

    public void insertCargoRehandlingItems(InsertItemsBizParm parm) throws BizException {
//        DataItemCollection items = parm.getDataItems();
//        rehandleGCDao.insertCargoRehandlingItems(parm.getTxTraceinfo(), items);
    }
    
	public DataItemList processCargoRehandlingItem(UpdateItemsBizParm parm) throws BizException {
		RehandleGCItem rehandlItem = (RehandleGCItem) parm.getUpdateItems().get(0);
		DataItemList resultItems = new DataItemList();

		if("C".equalsIgnoreCase(rehandlItem.getRhdlMode())) {		
			String strCgNo = rehandlItem.getCgNo();
	        String[] arrCgNo = strCgNo.split(",", 50);
	 
	        for (int i = 0; i < arrCgNo.length; i++) {
	        	rehandlItem.setCgNo(arrCgNo[i]);
	        	if(i == 0) {
	        		rehandlItem.setFlag("1");
	        	}else {
	        		rehandlItem.setFlag("0");
	        	}
	        	// Check NextSN exists:
	        	DataItemList snCheckList = this.selectShipgNoteItems(rehandlItem);
	        	if (snCheckList != null && snCheckList.size() > 0) {
	        		ShippingNoteItem snItem = (ShippingNoteItem) snCheckList.get(0);
	        		if ("E".equalsIgnoreCase(snItem.getCatgCd())) {
	        			return createExceptionItems(600, "existsCargoId", Arrays.asList(snItem));
	        		} else {
	        			this.updateRehandleItems(rehandlItem);
	        		}
	        	} else {
	        		this.insertRehandleItems(rehandlItem);
	        	}
	        }
	            
		}else if("R".equalsIgnoreCase(rehandlItem.getRhdlMode())) { //Return to Shipper
			this.insertRehandleItems(rehandlItem);
		}
		
		return resultItems;
	}
	
	public DataItemList processCargoRehandlingItemForUpdate(UpdateItemsBizParm parm) throws BizException {
		RehandleGCItem rehandlItem = (RehandleGCItem) parm.getUpdateItems().get(0);
		DataItemList resultItems = new DataItemList();
		
		UpdateItemsBizParm rhdlUpdParm = new UpdateItemsBizParm();
		DeleteItemsBizParm rhdlDelParm = new DeleteItemsBizParm();
    	DataItemList rhdlItemList = new DataItemList();
    	rhdlItemList.add(rehandlItem);
    	rhdlUpdParm.setUpdateItems(rhdlItemList);
    	rhdlDelParm.setDeleteItems(rhdlItemList);
    	
		if("C".equalsIgnoreCase(rehandlItem.getRhdlMode())) {
			//Change Vessel
			rehandleGCDao.updateCargoRehandlingDetailItemsForUpdate(rhdlUpdParm);
			rehandleGCDao.updateCargoRehandlingChgVslItemsForUpdate(rhdlUpdParm);
			rehandleGCDao.updateGrForUpdate(rhdlUpdParm);
			rehandleGCDao.updateShpgNoteItemsForUpdate(rhdlUpdParm);
			rehandleGCDao.updateShpgNoteAmtItemsForUpdate(rhdlUpdParm);
			rehandleGCDao.updateCgMstItemsForUpdate(rhdlUpdParm);
			rehandleGCDao.updateJobItemsForUpdate(rhdlUpdParm);
			rehandleGCDao.deleteCargoRehandlingInvLocItems(rhdlDelParm);
			String strCgNo = rehandlItem.getCgNo();
	        String[] arrCgNo = strCgNo.split(",", 50);
	 
	        for (int i = 0; i < arrCgNo.length; i++) {
	        	RehandleGCItem rhdlUpdParmForInv = (RehandleGCItem) rhdlUpdParm.getUpdateItems().get(0);
	        	rhdlUpdParmForInv.setCgNo(arrCgNo[i]);
	        	this.processInvLocForRehandlingForUpdate(rhdlUpdParmForInv);
	        }
			
		}else if("R".equalsIgnoreCase(rehandlItem.getRhdlMode())) { 
			//Return to Shipper
			rehandleGCDao.updateCargoRehandlingDetailItemsForUpdate(rhdlUpdParm);
			rehandleGCDao.updateCargoRehandlingRTSItemsForUpdate(rhdlUpdParm);
		}
		
		return resultItems;
	}
    
    /******************* insertRehandleItems *******************
	 * Insert RHD Detail
	 * Create SN, GR
	 * Insert INV_LOC
	 * */
    private void insertRehandleItems (RehandleGCItem rehandlItem) throws BizException {
    	DataItemList insertRhdlItems = new DataItemList();
    	InsertItemsBizParm insertRhdlParm = new InsertItemsBizParm();
    	
    	//Get RehandlNo
		SearchRehandleGCParm rhdCgParm = new SearchRehandleGCParm();
    	rhdCgParm.setNxVslCallId(rehandlItem.getNxVslCallId());
    	rhdCgParm.setNxRefNo(rehandlItem.getNxRefNo());
		String rhdlNo = (String)rehandleGCDao.selectRhdlNo(rhdCgParm).getCollection().get(0);
		rehandlItem.setRhdlNo(rhdlNo);
    	
    	if("C".equalsIgnoreCase(rehandlItem.getRhdlMode())) {    		
    		DataItemList insertSnItems = new DataItemList();
    		DataItemList insertGrItems = new DataItemList();
    		
    		InsertItemsBizParm insertSnParm = new InsertItemsBizParm();
    		InsertItemsBizParm insertGrParm = new InsertItemsBizParm();
    		
    		rehandlItem.setOpeClassCd("E");
    		
    		//Create SN.
    		ShippingNoteItem snItem = this.buildShippingNote(rehandlItem);
    		if(snItem == null) {
    			return;
    		}
    		
    		GoodsReceiptItem grItem = this.buildGR(snItem);
    		insertSnItems.add(snItem);
    		insertGrItems.add(grItem);
    		rehandlItem.setNxCgNo(grItem.getGdsRecvNo());
    		insertRhdlItems.add(rehandlItem);
    		
    		insertSnParm.setInsertItems(insertSnItems);
    		insertGrParm.setInsertItems(insertGrItems);
    		insertRhdlParm.setInsertItems(insertRhdlItems);
    		
    		if("1".equals(rehandlItem.getFlag())) {    			
    			shippingNote.insertItems(insertSnParm);
    			goodsReceiptDao.insertGoodsReceiptItems(insertGrParm);
    		}
    		
    		rehandlItem.setNxGrNo(grItem.getGdsRecvNo());
    		rehandlItem.setNxCgNo(grItem.getGdsRecvNo());
    		
    		if("1".equals(rehandlItem.getFlag())) {			
    			this.insertCargoMstItems(rehandlItem);
    		}
    		
    		this.processInvLocForRehandling(rehandlItem);
    		
    		if("1".equals(rehandlItem.getFlag())) {   			
    			rehandleGCDao.insertCargoRehandlingItems(insertRhdlParm);
    		}
    	
    	}else if("R".equalsIgnoreCase(rehandlItem.getRhdlMode())) { //Return to Shipper
    		rehandlItem.setOpeClassCd("S");
    		insertRhdlItems.add(rehandlItem);
    		insertRhdlParm.setInsertItems(insertRhdlItems);
    		rehandleGCDao.insertCargoRehandlingItems(insertRhdlParm);
    	}
    }
    
    /******************* insertRehandleItems *******************
	 * Update SN, GR, RHD
	 * Insert RHD Detail
	 */
    private void updateRehandleItems (RehandleGCItem rehandlItem)  throws BizException {
    	DataItemList insertRhdlItems = new DataItemList(); //Insert new Detail
		InsertItemsBizParm insertRhdlParm = new InsertItemsBizParm();
		
		if("C".equalsIgnoreCase(rehandlItem.getRhdlMode())) {
    	
			//Get RehandlNo
			rehandlItem.setOpeClassCd("E");
			SearchRehandleGCParm rhdCgParm = new SearchRehandleGCParm();
	    	rhdCgParm.setNxVslCallId(rehandlItem.getNxVslCallId());
	    	rhdCgParm.setNxRefNo(rehandlItem.getNxRefNo());
			String rhdlNo = (String)rehandleGCDao.selectRhdlNo(rhdCgParm).getCollection().get(0);
			rehandlItem.setRhdlNo(rhdlNo);
			
			if(rehandleGCDao.selectCargoRehandlingDetailList(rhdCgParm).getCollection().size() > 0) {
				RehandleGCItem existsRhdlItem = (RehandleGCItem)rehandleGCDao.selectCargoRehandlingDetailList(rhdCgParm).getCollection().get(0);
				rehandlItem.setNxCgNo(existsRhdlItem.getNxCgNo());
				
				insertRhdlItems.add(rehandlItem);
				insertRhdlParm.setInsertItems(insertRhdlItems);
				
				this.updateAmtCargoMstItems(rehandlItem);
				this.processInvLocForRehandling(rehandlItem);
				rehandleGCDao.insertCargoRehandlingItems(insertRhdlParm);
			}
			
		}else if("R".equalsIgnoreCase(rehandlItem.getRhdlMode())) { //Return to Shipper
			rehandlItem.setOpeClassCd("S");
			insertRhdlItems.add(rehandlItem);
			insertRhdlParm.setInsertItems(insertRhdlItems);
    		rehandleGCDao.insertCargoRehandlingItems(insertRhdlParm);
    	}
    	
    }
    
    /*
     * DELETE RHDL DATA:
     * 
     * 1. Delete TMT_RHDL_CG_DTL/ Update SN, GR
     * 2. IF TMT_RHDL_CG_DTL IS is empty:
     * 		- DELETE TMT_INV_LOC
     * 		- DELETE TMT_RHDL_CG
     * 		- DELETE TMT_SHIPG_NOTE (TM_GR/TMT_MF)
     * */
    @Override
    public DataItemList deleteCargoRehandlingItem(DeleteItemsBizParm parm) throws BizException {
    	DataItemList resResponse = new DataItemList();
    	DataItemList masterItem = parm.getDeleteItems();
    	DeleteItemsBizParm deleteRhdlItems = new DeleteItemsBizParm();
    	DeleteItemsBizParm deleteSnItems = new DeleteItemsBizParm();
    	DeleteItemsBizParm deleteGrItems = new DeleteItemsBizParm();
    	RehandleGCItem delRhdlItem = (RehandleGCItem) masterItem.getCollection().get(0);
    	deleteRhdlItems.addDeleteItem(delRhdlItem);
    	
    	if(validateDeleteRhdlItem(delRhdlItem) != null) {
    		return createExceptionItems(600, "existsOperation", masterItem.getCollection());
    	}
    	
    	
    	if("R".equalsIgnoreCase(delRhdlItem.getRhdlMode())) {
    		SearchGoodsReceiptParm grParm = new SearchGoodsReceiptParm();
    		grParm.setVslCallId(delRhdlItem.getVslCallId());
    		grParm.setShipgNoteNo(delRhdlItem.getOrgRefNo());
    		grParm.setRhdlNo(delRhdlItem.getRhdlNo());
    		
    		DataItemList resList = rehandleGCDao.selectRstGr(grParm);
        	if(resList != null && resList.getCollection().size() >0) {
        		return createExceptionItems(600, "existsRtsGr", masterItem.getCollection());
        	}else {
        		rehandleGCDao.deleteCargoRehandlingItems(deleteRhdlItems);
        	}
    		
    	}else if("C".equalsIgnoreCase(delRhdlItem.getRhdlMode())) {
    		GoodsReceiptItem grItem = new GoodsReceiptItem();
        	
        	ShippingNoteItem delSnItem = new ShippingNoteItem();
        	delSnItem.setVslCallId(delRhdlItem.getNxVslCallId());
        	delSnItem.setShipgNoteNo(delRhdlItem.getNxRefNo());
        	deleteSnItems.addDeleteItem(delSnItem);
        	
        	grItem.setVslCallId(delSnItem.getVslCallId());
        	grItem.setShipgNoteNo(delRhdlItem.getNxCgNo());
        	grItem.setGdsRecvNo(delRhdlItem.getNxCgNo());
        	deleteGrItems.addDeleteItem(grItem);
        	
        	rehandleGCDao.deleteCargoRehandlingInvLocItems(deleteRhdlItems);
        	rehandleGCDao.deleteCargoRehandlingItems(deleteRhdlItems);
        	
        	
        	//Delete Docs:
        	SearchRehandleGCParm rhdlParm = new SearchRehandleGCParm();
        	rhdlParm.setVslCallId(delRhdlItem.getOrgVslCallId());
        	rhdlParm.setOrgRefNo(delRhdlItem.getOrgRefNo());
        	rhdlParm.setNxVslCallId(delRhdlItem.getNxVslCallId());
        	rhdlParm.setNxRefNo(delRhdlItem.getNxRefNo());
        	rhdlParm.setRhdlNo(delRhdlItem.getRhdlNo());
        	DataItemList resRhdl = rehandleGCDao.selectCargoRehandlingDetailList(rhdlParm);

        	if(resRhdl.getCollection() == null || resRhdl.getCollection().size() == 0) {
        		goodsReceiptDao.deleteGoodsReceiptItems(deleteGrItems); //Delete GoodsReceipt
            	shippingNoteDao.deleteItems(deleteSnItems); //Delete Shipping Note
            	rehandleGCDao.deleteCargoMstItems(deleteRhdlItems); //delete CargoMST
        	}else {
        		//Update amount:
        		DataItemList snUpdItems = new DataItemList();
        		SearchShippingNoteParm snParm = new SearchShippingNoteParm();
        		snParm.setVslCallId(delRhdlItem.getNxVslCallId());
        		snParm.setShipgNoteNo(delRhdlItem.getNxRefNo());
            	ShippingNoteItem snUpAmtItem = (ShippingNoteItem)shippingNoteDao.selectShippingNoteList(snParm).getCollection().get(0);
            	snUpAmtItem.setCgWgt(snUpAmtItem.getCgWgt() - delRhdlItem.getRhdlWgt());
            	snUpAmtItem.setCgMsrmt(snUpAmtItem.getCgMsrmt() - delRhdlItem.getRhdlMsrmt());
            	snUpAmtItem.setPkgQty(snUpAmtItem.getPkgQty() - delRhdlItem.getRhdlPkgQty());
            	snUpAmtItem.setUserId(delRhdlItem.getUserId());
            	snUpAmtItem.setNewVersion(delRhdlItem.getNewVersion());
            	snUpdItems.add(snUpAmtItem);
            	shippingNoteDao.updateShippingNoteAmountItems(snUpdItems);
            	
            	UpdateItemsBizParm grUpdParm = new UpdateItemsBizParm();
            	DataItemList grUpdItems = new DataItemList();
        		SearchGoodsReceiptParm grParm = new SearchGoodsReceiptParm();
        		grParm.setVslCallId(delRhdlItem.getNxVslCallId());
        		grParm.setShipgNoteNo(delRhdlItem.getNxRefNo());
        		grParm.setGdsRecvNo(delRhdlItem.getNxCgNo());
            	GoodsReceiptItem grUpAmtItem = (GoodsReceiptItem)goodsReceiptDao.getGoodsReceiptList(grParm).getCollection().get(0);
            	grUpAmtItem.setGrWgt(grUpAmtItem.getGrWgt() - delRhdlItem.getRhdlWgt());
            	grUpAmtItem.setGrMsrmt(grUpAmtItem.getGrMsrmt() - delRhdlItem.getRhdlMsrmt());
            	grUpAmtItem.setGrQty(grUpAmtItem.getGrQty() - delRhdlItem.getRhdlPkgQty());
            	grUpAmtItem.setUserId(delRhdlItem.getUserId());
            	grUpdItems.add(grUpAmtItem);
            	grUpdParm.setUpdateItems(grUpdItems);
            	goodsReceiptDao.updateGoodsReceiptAmountItems(grUpdParm);
            	
            	//Update Amount CG_MST
            	RehandleGCItem updCgMstItem = (RehandleGCItem)delRhdlItem.clone();
            	
            	updCgMstItem.setRhdlPkgQty(-updCgMstItem.getRhdlPkgQty());
            	updCgMstItem.setRhdlWgt(-updCgMstItem.getRhdlWgt());
            	updCgMstItem.setRhdlMsrmt(-updCgMstItem.getRhdlMsrmt());
            	
            	UpdateItemsBizParm cgMstUpdParm = new UpdateItemsBizParm();
            	DataItemList cgMstItemList = new DataItemList();
            	cgMstItemList.add(updCgMstItem);
            	cgMstUpdParm.setUpdateItems(cgMstItemList);
            	rehandleGCDao.updateAmtCargoMstItems(cgMstUpdParm);
        	}
    	}
    	return deleteRhdlItems.getDeleteItems();
    }
    
    private DataItemList validateDeleteRhdlItem(RehandleGCItem delRhdlItem) throws BizException {
    	SearchRehandleGCParm rhdlParm = new SearchRehandleGCParm();
    	rhdlParm.setNxVslCallId(delRhdlItem.getNxVslCallId());
    	rhdlParm.setNxRefNo(delRhdlItem.getNxRefNo());
    	rhdlParm.setRhdlMode(delRhdlItem.getRhdlMode());
    	rhdlParm.setRhdlNo(delRhdlItem.getRhdlNo());
    	rhdlParm.setVslCallId(delRhdlItem.getVslCallId());
    	rhdlParm.setOrgRefNo(delRhdlItem.getOrgRefNo());
    	DataItemList resList = rehandleGCDao.validateDelete(rhdlParm);
    	if(resList != null && resList.getCollection().size() >0) {
    		return resList;
    	}
    	return null;
    }
    
    private GoodsReceiptItem buildGR(ShippingNoteItem snItem) throws BizException {
    	
    	GoodsReceiptItem grItem = new GoodsReceiptItem();
    	DataItemList list = goodsReceiptDao.selectGoodsReceiptNo(new SearchGoodsReceiptParm());
		String newGrNo = ((GoodsReceiptItem) (list.get(0))).getGdsRecvNo();
    	
    	grItem.setVslCallId(snItem.getVslCallId());
        grItem.setVslCd(snItem.getVslCd());
        grItem.setCallYear(snItem.getCallYear());
        grItem.setCallSeq(snItem.getCallSeq());
        grItem.setMfDocId(snItem.getMfDocId());
        grItem.setGdsRecvNo(newGrNo);
        grItem.setGrTsptTpCd(snItem.getTsptTpCd());  	    
        grItem.setPkgTpCd(snItem.getPkgTpCd());
        grItem.setCmdtCd(snItem.getCmdtCd());
        grItem.setUserId(snItem.getUserId());
        grItem.setCmdtCd(snItem.getCmdtCd());
        grItem.setRhdlMode("C"); //Change Vessel
        grItem.setRhdlNo(snItem.getRhdlNo()); // Tobe Assign
        grItem.setSpCargoChk("N");
        grItem.setAdCargoChk("N");
        
        grItem.setGrMsrmt(snItem.getCgMsrmt());
        grItem.setGrWgt(snItem.getCgWgt());
        grItem.setGrQty(snItem.getPkgQty());
        grItem.setShipgNoteNo(snItem.getShipgNoteNo());
        
    	return grItem;
    }

    
    private void insertCargoMstItems(RehandleGCItem rhdlItem) throws BizException{
    	InsertItemsBizParm insertParm = new InsertItemsBizParm();
    	DataItemList cgMstItemList = new DataItemList();
    	RehandleGCItem cgMstItem = (RehandleGCItem)rhdlItem.clone();
    	
    	cgMstItem.setDelvTpCd("I");
    	cgMstItem.setOpeClassCd(rhdlItem.getCaTgCd());
    	cgMstItem.setStat("ST");
    	
    	cgMstItemList.add(cgMstItem);
    	insertParm.setInsertItems(cgMstItemList);
    	
    	rehandleGCDao.insertCargoMstItems(insertParm);
    }
    
    private void updateAmtCargoMstItems(RehandleGCItem rhdlItem) throws BizException{
    	UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
    	DataItemList cgMstItemList = new DataItemList();
    	RehandleGCItem cgMstItem = (RehandleGCItem)rhdlItem.clone();
    	cgMstItemList.add(cgMstItem);
    	updateParm.setUpdateItems(cgMstItemList);
    	rehandleGCDao.updateAmtCargoMstItems(updateParm);
    }
    
    
    private void processInvLocForRehandling(RehandleGCItem rehandlItem) throws BizException {
    	SearchRehandleGCParm rhdCgParm = new SearchRehandleGCParm();
    	DataItemList insertInvLocList = new DataItemList();
    	DataItemList insertJobList = new DataItemList();
    	
    	int tolQty, restQty; 
    	double tolMt,restMt;
    	double tolM3, restM3;
    	tolQty = restQty = rehandlItem.getRhdlPkgQty();
    	tolMt = restMt = rehandlItem.getRhdlWgt();
    	tolM3 =  restM3 = rehandlItem.getRhdlMsrmt();
    	
    	rhdCgParm.setVslCallId(rehandlItem.getVslCallId());
    	rhdCgParm.setOrgRefNo(rehandlItem.getOrgRefNo());
    	rhdCgParm.setOpeClassCd(rehandlItem.getCaTgCd());
    	if (rehandlItem.getRhdlMode().equalsIgnoreCase("R")) {
    		rhdCgParm.setLocId(rehandlItem.getWhLocIds().split(",")[0]);
    	} else {
    		rhdCgParm.setLocId(rehandlItem.getLocId());
    	}
    	
    	
    	DataItemList invResult = rehandleGCDao.selectInvLocList(rhdCgParm);
    	if(invResult.getCollection() == null || invResult.getCollection().size() == 0) {
    		throw new BizException ("rhdl_cg_no_orgInvLoc");
    	}
    	
    	String invJobNo = (String)rehandleGCDao.selectRhdlLinkJobNo(rhdCgParm).getCollection().get(0);
    	rehandlItem.setJobNo(invJobNo);
    	List<RehandleGCItem> invLocList = (ArrayList<RehandleGCItem>)invResult.getCollection();
    	
    	Comparator<RehandleGCItem> cmp = (s1, s2) -> Double.compare(s1.getPkgQty(), s2.getPkgQty());
    	invLocList.sort(cmp);
    	
    	for (RehandleGCItem rehandleGCItem : invLocList) {
    		
			RehandleGCItem invLocNItem = (RehandleGCItem)rehandleGCItem.clone(); // -
			RehandleGCItem invLocPItem = (RehandleGCItem)rehandleGCItem.clone(); // +
			
			if(restQty <= 0 && restMt <= 0 && restM3 <= 0) {
				break; // full amount.
			}
			
			int itemQty = rehandleGCItem.getPkgQty();
	    	double itemMt = rehandleGCItem.getWgt();
	    	double itemM3 = rehandleGCItem.getMsrmt();
	    	
	    	int minQty = Math.min(itemQty, restQty);
			double minMt = Math.min(itemMt, restMt);
			double minM3 = Math.min(itemM3, restM3);
	    	
			if(restQty > 0) {
				if(restQty == rehandleGCItem.getPkgQty()) {
		    		//Remove Original Amount
		    		invLocNItem.setPkgQty(-itemQty);
	    			invLocNItem.setWgt(-itemMt);
	    			invLocNItem.setMsrmt(-itemM3);
	    			
	    			//Add Amount for Next Cargo
	    			invLocPItem.setPkgQty(restQty);
	    			invLocPItem.setWgt(restMt);
	    			invLocPItem.setMsrmt(restM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
		    	}else if(restQty < rehandleGCItem.getPkgQty()) {
	    			invLocNItem.setPkgQty(-restQty);
	    			invLocNItem.setWgt(-minMt);
	    			invLocNItem.setMsrmt(-minM3);
	    			
	    			invLocPItem.setPkgQty(restQty);
	    			invLocPItem.setWgt(restMt);
	    			invLocPItem.setMsrmt(restM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
	    		}else {// Incase Qty > first Item job WH List -> split
	    			
	    			invLocNItem.setPkgQty(-itemQty);
	    			invLocNItem.setWgt(-itemMt);
	    			invLocNItem.setMsrmt(-itemM3);
	    			
	    			invLocPItem.setPkgQty(itemQty);
	    			invLocPItem.setWgt(minMt);
	    			invLocPItem.setMsrmt(minM3);
	    			
	    			restQty -= itemQty;
	    			restMt -= minMt;
	    			restM3 -= minM3;
	    		}
			}
			else if(restMt > 0) {
				if(restMt == rehandleGCItem.getWgt()) {
		    		//Remove Original Amount
		    		invLocNItem.setPkgQty(-itemQty);
	    			invLocNItem.setWgt(-itemMt);
	    			invLocNItem.setMsrmt(-itemM3);
	    			
	    			//Add Amount for Next Cargo
	    			invLocPItem.setPkgQty(restQty);
	    			invLocPItem.setWgt(restMt);
	    			invLocPItem.setMsrmt(restM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
		    	}else if(restMt < rehandleGCItem.getWgt()) {
	    			invLocNItem.setPkgQty(-restQty);
	    			invLocNItem.setWgt(-minMt);
	    			invLocNItem.setMsrmt(-minM3);
	    			
	    			invLocPItem.setPkgQty(restQty);
	    			invLocPItem.setWgt(restMt);
	    			invLocPItem.setMsrmt(restM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
	    		}else {// Incase Qty > first Item job WH List -> split
	    			
	    			invLocNItem.setPkgQty(-itemQty);
	    			invLocNItem.setWgt(-itemMt);
	    			invLocNItem.setMsrmt(-itemM3);
	    			
	    			invLocPItem.setPkgQty(itemQty);
	    			invLocPItem.setWgt(minMt);
	    			invLocPItem.setMsrmt(minM3);
	    			
	    			restQty -= itemQty;
	    			restMt -= minMt;
	    			restM3 -= minM3;
	    		}
			}
    		
    		invLocNItem.setUserId(rehandlItem.getUserId());
    		invLocNItem.setJobNo(invJobNo);
    		invLocNItem.setRefNo(rehandlItem.getOrgRefNo());
			invLocNItem.setMfDocId(rehandlItem.getMfDocId());
			invLocNItem.setLocId(rehandlItem.getLocId());
			//rhdl Returun to Shipper
			if("R".equalsIgnoreCase(rehandlItem.getRhdlMode())) {
				invLocNItem.setVslCd(rehandlItem.getVslCd());
				invLocNItem.setCallSeq(rehandlItem.getCallSeq());
				invLocNItem.setCallYear(rehandlItem.getCallYear());
				invLocNItem.setLocId(rehandlItem.getWhLocIds().split(",")[0]);
			}
			
    		invLocPItem.setUserId(rehandlItem.getUserId());
    		invLocPItem.setJobNo(invJobNo);
    		invLocPItem.setVslCallId(rehandlItem.getNxVslCallId());
    		invLocPItem.setCgNo(rehandlItem.getNxCgNo());
			invLocPItem.setRefNo(rehandlItem.getNxRefNo());
			invLocPItem.setMfDocId(rehandlItem.getMfDocId());
			invLocPItem.setLocId(rehandlItem.getLocId());
			//rhdl Returun to Shipper
			if("R".equalsIgnoreCase(rehandlItem.getRhdlMode())) {
				invLocPItem.setVslCd(rehandlItem.getVslCd());
				invLocPItem.setCallSeq(rehandlItem.getCallSeq());
				invLocPItem.setCallYear(rehandlItem.getCallYear());
				invLocPItem.setLocId(rehandlItem.getWhLocIds().split(",")[0]);
				invLocPItem.setVslCallId(rehandlItem.getVslCallId());
			}
			
    		insertInvLocList.add(invLocNItem);
    		insertInvLocList.add(invLocPItem);
		}// end loop.
		
		InsertItemsBizParm insInvLocParm = new InsertItemsBizParm();
		insInvLocParm.setInsertItems(insertInvLocList);
		
		insertJobList = this.createInvJob(rehandlItem);
		InsertItemsBizParm insJobParm = new InsertItemsBizParm();
		insJobParm.setInsertItems(insertJobList);
		
		rehandleGCDao.insertJobItems(insJobParm);
		rehandleGCDao.insertCargoInvLocationItems(insInvLocParm);
    }
    
    private void processInvLocForRehandlingForUpdate(RehandleGCItem rehandlItem) throws BizException {
    	SearchRehandleGCParm rhdCgParm = new SearchRehandleGCParm();
    	DataItemList insertInvLocList = new DataItemList();
    	
    	int tolQty, restQty; 
    	double tolMt,restMt;
    	double tolM3, restM3;
    	tolQty = restQty = rehandlItem.getRhdlPkgQty();
    	tolMt = restMt = rehandlItem.getRhdlWgt();
    	tolM3 =  restM3 = rehandlItem.getRhdlMsrmt();
    	
    	rhdCgParm.setVslCallId(rehandlItem.getVslCallId());
    	rhdCgParm.setOrgRefNo(rehandlItem.getOrgRefNo());
    	rhdCgParm.setOpeClassCd(rehandlItem.getCaTgCd());
    	rhdCgParm.setLocId(rehandlItem.getLocId());
    	
    	DataItemList invResult = rehandleGCDao.selectInvLocList(rhdCgParm);
    	if(invResult.getCollection() == null || invResult.getCollection().size() == 0) {
    		throw new BizException ("rhdl_cg_no_orgInvLoc");
    	}
    	
    	List<RehandleGCItem> invLocList = (ArrayList<RehandleGCItem>)invResult.getCollection();
    	
    	Comparator<RehandleGCItem> cmp = (s1, s2) -> Double.compare(s1.getPkgQty(), s2.getPkgQty());
    	invLocList.sort(cmp);
    	
    	for (RehandleGCItem rehandleGCItem : invLocList) {
    		
			RehandleGCItem invLocNItem = (RehandleGCItem)rehandleGCItem.clone(); // -
			RehandleGCItem invLocPItem = (RehandleGCItem)rehandleGCItem.clone(); // +
			
			if(restQty <= 0 && restMt <= 0 && restM3 <= 0) {
				break; // full amount.
			}
			
			int itemQty = rehandleGCItem.getPkgQty();
	    	double itemMt = rehandleGCItem.getWgt();
	    	double itemM3 = rehandleGCItem.getMsrmt();
	    	
	    	int minQty = Math.min(itemQty, restQty);
			double minMt = Math.min(itemMt, restMt);
			double minM3 = Math.min(itemM3, restM3);
	    	
			if(restQty > 0) {
				if(restQty == rehandleGCItem.getPkgQty()) {
		    		//Remove Original Amount
		    		invLocNItem.setPkgQty(-itemQty);
	    			invLocNItem.setWgt(-itemMt);
	    			invLocNItem.setMsrmt(-itemM3);
	    			
	    			//Add Amount for Next Cargo
	    			invLocPItem.setPkgQty(restQty);
	    			invLocPItem.setWgt(restMt);
	    			invLocPItem.setMsrmt(restM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
		    	}else if(restQty < rehandleGCItem.getPkgQty()) {
	    			invLocNItem.setPkgQty(-restQty);
	    			invLocNItem.setWgt(-minMt);
	    			invLocNItem.setMsrmt(-minM3);
	    			
	    			invLocPItem.setPkgQty(restQty);
	    			invLocPItem.setWgt(restMt);
	    			invLocPItem.setMsrmt(restM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
	    		}else {// Incase Qty > first Item job WH List -> split
	    			
	    			invLocNItem.setPkgQty(-itemQty);
	    			invLocNItem.setWgt(-itemMt);
	    			invLocNItem.setMsrmt(-itemM3);
	    			
	    			invLocPItem.setPkgQty(itemQty);
	    			invLocPItem.setWgt(minMt);
	    			invLocPItem.setMsrmt(minM3);
	    			
	    			restQty -= itemQty;
	    			restMt -= minMt;
	    			restM3 -= minM3;
	    		}
			}
			else if(restMt > 0) {
				if(restMt == rehandleGCItem.getWgt()) {
		    		//Remove Original Amount
		    		invLocNItem.setPkgQty(-itemQty);
	    			invLocNItem.setWgt(-itemMt);
	    			invLocNItem.setMsrmt(-itemM3);
	    			
	    			//Add Amount for Next Cargo
	    			invLocPItem.setPkgQty(restQty);
	    			invLocPItem.setWgt(restMt);
	    			invLocPItem.setMsrmt(restM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
		    	}else if(restMt < rehandleGCItem.getWgt()) {
	    			invLocNItem.setPkgQty(-restQty);
	    			invLocNItem.setWgt(-minMt);
	    			invLocNItem.setMsrmt(-minM3);
	    			
	    			invLocPItem.setPkgQty(restQty);
	    			invLocPItem.setWgt(restMt);
	    			invLocPItem.setMsrmt(restM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
	    		}else {// Incase Qty > first Item job WH List -> split
	    			
	    			invLocNItem.setPkgQty(-itemQty);
	    			invLocNItem.setWgt(-itemMt);
	    			invLocNItem.setMsrmt(-itemM3);
	    			
	    			invLocPItem.setPkgQty(itemQty);
	    			invLocPItem.setWgt(minMt);
	    			invLocPItem.setMsrmt(minM3);
	    			
	    			restQty -= itemQty;
	    			restMt -= minMt;
	    			restM3 -= minM3;
	    		}
			}
    		
    		invLocNItem.setUserId(rehandlItem.getUserId());
    		invLocNItem.setJobNo(rehandlItem.getJobNo());
    		invLocNItem.setRefNo(rehandlItem.getOrgRefNo());
			invLocNItem.setMfDocId(rehandlItem.getMfDocId());
			invLocNItem.setLocId(rehandlItem.getLocId());
    		
    		invLocPItem.setUserId(rehandlItem.getUserId());
    		invLocPItem.setJobNo(rehandlItem.getJobNo());
    		invLocPItem.setVslCallId(rehandlItem.getNxVslCallId());
    		invLocPItem.setCgNo(rehandlItem.getNxCgNo());
			invLocPItem.setRefNo(rehandlItem.getNxRefNo());
			invLocPItem.setMfDocId(rehandlItem.getMfDocId());
			invLocPItem.setLocId(rehandlItem.getLocId());
    		
    		insertInvLocList.add(invLocNItem);
    		insertInvLocList.add(invLocPItem);
		}// end loop.
		
		InsertItemsBizParm insInvLocParm = new InsertItemsBizParm();
		insInvLocParm.setInsertItems(insertInvLocList);
		
		rehandleGCDao.insertCargoInvLocationItems(insInvLocParm);
    }
    
    //Create for TMT_JOB:
    private DataItemList createInvJob(RehandleGCItem rehandlItem) throws BizException{
    	DataItemList jobItems = new DataItemList();
    	CargoJobItem nxJobItem = new CargoJobItem();  	
		
		//Next CgJob
		nxJobItem.setJobNo(rehandlItem.getJobNo());
		nxJobItem.setVslCallId(rehandlItem.getNxVslCallId());
		nxJobItem.setCgNo(rehandlItem.getNxCgNo());
		nxJobItem.setDelvTpCd("I");
		nxJobItem.setOpeClassCd(rehandlItem.getCaTgCd()); //!
		nxJobItem.setJobTpCd("LF");
		nxJobItem.setJobCoCd("G");
		nxJobItem.setJobPurpCd("GW");
		nxJobItem.setTsptTpCd("LR");
		nxJobItem.setPkgTpCd(rehandlItem.getPkgTpCd());
		nxJobItem.setRhdlMode(rehandlItem.getRhdlMode());
		nxJobItem.setRhdlNo(rehandlItem.getRhdlNo());
		nxJobItem.setUserId(rehandlItem.getUserId());
		
		nxJobItem.setPkgQty(rehandlItem.getRhdlPkgQty());
		nxJobItem.setWgt(rehandlItem.getRhdlWgt());
		nxJobItem.setMsrmt(rehandlItem.getRhdlMsrmt());
		nxJobItem.setToLocId("");
		nxJobItem.setStatCd("COM");
		
		//added code for rhdl Return to shipper by Tim 16/03/0224
		nxJobItem.setMfDocId(rehandlItem.getMfDocId());
		 if("R".equalsIgnoreCase(rehandlItem.getRhdlMode())) {
			 nxJobItem.setVslCd(rehandlItem.getVslCd());
			 nxJobItem.setCallSeq(rehandlItem.getCallSeq());
			 nxJobItem.setCallYear(rehandlItem.getCallYear());
			 nxJobItem.setVslCallId(rehandlItem.getVslCallId());
		 }
		jobItems.add(nxJobItem);
		return jobItems;
    }
    
    private DataItemList selectShipgNoteItems(RehandleGCItem rehandlItem) {
    	SearchShippingNoteParm parm = new SearchShippingNoteParm();
    	parm.setVslCallId(rehandlItem.getNxVslCallId());
    	parm.setShipgNoteNo(rehandlItem.getNxRefNo());
    	
    	try {
			return shippingNoteDao.selectExistsShipgNoteNo(parm);
		} catch (DaoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return null;
    }
    
    private ShippingNoteItem buildShippingNote(RehandleGCItem rehandlItem) throws BizException  {
    	ShippingNoteItem snItem = null;
    	
    	if("T".equalsIgnoreCase(rehandlItem.getCaTgCd())
    			|| "I".equalsIgnoreCase(rehandlItem.getCaTgCd())
    			|| "A".equalsIgnoreCase(rehandlItem.getCaTgCd())){ //Original is B/L
    		
    		rehandlItem.setOpeClassCd("T");
    		
    		SearchBLParm blParm = new SearchBLParm();
    		blParm.setVslCallId(rehandlItem.getVslCallId());
    		blParm.setBlNo(rehandlItem.getOrgRefNo());
    		blParm.setMfDocId(rehandlItem.getMfDocId());
    		
    		BLItem blItem = (BLItem)blDao.selectBLList(blParm).getCollection().get(0);
    		ArrayList<BLItem> blCargoDetail = (ArrayList<BLItem>)blDao.selectBlCargoDetail(blParm).getCollection();
    		blItem.setBlDetailItems(blCargoDetail);
    		
    		snItem = new ShippingNoteItem();
    		BeanUtils.copyProperties(blItem, snItem);
    		
    		snItem.setVslCallId(rehandlItem.getNxVslCallId());
    		snItem.setVslCd(rehandlItem.getVslCd());
    		snItem.setCallYear(rehandlItem.getCallYear());
    		snItem.setCallSeq(rehandlItem.getCallSeq());
    		
    		snItem.setMfDocId(blItem.getMfDocId());
    		snItem.setShipgNoteNo(rehandlItem.getOrgRefNo());
    		snItem.setPortOfDis(blItem.getFnlPortCd());
    		snItem.setSa(blItem.getShaCd());
    		snItem.setFwrd(blItem.getFwdCd());
    		snItem.setCnsne(blItem.getCnsne());
    		snItem.setPkgTpCd(blItem.getPkgTpCd());
    		snItem.setPkgNumber(blItem.getPkgNo());
    		
    		snItem.setCatgCd("T"); //Transhipment
    		snItem.setStatCd("AP"); //Approve
    		snItem.setPortOfLoad("VNLAP"); //LAIP
    		snItem.setTsptTpCd("LR"); //Always Lorry
    		snItem.setDelvTpCd("I"); //Always Indirect
    		snItem.setRhdlNo(rehandlItem.getRhdlNo());
    		
    		snItem.setCgWgt(rehandlItem.getRhdlWgt());
    		snItem.setCgMsrmt(rehandlItem.getRhdlMsrmt());
    		snItem.setPkgQty(rehandlItem.getRhdlPkgQty());
    		
    		snItem.setImt(Double.toString(rehandlItem.getRhdlWgt()));
    		snItem.setIm3(Double.toString(rehandlItem.getRhdlMsrmt()));
    		snItem.setIqty(Integer.toString(rehandlItem.getRhdlPkgQty()));
    		snItem.setFreightTon(rehandlItem.getRhdlWgt());
    		
    		snItem.setDmt("0");
    		snItem.setDm3("0");
    		snItem.setDqty("0");
    		snItem.setdVslMt("0");
    		snItem.setdVslM3("0");
    		snItem.setdVslQty("0");
    		snItem.setdLrMt("0");
    		snItem.setdLrM3("0");
    		snItem.setdLrQty("0");
    		
    		//Set from B/L Amount:
    		snItem.setEachWgt(Double.valueOf(StringUtils.isBlank(blItem.getEachWgt()) ? "0" : blItem.getEachWgt()));
    		snItem.setEachMsrmt(Double.valueOf(StringUtils.isBlank(blItem.getEachVol()) ? "0" : blItem.getEachVol()));
    		snItem.setCgLen(Double.valueOf(StringUtils.isBlank(blItem.getCgLength()) ? "0" : blItem.getCgLength()));
    		snItem.setCgWth(Double.valueOf(StringUtils.isBlank(blItem.getCgWidth()) ? "0" : blItem.getCgWidth()));
    		snItem.setCgHgt(Double.valueOf(StringUtils.isBlank(blItem.getCgHeight()) ? "0" : blItem.getCgHeight()));
    		
    		ArrayList<ShippingNoteItem> dtlItem = (ArrayList<ShippingNoteItem>)this.buildDetailShippingNoteFromBl(snItem, blItem).getCollection();
    		snItem.setGoodsDetailItems(dtlItem); //TMT_SHIPG_NOTE_DTL
    		snItem.setUserId(rehandlItem.getUserId());
    		return snItem;
    		
    	}else if("E".equalsIgnoreCase(rehandlItem.getCaTgCd())
    				|| "R".equalsIgnoreCase(rehandlItem.getCaTgCd())
    				|| "S".equalsIgnoreCase(rehandlItem.getCaTgCd())){ // Original is SN Export or Storage
    		rehandlItem.setOpeClassCd("R");
    		
    		SearchShippingNoteParm parm = new SearchShippingNoteParm();
        	parm.setVslCallId(rehandlItem.getVslCallId());
        	parm.setShipgNoteNo(rehandlItem.getOrgRefNo());
        	ShippingNoteItem orgSn = (ShippingNoteItem)shippingNoteDao.selectShippingNoteList(parm).getCollection().get(0);
    	
        	snItem = (ShippingNoteItem) orgSn.clone();
        	snItem.setVslCallId(rehandlItem.getNxVslCallId());
    		snItem.setVslCd(rehandlItem.getVslCd());
    		snItem.setCallYear(rehandlItem.getCallYear());
    		snItem.setCallSeq(rehandlItem.getCallSeq());
        	snItem.setCatgCd("R"); // RHDL
        	snItem.setTsptTpCd("LR");
    		snItem.setDelvTpCd("I");
    		snItem.setRhdlNo(rehandlItem.getRhdlNo());
    		snItem.setUserId(rehandlItem.getUserId());
    		snItem.setCgWgt(rehandlItem.getRhdlWgt());
    		snItem.setCgMsrmt(rehandlItem.getRhdlMsrmt());
    		snItem.setPkgQty(rehandlItem.getRhdlPkgQty());
    		snItem.setImt(Double.toString(rehandlItem.getRhdlWgt()));
    		snItem.setIm3(Double.toString(rehandlItem.getRhdlMsrmt()));
    		snItem.setIqty(Integer.toString(rehandlItem.getRhdlPkgQty()));
    		snItem.setFreightTon(rehandlItem.getRhdlWgt());
        	return snItem;
    	}
    	return snItem; //null
    }
    
    private DataItemList  buildDetailShippingNoteFromBl(ShippingNoteItem snItem, BLItem blItem) throws BizException  {
    	DataItemList cmdtItems = new DataItemList();
    	ArrayList<BLItem> detailBlItems = new ArrayList<BLItem>(blItem.getBlDetailItems());
    	
    	for (BLItem blImportItem : detailBlItems) {
    		ShippingNoteItem sn = new ShippingNoteItem();
    		
    		sn.setVslCallId(snItem.getVslCallId());
    		sn.setVslCd(snItem.getVslCd());
    		sn.setCallYear(snItem.getCallYear());
    		sn.setCallSeq(snItem.getCallSeq());
    		sn.setMfDocId(sn.getMfDocId());
    		
    		sn.setPkgQtyDtl(Integer.valueOf(StringUtils.isBlank(blItem.getPkgQty()) ? "0": blItem.getPkgQty()));
    		sn.setMsrmtDtl(StringUtils.isBlank(blItem.getMsrmt()) ? "0": blItem.getMsrmt());
    		sn.setWgtDtl(StringUtils.isBlank(blImportItem.getWgt()) ? "0": blItem.getWgt());
    		sn.setCmdtCdDtl(sn.getCmdtCd());
    		sn.setTsptTpCdDtl(sn.getTsptTpCd());
    		sn.setHatchNo(blItem.getHatchNo());
    		
    		cmdtItems.add(sn);
		}
    	return cmdtItems;
    }
    
    private DataItemList  buildDetailShippingNoteFromSn(ShippingNoteItem snItem) throws BizException  {
    	DataItemList cmdtItems = new DataItemList();
    	    	
    	return cmdtItems;
    }
    
    private DataItemList createExceptionItems( int errorCode, String Code, List CollectionItems ) {
		DataItemList exceptionItems = new DataItemList();
		exceptionItems.setErrorFlag(errorCode);
		exceptionItems.setErrorDesc(Code);
		exceptionItems.setCollection(CollectionItems);
		return exceptionItems;
	}
    
    
    
    
    
    
    
    
    
    

    public DataItemList processCargoRehandlingItem_old(UpdateItemsBizParm parm) throws BizException {
    	DataItemList masterItem = parm.getUpdateItems();
        
//        for(DataItem addItem : masterItem.getItems()) {
//        	items.add(addItem);
//        }
        InsertItemsBizParm insertItems = new InsertItemsBizParm();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();


        SearchRehandleGCParm chkParm = null;
        String rhdlGroupNo = null;
        for (int i = 0; i < masterItem.size(); i++) {
            RehandleGCItem item = (RehandleGCItem) masterItem.get(i);
            String uuid = UUID.randomUUID().toString();
            item.setNewVersion(uuid);
            if (i == 0) {
                chkParm = new SearchRehandleGCParm();
                chkParm.setVslCallId(item.getVslCallId());
                chkParm.setOrgRefNo(item.getOrgRefNo());
                rhdlGroupNo = rehandleGCDao.getCargoRhdlGroupNo(chkParm);
            }
            if(item.getItems().get(0).getWorkingStatus() != null && item.getItems().get(0).getWorkingStatus().equals(DAOProcessType.DELETE)) {
            	for (int j = 0; j < item.getItems().size(); j++) {
            		RehandleGCItem ditem = (RehandleGCItem) item.getItems().get(j);
            		deleteItems.addDeleteItem(ditem);
            	}
            }else {
                insertItems.addInsertItem(item);
            }
            item.setRhdlGroupNo(rhdlGroupNo);
        }
        if (insertItems.getInsertItems() != null && insertItems.getInsertItems().size() > 0) {
        	rehandleGCDao.insertCargoRehandlingItems(insertItems);
        }
        if (deleteItems.getDeleteItems() != null && deleteItems.getDeleteItems().size() > 0) {
        	rehandleGCDao.deleteCargoRehandlingItems(deleteItems);
        }
        return masterItem;
    }

    public DataItemList selectCargoRehandlingList(SearchRehandleGCParm parm) throws BizException {
    	return rehandleGCDao.selectCargoRehandlingList(parm);
    }

    public DataItemList selectCargoRhdlOperation(SearchRehandleGCParm parm) throws BizException {
        if (parm.getVslCallId().equals("NonCallId")) {
        	return rehandleGCDao.selectCargoRhdlOperationNonJPVC(parm);
        } else {
        	return rehandleGCDao.selectCargoRhdlOperation(parm);
        }
    }

    public DataItemList getCargoRhdlOperationNumbPage(SearchRehandleGCParm parm) throws BizException {
        List oNumbPage = rehandleGCDao.getNumbPage(parm).getCollection();
        DataItemList oDataResult = new DataItemList();
        oDataResult.add(oNumbPage);
        return oDataResult;
    }

    public DataItemList selectCargoRehandlingSnBlComboList(SearchRehandleGCParm parm) throws BizException {
        RehandleGCItem returnItem = new RehandleGCItem();
        SearchShippingNoteParm snParm = new SearchShippingNoteParm();
        SearchDeliveryOrderParm deParm = new SearchDeliveryOrderParm();
        DataItemList returnItems = new DataItemList();
        if ("S".equals(parm.getOpeClassCd())) {
            snParm.setOpType("cgRh");
            snParm.setVslCallId("NonCallId");
            deParm.setVslCallId("NonCallId");
            snParm.setArrvDtFm(parm.getArrvDtFm());
            snParm.setArrvDtTo(parm.getArrvDtTo());
            deParm.setEtaFrom(parm.getArrvDtFm());
            deParm.setEtaTo(parm.getArrvDtTo());
        } else {
            snParm.setVslCallId(parm.getVslCallId());
            deParm.setVslCallId(parm.getVslCallId());
            snParm.setArrvDtFm(parm.getArrvDtFm());
            snParm.setArrvDtTo(parm.getArrvDtTo());
            deParm.setEtaFrom(parm.getArrvDtFm());
            deParm.setEtaTo(parm.getArrvDtTo());
            deParm.setMfdocid(parm.getMfDocId());
            snParm.setMfDocId(parm.getMfDocId());
        }
        if (parm.getSearchType().equals("sn/bl")) { // USING CT122
            returnItem.setSnList(shippingNoteDao.selectShippingNoteComboList(snParm).getCollection());
            returnItem.setBlList(deliveryOrderDao.getDeliveryOrderBLComboList(deParm).getCollection());
            returnItem.setBlSnList(rehandleGCDao.getCargoRhdlBlSnCombo(parm).getCollection());
            
            
            returnItems.add(returnItem);
        } else if (parm.getSearchType().equals("storage/sn/bl")) { // USING
            // CT122
        	return rehandleGCDao.getCargoRhdlStorageSnCombo(parm);
        } else if (parm.getSearchType().equals("rhdlop/sn/bl")) { // USING
            // CT215
        	return rehandleGCDao.getCargoRhdlOpBlSnCombo(parm);
        } else if (parm.getSearchType().equals("nxSn")) {
        	return shippingNoteDao.selectShippingNoteComboList(snParm);
        }

        return returnItems;
    }
    public DataItemList selectCargoRhdlLoadingList(SearchCargoLoadingParm parm) throws BizException {

        CargoLoadingItem returnItem = new CargoLoadingItem();
        DataItemList returnItems = new DataItemList();        
        OperationSettingItem opReturnItem = new OperationSettingItem();
        SearchOperationSettingParm opParm = new SearchOperationSettingParm();
        opParm.setShftDt(parm.getShftDt());
        opParm.setShftId(parm.getShftId());
        opParm.setCgTpCd(parm.getCgTpCd());
        opParm.setVslCallId(parm.getVslCallId());
        
        if(parm.getCgTpCd().equals("BBK")) {
        	opParm.setSearchType("HTBBK");
        }
        
        if(parm.getCgTpCd().equals("DBK")) {
        	opParm.setSearchType("HTDBK");
        }
        
       
        if ("Y".equals(parm.getHhtFlag())) {
            List list = cargoLoadingDao.getCargoRhdlLoadingList(parm).getCollection();
            returnItem.add(list);
        } else {
            List list = cargoLoadingDao.getCargoRhdlLoadingList(parm).getCollection();
            
            if(!list.isEmpty()) {
            	 CargoLoadingItem cgLoadingItem = (CargoLoadingItem)list.get(0);
                 SearchCargoLoadingParm cgLoadingDetailParm = new SearchCargoLoadingParm();
                 
                 cgLoadingDetailParm.setOrgVslCallId(cgLoadingItem.getOrgVslCallId());
                 cgLoadingDetailParm.setOrgBlSn(cgLoadingItem.getOrgBlSn());
                 cgLoadingDetailParm.setRhdlGroupNo(cgLoadingItem.getRhdlGroupNo());
                 
                 ArrayList<CargoLoadingItem> childList = (ArrayList<CargoLoadingItem>)cargoLoadingDao.getCargoRhdlDtlLoading(cgLoadingDetailParm).getCollection();
                 
                 if(childList.get(0) != null) {
                 	cgLoadingItem.setItems(childList);
                 }
                 
                 returnItem.add(list);
                 returnItem = (CargoLoadingItem)list.get(0);
            }
            
            List hatchNoList = operationSetDao.getOpHatchList(opParm).getCollection();
            returnItem.setHatchNoList(hatchNoList);
            if(!"HHT".equals( parm.getSearchType()))
            {
            	 List operationSetHatchList = operationSetDao.getOperationSetHatch(opParm).getCollection();
                 returnItem.setOperationSetHatchList(operationSetHatchList);              
            }
                                      
            Object[] parmObj;
            SearchCodeMasterParm partyCode;
            ArrayList arrService;
            

            partyCode = new SearchCodeMasterParm();
            arrService = new ArrayList();
            partyCode.setLcd("MT");
            partyCode.setMcd("TSPTTP"); // event type
            partyCode.setCol2("MT");
            parmObj = new Object[] { partyCode };
            //arrService = this.callWebservice("CommonCodeBean","getCodeMasterList", parmObj);
            
            List modeOperation = codeMasterDao.selectCodeMasterList(partyCode).getCollection();
            
            returnItem.setModeOfOprList(modeOperation);

            partyCode = new SearchCodeMasterParm();
            arrService = new ArrayList();
            partyCode.setLcd("MT");
            partyCode.setMcd("DELVTP"); // event type
            parmObj = new Object[] { partyCode };
            List deliveryMode = codeMasterDao.selectCodeMasterList(partyCode).getCollection();
            returnItem.add(deliveryMode);
            
            returnItems.add(returnItem);
            
        }
        
        return returnItems;
    }
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return null;
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		InsertItemsBizParm insertItems = new InsertItemsBizParm();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		
		RehandleGCItem masterItem = (RehandleGCItem)parm.getUpdateItems().get(0);
		SearchRehandleGCParm chkParm = null;
        String rhdlGroupNo = null;
        
        for (int i = 0; i < masterItem.getItems().size(); i++) {
        	RehandleGCItem item = (RehandleGCItem) masterItem.getItems().get(i);
        	
            if (item.getWorkingStatus() != null
                    && !item.getWorkingStatus().equals(DAOProcessType.QUERY)) {
                if (item.getWorkingStatus().equals(DAOProcessType.INSERT)
                        || item.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
                    if (i == 0) {
                        chkParm = new SearchRehandleGCParm();
                        chkParm.setVslCallId(item.getVslCallId());
                        chkParm.setOrgRefNo(item.getOrgRefNo());
                        rhdlGroupNo = rehandleGCDao.getCargoRhdlGroupNo(chkParm);
                    }
                    item.setRhdlGroupNo(rhdlGroupNo);
                    insertItems.addInsertItem(item);
                } else if (item.getWorkingStatus().equals(DAOProcessType.DELETE)) {
                    deleteItems.addDeleteItem(item);
                }
            }
        }
        
        if (insertItems.getInsertItems() != null && insertItems.getInsertItems().size() > 0) {
        	rehandleGCDao.insertCargoRehandlingItems(insertItems);
        }
        
        if (updateItems.getUpdateItems() != null && updateItems.getUpdateItems().size() > 0) {
        	
        }
        
        if (deleteItems.getDeleteItems() != null && deleteItems.getDeleteItems().size() > 0) {
        	rehandleGCDao.deleteCargoRehandlingItems(deleteItems);
        }
		
		return null;
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return null;
	}

	@Override
	public DataItemList selectCargoRhdLoadingList(SearchRehandleGCParm parm) throws BizException {
		return rehandleGCDao.selectCargoRhdLoadingList(parm);
	}

	@Override
	public DataItemList processCargoRhdlLoadingItem(UpdateItemsBizParm parm) throws BizException {
		DataItemList masterItem = parm.getUpdateItems();
		
		CargoLoadingItem jobItem = null;
        CargoLoadingItem jobAvItem = null;
        CargoLoadingItem invJobItem = null;
        CargoLoadingItem jobMstDmgItem = null;
        CargoMasterItem mstItem = null;

        String jobGroupNo = null;

        boolean isBbk = false;
        boolean isDbk = false;

        
        SearchCargoMasterParm mstParm;
		SearchWhConfigurationParm whParm;
		List listConfirmation = null;

		DataItemList insertItems = new DataItemList();// 1
		DataItemList updateCgMstAmtItems = new DataItemList();// AMT
		
		// //2
		DataItemList updateCgLdCancelItems = new DataItemList();// Loading
		// Cancel
		DataItemList updateCgLoadedRePackItems = new DataItemList();// Loading
		// Repack
		DataItemList updateCgLoadedDamageItems = new DataItemList();// Loading
		// Damage
		DataItemList updateCgMstStatItems = new DataItemList();
		DataItemList updateCgMstDmgItems = new DataItemList();// StatDMG//5

		DataItemList insertBalItems = new DataItemList();// BAL
		DataItemList updatetBalItems = new DataItemList();// BAL
		// update
		DataItemList insertJobItems = new DataItemList();
		DataItemList updateJobItems = new DataItemList();

		DataItemList insertRhdlItems = new DataItemList();// TMT_RHDL_CG

		DataItemList insertArrvDelvItems = new DataItemList();// Direct
		DataItemList updateArrvDelvItems = new DataItemList();// Dirert

		DataItemList insertGateInItems = new DataItemList();// add
		DataItemList updateGateInItems = new DataItemList();// add
		DataItemList updateGateInLorryItems = new DataItemList();// add
		DataItemList updateGateInOnlyLorryItems = new DataItemList();// add

		DataItemList updateGPArrvDelvItems = new DataItemList();// Arrv_devl
		// gataoutDt;
		DataItemList updateLoadingSNItems = new DataItemList();// Sn
		DataItemList insertInvLocItems = new DataItemList();// INV_LOC
		// -de-allocation
		DataItemList insertAllocationItems = new DataItemList();// INV_LOC
		
		ArrayList<CargoLoadingItem> listChildItems = new ArrayList();
		CargoLoadingItem item = (CargoLoadingItem) masterItem.get(0);
		String uuid = UUID.randomUUID().toString();
		item.setNewVersion(uuid);
		
		mstParm = new SearchCargoMasterParm();
		mstParm.setCgNo(item.getCgNo());
		mstParm.setVslCallId(item.getVslCallId());
		mstParm.setLorryNo(item.getLorryId());
		mstParm.setCgInOutCd("I");
		
		if (item.getAutoLocFlag() != null && item.getAutoLocFlag().equals("true")) {

			whParm = new SearchWhConfigurationParm();
			whParm.setCgNo(item.getCgNo());
			whParm.setVslCallId(item.getVslCallId());
			whParm.setShipgNoteNo(item.getShipgNoteNo());

			// ////normal case inv_loc
			listConfirmation = whConfigurationDao.getInvLocs(whParm).getCollection();

			if (item.getLocCount() != 0 && listConfirmation.size() > 0 && "true".equals(item.getAutoNorLocFlag())) {
				if (item.getLocCount() == 1) {// One Cell
					oneAutoLoc(listConfirmation, item, "G");
				} else {// mutil Cell
					mutiAutoLoc(listConfirmation, item, "G");
				}
			}
			// //// Damage case inv_loc
			listConfirmation = whConfigurationDao.getDmgInvLocs(whParm).getCollection();

			if (item.getLocDmgCount() != 0 && listConfirmation.size() > 0 && "true".equals(item.getAutoDmgLocFlag())) {
				if (item.getLocDmgCount() == 1) {// One Cell
					oneAutoLoc(listConfirmation, item, "D");
				} else {// mutil Cell//More one cell locationAMt =
					// Load and dmg and shut Amt - Location??
					mutiAutoLoc(listConfirmation, item, "D");
				}
			}
			// /// spare case inv_loc
			listConfirmation = whConfigurationDao.getSprInvLocs(whParm).getCollection();

			if (item.getLocSprCount() != 0 && listConfirmation.size() > 0 && "true".equals(item.getAutoSprLocFlag())) {
				if (item.getLocSprCount() == 1) {// One Cell
					oneAutoLoc(listConfirmation, item, "S");
				} else {// mutil Cell//More one cell locationAMt =
					// Load and dmg and shut Amt - Location??
					mutiAutoLoc(listConfirmation, item, "S");
				}
			}

		}else {
			ArrayList<WhConfigurationItem> listCollection = new ArrayList();

            // amount setting
            int sumQty = 0;
            double sumMt = 0d;
            double sumM3 = 0d;

            // location seting
            int countWh = 0;
            String whName = null;
            String firstName = null;
            String minName = null;
            String whPreName = null;
            
            if(item.getWhConfigurationItems()!= null){
            	WhConfigurationItem whItem = item.getWhConfigurationItems().get(0);
            	String sourceSpCoCd = "";
                String targetSpCoCd = "";
                
                if (item.getSpCaCoCd() != null  && item.getSpCaCoCd() != "") {
                    sourceSpCoCd = item.getSpCaCoCd();
                }
                
                if (whItem.getSpCaCoCd() != null  && whItem.getSpCaCoCd() != "") {
                	targetSpCoCd = whItem.getSpCaCoCd();
                }
                if(item.getRhdlNo().equals(whItem.getRhdlNo())) {
                	listCollection.add(whItem);
                	sumQty += Integer.parseInt(whItem.getPkgQty());
                	sumMt += whItem.getWgt();
                	sumM3 += whItem.getMsrmt();
                	
                	if(countWh == 0) {
                		firstName= whItem.getLocId();
                		whName = firstName.substring(0, firstName.lastIndexOf("-"));
                		minName = firstName.substring(firstName.lastIndexOf("-") + 1);
                	}
                	
                	whPreName = whName + "(" + minName + ","  + ++countWh + ")";
                }
            }
            
            if(listCollection.size() > 0) {
            	item.setLoadQty(sumQty);
            	item.setLoadM3(sumM3);
            	item.setLoadMt(sumMt);
            	item.setToLocId(whPreName);
            	item.setLocId(whPreName);
            	
//            	rhhandleLoadingReload(item);
            	listChildItems.add(item);
            }
            item.setItems(listChildItems);
		}
		
		jobGroupNo = cargoMasterDao.getJobGroupNo(mstParm);
		item.setJobGroup(jobGroupNo);
		if (cargoMasterDao.getCargoMasterCheck(mstParm)) {
            item.setStat("LD");
            updateCgMstStatItems.add(item);// stat, job, date
            if (item.getCgTpCd().equals("BBK")  && !(item.getLoadMt() == 0 && item.getLoadQty() == 0)) {
                updateCgMstAmtItems.add(item);// TMT_CG_MST ,amt
            } else if (((item.getCgTpCd().equals("DBK") || item.getCgTpCd().equals("DBN") || item.getCgTpCd().equals("DBE")) && item.getLoadMt() > 0)) {
                updateCgMstAmtItems.add(item);// TMT_CG_MST ,amt
            }
        } else { // not exist is insert
        	item.setStat("LD");// statCd
            insertItems.add(item);
        }
		
		
		if ((item.getRePkgTpCd() != null && !item.getRePkgTpCd().equals("")) || item.getChkLoadDmgYn() == true) {
            // / Re-Package Amt Exist - Mst update last
            if (item.getRePkgTpCd() != null && !item.getRePkgTpCd().equals("")) {
                CargoLoadingItem repkgItem = (CargoLoadingItem) item.clone();
                updateCgLoadedRePackItems.add(repkgItem);
            }
            // / Loaded Damge Amt Exist - Mst Update last
            if (item.getChkLoadDmgYn()) {
                CargoLoadingItem loadedDmgItem = (CargoLoadingItem) item.clone();
                updateCgLoadedDamageItems.add(loadedDmgItem);
            }
        }
		
		for (int ichild = 0; ichild < item.getItems().size(); ichild++) {
            CargoLoadingItem cgItem = (CargoLoadingItem) item.getItems().get(ichild);

            cgItem.setJobGroup(jobGroupNo);
            /*
             * Rehandling loading 1.JOB WA : LD ==> original Gr,
             * Shipingnote, vsl_call, add rhdlNo AV : LD ==> next
             * Gr, Next Shipping note, next vslCallId add rhdlNo 2.
             * TMT_inv Case of WA ; minus invlocation 3. TMT_CG_MST
             * loading time
             */
            // ////1. TMT_JOB
            if ((cgItem.getCgTpCd().equals("BBK") && !(cgItem.getLoadMt() == 0 && cgItem.getLoadQty() == 0))) {
                // WA
                jobItem = (CargoLoadingItem) cgItem.clone();
                jobItem.setJobPurpCd("WA");
                jobItem.setJobTpCd("LD");
                jobItem.setStat("COM");
                jobItem.setToLocId(cgItem.getLocId());
                jobItem.setLoadMt(cgItem.getLoadMt());
                jobItem.setLoadM3(cgItem.getLoadM3());
                jobItem.setLoadQty(cgItem.getLoadQty());
                jobItem.setGrNo(cgItem.getGrNo());
                jobItem.setCgNo(cgItem.getOrgCgNo());
                jobItem.setCatgCd(cgItem.getOrgOpeClassCd());
                jobItem.setVslCallId(cgItem.getOrgVslCallId());
                
                jobItem.setWhConfigurationItems(cgItem.getWhConfigurationItems());
                
                if (cgItem.getGrNo() != null) {
                    jobItem.setShipgNoteNo(cgItem.getOrgBlSn());
                }
                insertJobItems.add(jobItem);

                // AV
                jobAvItem = (CargoLoadingItem) cgItem.clone();
                jobAvItem.setJobPurpCd("AV");
                jobAvItem.setJobTpCd("LD");
                jobAvItem.setStat("COM");
                jobAvItem.setLoadMt(cgItem.getLoadMt());
                jobAvItem.setLoadM3(cgItem.getLoadM3());
                jobAvItem.setLoadQty(cgItem.getLoadQty());
                jobAvItem.setGrNo(cgItem.getCgNo());
                jobAvItem.setCgNo(cgItem.getCgNo());
                jobAvItem.setVslCallId(cgItem.getVslCallId());
                jobAvItem.setShipgNoteNo(cgItem.getShipgNoteNo());
                insertJobItems.add(jobAvItem);
            } else if ((cgItem.getCgTpCd().equals("DBK") || cgItem.getCgTpCd().equals("DBN") || cgItem.getCgTpCd().equals("DBE")) 
            		&& cgItem.getLoadMt() > 0) {
                // WA
                jobItem = (CargoLoadingItem) cgItem.clone();
                jobItem.setJobPurpCd("WA");
                jobItem.setJobTpCd("LD");
                jobItem.setStat("COM");
                jobItem.setToLocId(cgItem.getLocId());
                jobItem.setLoadMt(cgItem.getLoadMt());
                jobItem.setLoadM3(cgItem.getLoadM3());
                jobItem.setLoadQty(cgItem.getLoadQty());
                jobItem.setGrNo(cgItem.getGrNo());
                jobItem.setCgNo(cgItem.getOrgCgNo());
                jobItem.setCatgCd(cgItem.getOrgOpeClassCd());
                jobItem.setVslCallId(cgItem.getOrgVslCallId());
                
                jobItem.setWhConfigurationItems(cgItem.getWhConfigurationItems());
                
                if (cgItem.getGrNo() != null) {
                    jobItem.setShipgNoteNo(cgItem.getOrgBlSn());
                }
                insertJobItems.add(jobItem);

                // AV
                jobAvItem = (CargoLoadingItem) cgItem.clone();
                jobAvItem.setJobPurpCd("AV");
                jobAvItem.setJobTpCd("LD");
                jobAvItem.setStat("COM");
                jobAvItem.setLoadMt(cgItem.getLoadMt());
                jobAvItem.setLoadM3(cgItem.getLoadM3());
                jobAvItem.setLoadQty(cgItem.getLoadQty());
                jobAvItem.setGrNo(cgItem.getCgNo());
                jobAvItem.setCgNo(cgItem.getCgNo());
                jobAvItem.setVslCallId(cgItem.getVslCallId());
                jobAvItem.setShipgNoteNo(cgItem.getShipgNoteNo());
                insertJobItems.add(jobAvItem);
            }
            // ///////////////////end JOB
            // Inventory location
            if(jobItem != null) {
            	if (jobItem.getWhConfigurationItems().size() > 0) {
                    ArrayList invLocItems = (ArrayList) jobItem.getWhConfigurationItems();
                    CargoLoadingItem cargoInvLocItem;
                    if (invLocItems.size() > 0) {
                        // WA:LD
                        for (int j = 0; j < invLocItems.size(); j++) {
                            cargoInvLocItem = (CargoLoadingItem) jobItem.clone();
                            WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems.get(j);
                            String sourceSpCoCd = "";
                            String targetSpCoCd = "";

                            if (cargoInvLocItem.getSpCaCoCd() != null
                                    && cargoInvLocItem.getSpCaCoCd() != "") {
                                sourceSpCoCd = cargoInvLocItem.getSpCaCoCd();
                            }

                            if (whconfItem.getSpCaCoCd() != null
                                    && whconfItem.getSpCaCoCd() != "") {
                                targetSpCoCd = whconfItem.getSpCaCoCd();
                            }

                            if (jobItem.getRhdlNo().equals(whconfItem.getRhdlNo())) {
                                cargoInvLocItem.setLocArea(jobItem.getLocId());
                                cargoInvLocItem.setLocId(whconfItem.getLocId());
                                cargoInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
                                cargoInvLocItem.setLocWgt(whconfItem.getWgt());
                                cargoInvLocItem.setLocMsrmt(whconfItem.getMsrmt());
                                cargoInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
                                cargoInvLocItem.setSpCaCoCd(whconfItem.getSpCaCoCd());
                                insertInvLocItems.add(cargoInvLocItem);
                            }
                        }
                    }
                    // WA/LD
                }
            }
            
            if (insertJobItems.size() > 0) {
                if (insertItems != null && insertItems.size() > 0) {
                	cargoLoadingDao.insertCargoLoadingItems(insertItems);
                }
                if (updateCgMstAmtItems.size() > 0) {
                	cargoLoadingDao.updateCgLdAmtItems(updateCgMstAmtItems);
                }
                if (updateCgMstStatItems.size() > 0) {
                    // job, date
                	cargoLoadingDao.updateCgLdStateItems(updateCgMstStatItems);
                }
                if (updateCgLoadedRePackItems.size() > 0) { // Loading RePack
                	cargoLoadingDao.updateCgLoadedRePackItems(updateCgLoadedRePackItems);
                }
                if (updateCgLoadedDamageItems.size() > 0) { // Loading Damage
                	cargoLoadingDao.updateCgLoadedDamageItems(updateCgLoadedDamageItems);
                }
                if (insertJobItems.size() > 0) {
                	cargoLoadingDao.insertJobItems(insertJobItems);
                }
                if (insertInvLocItems.size() > 0) { // INV_LOC
                	cargoLoadingDao.insertCargoInvLocationItems(insertInvLocItems); // minus Amt
                }
                if (insertJobItems.size() > 0) {
                	cargoLoadingDao.updateStatus(insertJobItems);
                	cargoLoadingDao.upAndDelMstItems(insertJobItems);// updateStaus
                }
            } 
        }
      return masterItem;
	}
	
	
	private void rhhandleLoadingReload(CargoLoadingItem item) {
		// TODO Auto-generated method stub
		
	}

	private void oneAutoLoc(List listConfirmation, CargoLoadingItem item,
			String flag) {

		ArrayList autoitemList = new ArrayList();
		String whName = null;
		String firstName = null;
		String minName = null;
		String whGPreName = null;
		String whDPreName = null;
		String whSPreName = null;
		int countG = 0;
		int countS = 0;
		int countD = 0;
		if (listConfirmation.size() < 0) {
			return;
		}
		if (item.getCgTpCd().equals("BBK")) {
			WhConfigurationItem autowhconfItem;

			// Normal Case
			if (item.getLoadMt() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";
					if (item.getLoadMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);
				}// end for
				item.setLocId(whGPreName);

			} else if (item.getLoadM3() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";
					if (item.getLoadM3() == item.getM3()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setLocId(whGPreName);
			} else if (item.getLoadQty() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";
					if (item.getLoadQty() == item.getQty()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setLocId(whGPreName);
			}

			// Spare Case
			if (item.getSprMt() > 0 && flag.equals("S")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}

					whSPreName = whName + "(" + minName + "," + ++countS + ")";

					if (item.getSprMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd("G");

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd("G");
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setSprLocId(whSPreName);
			} else if (item.getSprM3() > 0 && flag.equals("S")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}

					whSPreName = whName + "(" + minName + "," + ++countS + ")";

					if (item.getSprM3() == item.getM3()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd("G");

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd("G");
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setSprLocId(whSPreName);
			} else if (item.getSprQty() > 0 && flag.equals("S")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}

					whSPreName = whName + "(" + minName + "," + ++countS + ")";

					if (item.getSprQty() == item.getQty()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd("G");

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd("G");
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setSprLocId(whSPreName);
			}

			// Dmg Case
			if (item.getWhDmgMt() > 0 && flag.equals("D")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					whDPreName = whName + "(" + minName + "," + ++countD + ")";

					if (item.getWhDmgMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd("D");

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd("D");
					}

					autoitemList.add(autowhconfItem);

				}// end for
				item.setWhDmgLocId(whDPreName);
			} else if (item.getWhDmgM3() > 0 && flag.equals("D")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					whDPreName = whName + "(" + minName + "," + ++countD + ")";

					if (item.getWhDmgM3() == item.getM3()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd("D");

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd("D");
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setWhDmgLocId(whDPreName);
			} else if (item.getWhDmgQty() > 0 && flag.equals("D")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					whDPreName = whName + "(" + minName + "," + ++countD + ")";

					if (item.getWhDmgQty() == item.getQty()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd("D");

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd("D");
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setWhDmgLocId(whDPreName);
			}

			if (flag.equals("G")) {
				item.setWhConfigurationItems(autoitemList);
			} else if (flag.equals("S")) {
				item.setSprItems(autoitemList);
			} else if (flag.equals("D")) {
				item.setWhDmgItems(autoitemList);
			}
		} else {// DBK
			WhConfigurationItem autowhconfItem;

			// Normal Case
			if (item.getLoadMt() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					whGPreName = whName + "(" + minName + "," + ++countG + ")";

					if (item.getLoadMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));
					}

					autoitemList.add(autowhconfItem);
				}// end for
				item.setLocId(whGPreName);
			}

			// Spare Case
			if (item.getSprMt() > 0 && flag.equals("S")) {

				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}

					whSPreName = whName + "(" + minName + "," + ++countS + ")";

					if (item.getSprMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd("G");

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd("G");
					}

					autoitemList.add(autowhconfItem);

				}// end for
				item.setSprLocId(whSPreName);
			}
			// Damage Case
			if (item.getWhDmgMt() > 0 && flag.equals("D")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					whDPreName = whName + "(" + minName + "," + ++countD + ")";

					if (item.getWhDmgMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd("D");

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd("D");
					}

					autoitemList.add(autowhconfItem);

				}// end for
				item.setWhDmgLocId(whDPreName);
			}
			if (flag.equals("G")) {
				item.setWhConfigurationItems(autoitemList);
			} else if (flag.equals("S")) {
				item.setSprItems(autoitemList);
			} else if (flag.equals("D")) {
				item.setWhDmgItems(autoitemList);
			}

		}
	}
	
	private void mutiAutoLoc(List listConfirmation, CargoLoadingItem item,
			String flag) {
		ArrayList autoitemList = new ArrayList();
		String whName = null;
		String firstName = null;
		String minName = null;
		String whGPreName = null;
		String whDPreName = null;
		String whSPreName = null;
		int countG = 0;
		int countS = 0;
		int countD = 0;

		if (listConfirmation.size() < 0) {
			return;
		}

		if (item.getCgTpCd().equals("BBK")) {
			WhConfigurationItem autowhconfItem = new WhConfigurationItem();
			if (item.getLoadMt() > 0 && flag.equals("G")) {
				double sumMT = item.getLoadMt();// Summary AMT
				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getLoadQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {

							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						}
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setLocId(whGPreName);
			} else if (item.getLoadM3() > 0 && flag.equals("G")) {
				double sumMT = item.getLoadMt();// Summary AMT
				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getLoadQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;

				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumM3 <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					// }//EMN FOR
					if (0 != whconfItem.getMsrmt()
							&& whconfItem.getMsrmt() != whconfItem
									.getDumpMsrmt()) {
						// whGPreName = whName + "(" + minName + "," + ++countG
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumM3 > autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							// sumM3 = interSumM3;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else if (sumM3 == autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumM3 = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumM3 = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						}
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setLocId(whGPreName);
			} else if (item.getLoadQty() > 0 && flag.equals("G")) {
				double sumMT = item.getLoadMt();// Summary AMT
				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getLoadQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumQty <= 0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					if (!"0".equals(whconfItem.getPkgQty())
							&& !whconfItem.getPkgQty().equals(
									whconfItem.getDumpPkgQty())) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumQty > Integer.parseInt(autowhconfItem
								.getPkgQty())) {

							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else if (sumQty == Integer.parseInt(autowhconfItem
								.getPkgQty())) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumQty = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumQty = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						}
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setLocId(whGPreName);
			}
			if (item.getSprMt() > 0 && flag.equals("S")) {
				double sumMT = item.getSprMt();// Summary AMT
				double sumM3 = item.getSprM3();// Summary AMT
				int sumQty = item.getSprQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}
					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						// whSPreName = whName + "(" + minName + "," + ++countS
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							// double interSumMt = 0;
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						}
						autowhconfItem.setWhTpCd("G");
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setSprLocId(whSPreName);

			} else if (item.getSprM3() > 0 && flag.equals("S")) {
				double sumMT = item.getSprMt();// Summary AMT
				double sumM3 = item.getSprM3();// Summary AMT
				int sumQty = item.getSprQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumM3 <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}
					if (0 != whconfItem.getMsrmt()
							&& whconfItem.getMsrmt() != whconfItem
									.getDumpMsrmt()) {
						// whSPreName = whName + "(" + minName + "," + ++countS
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumM3 > autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else if (sumM3 == autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumM3 = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumM3 = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						}
						autowhconfItem.setWhTpCd("G");
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setSprLocId(whSPreName);
			} else if (item.getSprQty() > 0 && flag.equals("S")) {
				double sumMT = item.getSprMt();// Summary AMT
				double sumM3 = item.getSprM3();// Summary AMT
				int sumQty = item.getSprQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumQty <= 0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}
					if (!"0".equals(whconfItem.getPkgQty())
							&& !whconfItem.getPkgQty().equals(
									whconfItem.getDumpPkgQty())) {
						// whSPreName = whName + "(" + minName + "," + ++countS
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumQty > autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else if (sumQty == Integer.parseInt(autowhconfItem
								.getPkgQty())) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumQty = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumQty = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						}
						autowhconfItem.setWhTpCd("G");
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setSprLocId(whSPreName);
			}
			if (item.getWhDmgMt() > 0 && flag.equals("D")) {
				double sumMT = item.getWhDmgMt();// Summary AMT
				double sumM3 = item.getWhDmgM3();// Summary AMT
				int sumQty = item.getWhDmgQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size() || sumMT < 0; j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						// whDPreName = whName + "(" + minName + "," + ++countD
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						}
						autowhconfItem.setWhTpCd("D");
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setWhDmgLocId(whDPreName);

			} else if (item.getWhDmgM3() > 0 && flag.equals("D")) {
				double sumMT = item.getWhDmgMt();// Summary AMT
				double sumM3 = item.getWhDmgM3();// Summary AMT
				int sumQty = item.getWhDmgQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumM3 <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					if (0 != whconfItem.getMsrmt()
							&& whconfItem.getMsrmt() != whconfItem
									.getDumpMsrmt()) {
						// whDPreName = whName + "(" + minName + "," + ++countD
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumM3 > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else if (sumM3 == autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumM3 = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						}
						autowhconfItem.setWhTpCd("D");
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setWhDmgLocId(whDPreName);
			} else if (item.getWhDmgQty() > 0 && flag.equals("D")) {
				double sumMT = item.getWhDmgMt();// Summary AMT
				double sumM3 = item.getWhDmgM3();// Summary AMT
				int sumQty = item.getWhDmgQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumQty <= 0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					if (!"0".equals(whconfItem.getPkgQty())
							&& !whconfItem.getPkgQty().equals(
									whconfItem.getDumpPkgQty())) {
						// whDPreName = whName + "(" + minName + "," + ++countD
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumQty > Integer.parseInt(autowhconfItem
								.getPkgQty())) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else if (sumQty == Integer.parseInt(autowhconfItem
								.getPkgQty())) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumQty = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumQty = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						}
						autowhconfItem.setWhTpCd("D");
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setWhDmgLocId(whDPreName);
			}
			if (flag.equals("G")) {
				item.setWhConfigurationItems(autoitemList);
			} else if (flag.equals("S")) {
				item.setSprItems(autoitemList);
			} else if (flag.equals("D")) {
				item.setWhDmgItems(autoitemList);
			}
		} else {// DBK
			WhConfigurationItem autowhconfItem = new WhConfigurationItem();

			if (item.getLoadMt() > 0 && flag.equals("G")) {
				double sumMT = item.getLoadMt();// Summary AMT
				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						// whGPreName = whName + "(" + minName + "," + ++countG
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						}
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setLocId(whGPreName);
			}
			if (item.getSprMt() > 0 && flag.equals("S")) {
				double sumMT = item.getSprMt();// Summary AMT
				double sumM3 = item.getSprM3();// Summary AMT
				int sumQty = item.getSprQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}
					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						// whSPreName = whName + "(" + minName + "," + ++countS
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						}
						autowhconfItem.setWhTpCd("S");
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setSprLocId(whSPreName);

			}
			if (item.getWhDmgMt() > 0 && flag.equals("D")) {
				double sumMT = item.getWhDmgMt();// Summary AMT
				double sumM3 = item.getWhDmgM3();// Summary AMT
				int sumQty = item.getWhDmgQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						// whDPreName = whName + "(" + minName + "," + ++countD
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						}
						autowhconfItem.setWhTpCd("D");
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setWhDmgLocId(whDPreName);
			}
			if (flag.equals("G")) {
				item.setWhConfigurationItems(autoitemList);
			} else if (flag.equals("S")) {
				item.setSprItems(autoitemList);
			} else if (flag.equals("D")) {
				item.setWhDmgItems(autoitemList);
			}
		}
	}

}