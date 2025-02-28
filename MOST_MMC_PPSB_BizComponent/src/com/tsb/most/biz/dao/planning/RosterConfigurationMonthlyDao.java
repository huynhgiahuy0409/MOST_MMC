package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.RosterConfigurationMonthlyItem;
import com.tsb.most.biz.parm.planning.SearchRosterConfigurationMonthlyParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.data.util.DateUtil;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class RosterConfigurationMonthlyDao extends BaseDao implements  IRosterConfigurationMonthlyDao {

    private static final String WEEK_FORMAT_DATE = "dd/MM(EEE)";
 
    public DataItemList selectRosterSetupWHList(SearchRosterConfigurationMonthlyParm parm) throws DaoException {
        return unifiedDao.getItems("rosterConfigurationMonthly.selectRosterSetupWHList", parm);
    }
    
    public DataItemList getRosterMonthlySetupList(SearchRosterConfigurationMonthlyParm parm) throws DaoException {
    	return unifiedDao.getItems("rosterConfigurationMonthly.selectMonthlyRosterSetup", parm);
    }
    
    public DataItemList selectShiftVesselOperation(SearchRosterConfigurationMonthlyParm parm) throws DaoException {
    	return unifiedDao.getItems("rosterConfigurationMonthly.selectShiftVesselOperation", parm);
    }
    
    public DataItemList selectRosterMonthlyData(SearchRosterConfigurationMonthlyParm parm) throws DaoException {
    	return unifiedDao.getItems("rosterConfigurationMonthly.selectRosterMonthlyData", parm);
    }
    
   	public DataItemList getRosterSetupList(SearchRosterConfigurationMonthlyParm parm) throws DaoException {
   		DataItemList rtnList = new DataItemList();
        String strStartDate = parm.getRstrYmd();
        
        for(int i=0; i<4; i++){
        	DataItemList deliLists = null;
            RosterConfigurationMonthlyItem item = new RosterConfigurationMonthlyItem();
            
            item.setTabSeq(i+1);

            parm.setRstrYmd(DateUtil.getIncDateOrder(strStartDate, i*7));
            item.setDate1(DateUtil.getIncDateOrder(parm.getRstrYmd(), 0, WEEK_FORMAT_DATE));
            item.setDate2(DateUtil.getIncDateOrder(parm.getRstrYmd(), 1, WEEK_FORMAT_DATE));
            item.setDate3(DateUtil.getIncDateOrder(parm.getRstrYmd(), 2, WEEK_FORMAT_DATE));
            item.setDate4(DateUtil.getIncDateOrder(parm.getRstrYmd(), 3, WEEK_FORMAT_DATE));
            item.setDate5(DateUtil.getIncDateOrder(parm.getRstrYmd(), 4, WEEK_FORMAT_DATE));
            item.setDate6(DateUtil.getIncDateOrder(parm.getRstrYmd(), 5, WEEK_FORMAT_DATE));
            item.setDate7(DateUtil.getIncDateOrder(parm.getRstrYmd(), 6, WEEK_FORMAT_DATE));

            deliLists = unifiedDao.getItems("rosterConfigurationMonthly.selectRosterSetup", parm);
            
            rtnList.add(deliLists);
        }
        return rtnList;
    }
    
    public DataItemList getDayoffSetupList(SearchRosterConfigurationMonthlyParm parm) throws DaoException {
    	DataItemList rtnList = new DataItemList();
        String strStartDate = parm.getDoffYmd();
        
        for(int i=0; i<4; i++){
        	DataItemList deliLists = null;
            RosterConfigurationMonthlyItem item = new RosterConfigurationMonthlyItem();
            
            item.setTabSeq(i+1);

            parm.setDoffYmd(DateUtil.getIncDateOrder(strStartDate, i*7));
            item.setDate1(DateUtil.getIncDateOrder(parm.getDoffYmd(), 0, WEEK_FORMAT_DATE));
            item.setDate2(DateUtil.getIncDateOrder(parm.getDoffYmd(), 1, WEEK_FORMAT_DATE));
            item.setDate3(DateUtil.getIncDateOrder(parm.getDoffYmd(), 2, WEEK_FORMAT_DATE));
            item.setDate4(DateUtil.getIncDateOrder(parm.getDoffYmd(), 3, WEEK_FORMAT_DATE));
            item.setDate5(DateUtil.getIncDateOrder(parm.getDoffYmd(), 4, WEEK_FORMAT_DATE));
            item.setDate6(DateUtil.getIncDateOrder(parm.getDoffYmd(), 5, WEEK_FORMAT_DATE));
            item.setDate7(DateUtil.getIncDateOrder(parm.getDoffYmd(), 6, WEEK_FORMAT_DATE));

            deliLists = unifiedDao.getItems("rosterConfigurationMonthly.selectDayoffSetup", parm);
            
            rtnList.add(deliLists);
        }
        return rtnList;
    }
    
    public DataItemList getRosterSetupShiftList(SearchRosterConfigurationMonthlyParm parm) throws DaoException {
	    return unifiedDao.getItems("rosterConfigurationMonthly.selectRosterSetupShift", parm);
    }
    
    public void insertRosterSetupItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
	    unifiedDao.insertItems(txTraceInfo,"rosterConfigurationMonthly.insertRosterSetupItems", items);
	    unifiedDao.insertItems(txTraceInfo,"rosterConfigurationMonthly.insertRosterSetupItems4HRMS", items);
    }
    
    public DataItemList insertRosterSetupWHItems(InsertItemsBizParm parm) throws DaoException {
	    try{
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "rosterConfigurationMonthly.insertRosterSetupWHItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void updateRosterSetupItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
        unifiedDao.updateItems(txTraceInfo,"rosterConfigurationMonthly.updateRosterSetupItems", items);
    }
    
    public void deleteRosterSetupItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
	    unifiedDao.deleteItems(txTraceInfo,"rosterConfigurationMonthly.deleteRosterSetupItems", items);
	    unifiedDao.deleteItems(txTraceInfo,"rosterConfigurationMonthly.deleteRosterSetupItems4HRMS", items);
    }

    public void deleteRosterSetupWHItems(DeleteItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.deleteItems(null,"rosterConfigurationMonthly.deleteRosterSetupWHItems", itemList);
			setVersion(itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void deleteDayoffSetupWHItems(DeleteItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.deleteItems(null,"rosterConfigurationMonthly.deleteDayoffSetupWHItems", itemList);
			setVersion(itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

    @Override
    public DataItemList getIsNotSameRosterType(SearchRosterConfigurationMonthlyParm parm) throws DaoException {
        return unifiedDao.getItems("rosterConfigurationMonthly.selectIsDifferentRosterType", parm);
    }

    public DataItemList getRosterSetupReportList(SearchRosterConfigurationMonthlyParm parm) throws DaoException {
        return unifiedDao.getItems("rosterConfigurationMonthly.selectRosterSetupReport", parm);
    }
    
    public DataItemList selectShiftDef(SearchRosterConfigurationMonthlyParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("rosterConfigurationMonthly.selectShiftDef", parm);
    	}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectGroupDef(SearchRosterConfigurationMonthlyParm parm) throws DaoException {
    	try {
        	return unifiedDao.getItems("rosterConfigurationMonthly.selectGroupDef", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertRosterSetupMonthyItems(InsertItemsBizParm parm) throws DaoException {
	    try{
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "rosterConfigurationMonthly.insertRosterSetupMonthlyItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void deleteRosterSetupMonthlyItem(DeleteItemsBizParm parm) throws DaoException {
	    try{
			DataItemList itemList = parm.getDeleteItems();
			unifiedDao.deleteItems(null, "rosterConfigurationMonthly.deleteRosterSetupSHFTItem", itemList);
			unifiedDao.deleteItems(null, "rosterConfigurationMonthly.deleteRosterSetupDOSHFTItem", itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
