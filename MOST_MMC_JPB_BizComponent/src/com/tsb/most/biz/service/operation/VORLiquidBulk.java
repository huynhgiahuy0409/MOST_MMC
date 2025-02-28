package com.tsb.most.biz.service.operation;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.operation.IVORLiquidBulkDao;
import com.tsb.most.biz.dataitem.operation.VORLiquidBulkItem;
import com.tsb.most.biz.parm.operation.SearchVORLiquidBulkParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VORLiquidBulk extends MOSTBaseService implements IVORLiquidBulk{
	private IVORLiquidBulkDao vorLiquidBulkDao;
	
	public void setVorLiquidBulkDao(IVORLiquidBulkDao vorLiquidBulkDao) {
		this.vorLiquidBulkDao = vorLiquidBulkDao;
	}

	///////////////////////////////////////////////////////////
	
	public DataItemList selectBerthAndOperationItems(SearchVORLiquidBulkParm parm) throws BizException {
		DataItemList list = vorLiquidBulkDao.selectBerthAndOperationItems(parm);
		return list;
	}
	
	public DataItemList selectVORSummaryItems(SearchVORLiquidBulkParm parm) throws BizException {
		DataItemList list = vorLiquidBulkDao.selectVORSummaryItems(parm);
		return list;
	}
	
	public DataItemList selectVORDelaySummaryItems(SearchVORLiquidBulkParm parm) throws BizException {
		DataItemList list = vorLiquidBulkDao.selectVORDelaySummaryItems(parm);
		return list;
	}
	
    public DataItemList selectVORLiquidBulkCgOprType(SearchVORLiquidBulkParm parm) throws BizException {
        return vorLiquidBulkDao.selectVORLiquidBulkCgOprType(parm);
    }
    
    public DataItemList selectConfirmationSlipDetailItem(SearchVORLiquidBulkParm parm) throws BizException {
        return vorLiquidBulkDao.selectConfirmationSlipDetailItem(parm);
    }
    
    public DataItemList selectVORLiquidBulkDetail(SearchVORLiquidBulkParm parm) throws BizException {
    	VORLiquidBulkItem returnItem = new VORLiquidBulkItem();
        DataItemList returnItems = new DataItemList();
        
    	ArrayList<VORLiquidBulkItem> resultCargo = (ArrayList<VORLiquidBulkItem>)vorLiquidBulkDao.selectVORLiquidCargo(parm).getCollection();
    	ArrayList<VORLiquidBulkItem> resultDelay = (ArrayList<VORLiquidBulkItem>)vorLiquidBulkDao.selectVORDelaySummaryItems(parm).getCollection();
    	returnItem.setCargoSummary(resultCargo);
    	returnItem.setDelaySummary(resultDelay);
        
    	parm.setSearchType("AMT_INFO");
    	ArrayList<VORLiquidBulkItem> resultBalCargo = (ArrayList<VORLiquidBulkItem>)vorLiquidBulkDao.selectVORLiquidCargo(parm).getCollection();
    	returnItem.setAmountCargoSummary(resultBalCargo);
    	
    	returnItems.add(returnItem);   
        return returnItems;
    }
    
    public DataItemList insertVORLiquidCargo(InsertItemsBizParm parm) throws BizException {
    	DataItemList returnItems = new DataItemList();
    	InsertItemsBizParm insertItems = new InsertItemsBizParm();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		
		UpdateItemsBizParm updateHoseLines = new UpdateItemsBizParm();
    	
    	VORLiquidBulkItem items = (VORLiquidBulkItem)parm.getInsertItems().get(0);
		VORLiquidBulkItem itemCol = (VORLiquidBulkItem) items;
		
		SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        
        try {
        	if(itemCol.getStDt() != null && !itemCol.getStDt().equals("")) {
        		Date workStdate = inputFormat.parse(itemCol.getStDt());
        		String strWorkStDt = outputFormat.format(workStdate);
                itemCol.setStDt(strWorkStDt);
        	}
        	if(itemCol.getEndDt() != null && !itemCol.getEndDt().equals("")) {
        		Date workEnddate = inputFormat.parse(itemCol.getEndDt());
        		String strWorkEndDt = outputFormat.format(workEnddate);
        		itemCol.setEndDt(strWorkEndDt);
        	}
        	if(itemCol.getHoseOffDt() != null && !itemCol.getHoseOffDt().equals("")) {
        		Date hoseOffdate = inputFormat.parse(itemCol.getHoseOffDt());
        		String strHoseOffDt = outputFormat.format(hoseOffdate);
        		itemCol.setHoseOffDt(strHoseOffDt);
        	}
        	if(itemCol.getHoseOnDt() != null && !itemCol.getHoseOnDt().equals("")) {
        		Date hoseOndate = inputFormat.parse(itemCol.getHoseOnDt());
        		String strHoseOnDt = outputFormat.format(hoseOndate);
        		itemCol.setHoseOnDt(strHoseOnDt);
        	}

        	if (itemCol.getJobTpCd().equals(CodeConstant.MT_JOBTP_DS) 
        			|| itemCol.getJobTpCd().equals(CodeConstant.MT_JOBTP_LD)) {
        		itemCol.setOpeTp("GEN");
        	} else if (itemCol.getJobTpCd().equals(CodeConstant.MT_JOBTP_SL)
        				|| itemCol.getJobTpCd().equals(CodeConstant.MT_JOBTP_SD)) {
        		itemCol.setOpeTp("STS");
        	} else if (itemCol.getJobTpCd().equals("TL")
        				|| itemCol.getJobTpCd().equals("TD")) {
        		itemCol.setOpeTp("TLS");
        	}
        } catch(Exception ex) {
        	ex.printStackTrace();
        	System.out.println(ex.getMessage());
        }
        
        if (itemCol.getWorkingStatus().equals(DAOProcessType.INSERT)) {
        	insertItems.addInsertItem(itemCol);
        	updateHoseLines.addUpdateItem(itemCol);
        } else if (itemCol.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
        	updateItems.addUpdateItem(itemCol);
        } else if (itemCol.getWorkingStatus().equals(DAOProcessType.DELETE)) {
        	deleteItems.addDeleteItem(itemCol);
		}
        
        if (insertItems.getInsertItems() != null && insertItems.getInsertItems().size() > 0) {
        	returnItems = vorLiquidBulkDao.insertVORLiquidCargoItems(insertItems);
        	vorLiquidBulkDao.updateVORLiquidHoseLines(updateHoseLines);
    			
    		// Update ATW, ATC
    		updateAtwAtc4LqVsl(insertItems.getInsertItems());
    	}
        
        if (updateItems.getUpdateItems() != null && updateItems.getUpdateItems().size() > 0) {
        	returnItems = vorLiquidBulkDao.updateVORLiquidCargoItems(updateItems);
    			
    		// Update ATW, ATC
    		updateAtwAtc4LqVsl(updateItems.getUpdateItems());
    	}
        
        if (deleteItems.getDeleteItems() != null && deleteItems.getDeleteItems().size() > 0) {
        	returnItems = vorLiquidBulkDao.deleteVORLiquidCargoItems(deleteItems);

    		// Update ATW, ATC
    		updateAtwAtc4LqVsl(deleteItems.getDeleteItems());
    	}
    	return returnItems;
    }
    
    public DataItemList insertVORLiquidDelay(InsertItemsBizParm parm) throws BizException {
    	DataItemList returnItems = new DataItemList();
    	InsertItemsBizParm insertItems = new InsertItemsBizParm();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		
		UpdateItemsBizParm updateHoseLines = new UpdateItemsBizParm();
    	
    	VORLiquidBulkItem items = (VORLiquidBulkItem)parm.getInsertItems().get(0);
    	VORLiquidBulkItem itemCol = (VORLiquidBulkItem) items;

    	SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
    	SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
    	try {
    		if(itemCol.getStartTime() != null && !itemCol.getStartTime().equals("")) {
    			Date workStdate = inputFormat.parse(itemCol.getStartTime());
    			String strWorkStDt = outputFormat.format(workStdate);
                itemCol.setStartTime(strWorkStDt);
    		}
    		if(itemCol.getEndTime() != null && !itemCol.getEndTime().equals("")) {
    			Date workEnddate = inputFormat.parse(itemCol.getEndTime());
    			String strWorkEndDt = outputFormat.format(workEnddate);
    			itemCol.setEndTime(strWorkEndDt);
    		}
    	} catch(Exception ex) {
    		ex.printStackTrace();
    		System.out.println(ex.getMessage());
    	}
    	
    	if (itemCol.getWorkingStatus().equals(DAOProcessType.INSERT)) {
    		insertItems.addInsertItem(itemCol);
    		updateHoseLines.addUpdateItem(itemCol);
    	} else if (itemCol.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
    		updateItems.addUpdateItem(itemCol);
    	} else if (itemCol.getWorkingStatus().equals(DAOProcessType.DELETE)) {
    		deleteItems.addDeleteItem(itemCol);
    	}

    	if (insertItems.getInsertItems() != null && insertItems.getInsertItems().size() > 0) {
    		returnItems = vorLiquidBulkDao.insertVORLiquidDelayItems(insertItems);
    	}

    	if (updateItems.getUpdateItems() != null && updateItems.getUpdateItems().size() > 0) {
    		returnItems = vorLiquidBulkDao.updateVORLiquidDelayItems(updateItems);
    	}

    	if (deleteItems.getDeleteItems() != null && deleteItems.getDeleteItems().size() > 0) {
    		returnItems = vorLiquidBulkDao.deleteVORLiquidDelayItems(deleteItems);
    	}
    	
    	return returnItems;
    }
    
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
    	DataItemList returnList = new DataItemList();
    	DataItemList delItems = parm.getDeleteItems();
    	DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
    	
    	VORLiquidBulkItem items = (VORLiquidBulkItem)delItems.get(0);
    	if(items.getVorLiquidBulk() != null && items.getVorLiquidBulk().size() > 0) {
    		ArrayList lst = items.getVorLiquidBulk();
    		for(int i = 0; i < lst.size(); i++) {
				VORLiquidBulkItem itemCol = (VORLiquidBulkItem) lst.get(i);
				if (itemCol.getWorkingStatus().equals(DAOProcessType.DELETE)) {
                	deleteItems.addDeleteItem(itemCol);
                }
    		}
    	}
    	
    	if (deleteItems.getDeleteItems() != null && deleteItems.getDeleteItems().size() > 0) {
    		returnList = vorLiquidBulkDao.deleteVORLiquidCargoItems(deleteItems);
        	
        	// Update ATW, ATC
    		updateAtwAtc4LqVsl(deleteItems.getDeleteItems());
        	returnList = vorLiquidBulkDao.deleteVORLiquidItems(deleteItems);
			
		}
    	
    	
    	return returnList;
    }

    public void updateAtwAtc4LqVsl(DataItemList returnList) throws BizException {
    	UpdateItemsBizParm parm = new UpdateItemsBizParm();
    	parm.setUpdateItems(returnList);
    	DataItemList resultList = vorLiquidBulkDao.updateAtwAtc4LqVsl(parm);
    }

	@Override
	public DataItemList selectTankerTimeItems(SearchVORLiquidBulkParm parm) throws BizException {
		return vorLiquidBulkDao.selectTankerTimeItems(parm);
	}
	//////////////////////////////////////////////////////////////////
}
