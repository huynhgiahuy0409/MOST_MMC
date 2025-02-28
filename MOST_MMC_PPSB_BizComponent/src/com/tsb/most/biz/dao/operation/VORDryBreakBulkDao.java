package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.dataitem.operation.VORDryBreakBulkItem;
import com.tsb.most.biz.dataitem.operation.VORListItem;
import com.tsb.most.biz.parm.operation.SearchVORDryBreakBulkParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.DaoException;

public class VORDryBreakBulkDao extends BaseDao implements IVORDryBreakBulkDao {
    
	public DataItemList selectVesselInfomation(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectVesselInfomation", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectVORList(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		DataItemList rtnList = unifiedDao.getItems("vorDryBreakBulk.selectVORList", parm);
            
            if(rtnList != null ){
                for (int i = 0; i < rtnList.size(); i++){
                    VORListItem item = (VORListItem) rtnList.get(i);
                    if(item.getImpWgt().startsWith(".")) {
                        item.setImpWgt("0" + item.getImpWgt());
                    }
                }
            }
            return rtnList;
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectHandlingList(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectHandlingList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public DataItemList selectShiftingList(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectShiftingList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectBankingList(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectBankingList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public DataItemList selectShiftedLocList(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectShiftedLocList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	///////////////////////////////////////////////////////
	
	public DataItemList selectDetailOfHandingRpt(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectDetailOfHandingRpt", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectDailyRosterRpt(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectDetailOfHandingRpt", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectDRStevedoreList(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectDRStevedoreList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectDRTrimmingList(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectDRTrimmingList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectEquipmentsRptFAC(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		DataItemList rtnList = new DataItemList();        
            // 1. bulk
    		DataItemList eqListBBK = unifiedDao.getItems("vorDryBreakBulk.selectEquipmentsRptBulk", parm);
            rtnList.add(eqListBBK.getCollection());   

            // 2. break bulk
            DataItemList bbList = unifiedDao.getItems("vorDryBreakBulk.selectEquipmentsRptBreakBulk", parm);
            rtnList.add(bbList.getCollection());

            // 3. facility
            DataItemList fcList = unifiedDao.getItems("vorDryBreakBulk.selectEquipmentsRptFacility", parm);
            rtnList.add(fcList.getCollection());   
            
            // 4. delv mode
            rtnList.add((VORDryBreakBulkItem)unifiedDao.readOne("vorDryBreakBulk.selectDelvMode", parm));   

            return rtnList;
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectHandlingSum(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectHandlingSum", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectHoliday(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectHoliday", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public IDataItem selectComp(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return (VORDryBreakBulkItem)unifiedDao.readOne("vorDryBreakBulk.selectComp", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectRemark(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectRemark", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList isOverlappedWithFinitePeriodHHT(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.isOverlappedWithFinitePeriodHHT", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList updateListVORItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null,"vorDryBreakBulk.updateListVORItems",updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	public DataItemList updateListVORVerifyItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null,"vorDryBreakBulk.updateListVORVerifyItems",updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	public DataItemList selectHandlingServicePDFReportList(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectHandlingServicePDFReportList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectOpeJobList(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectOpeJobList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectROROCForm1ReprotList(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectROROCForm1ReprotList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectROROCForm2ReprotList(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectROROCForm2ReprotList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectPortDepartureReport(SearchVORDryBreakBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorDryBreakBulk.selectPortDepartureReport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
