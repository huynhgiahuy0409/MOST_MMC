package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchWarehouseDefinitionParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class WarehouseDefinitionDao extends BaseDao implements IWarehouseDefinitionDao {

    public DataItemList selectWarehouseDefinitionList(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("warehouseDefinition.selectWarehouseDefinitionList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectBerthWarfLoc(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectBerthWarfLoc", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectAreaInfoList(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectAreaInfoList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectChkDupliLocId(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectChkDupliLocId", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectChkDataAtCellBayRow(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectChkDataAtCellBayRow", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectUnusedLocId(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectUnusedLocId", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectRentalList(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectRentalList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }

    public DataItemList selectWHViewReport(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectWHViewReport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }

    public DataItemList selectCargoDetailReport(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectCargoDetailReport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }

    public DataItemList selectSpcPlanList(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectSpcPlanList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectWhCargoInfos(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectWhCargoInfos", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectSelectedWhArea(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectSelectedWhArea", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectSulphurConfigurationList(SearchWarehouseDefinitionParm parm) throws DaoException {
		try{
			return unifiedDao.getItemsPage("warehouseDefinition.selectSulphurConfigurationList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateSulphurItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"warehouseDefinition.updateSulphurItems", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public DataItemList checkBayRowDesign(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectChkBayRow", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectInvLocCargos(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectInvLocCargos", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public void updateUnusedInitiate(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(txTraceInfo,"warehouseDefinition.updateUnusedInitiate", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void updateUnusedCells(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"warehouseDefinition.updateUnusedCells", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertwarehouseDefinitionItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null,"warehouseDefinition.insertwarehouseDefinitionItems", insertItems);
			setVersion(insertItems);
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList updatewarehouseDefinitionItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"warehouseDefinition.updatewarehouseDefinitionItems", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void deletewarehouseDefinitionItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null,"warehouseDefinition.deletewarehouseDefinitionItems", deleteItems);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

    public void deleteWhRowBayCellItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.deleteItems(txTraceInfo,"warehouseDefinition.deleteWhRowBayCellItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectOverlap(SearchWarehouseDefinitionParm parm) throws DaoException {
        /***********************prevent error*********************/
        if ("".equalsIgnoreCase(parm.getTopWh())) parm.setTopWh("0") ;
        if ("".equalsIgnoreCase(parm.getLeftWh())) parm.setLeftWh("0") ;
        if ("".equalsIgnoreCase(parm.getWidthWh())) parm.setWidthWh("0") ;
        if ("".equalsIgnoreCase(parm.getLenghtWh())) parm.setLenghtWh("0") ;
        /**************************************************************/
        
        try{
        	return unifiedDao.getItems("warehouseDefinition.selectOverlap", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

    public DataItemList selectInvLocs(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectDmgInvLocs(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectDmgInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectSprInvLocs(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectSprInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectSpareDirect(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectSpareDirect", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }

    public DataItemList selectRhdlInvLocs(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectRhdlInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectHOInvLocs(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseDefinition.selectHOInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectWhConfiguration(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("warehouseDefinition.selectWhConfiguration", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
