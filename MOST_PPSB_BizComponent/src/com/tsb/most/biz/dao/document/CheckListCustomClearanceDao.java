package com.tsb.most.biz.dao.document;
import com.tsb.most.biz.parm.document.SearchCheckListCustomClearanceParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CheckListCustomClearanceDao extends BaseDao implements ICheckListCustomClearanceDao {
    
    public DataItemList selectCustomCleranceForExport(SearchCheckListCustomClearanceParm parm) throws DaoException {
    	try{
    		parm.setTest1(parm.getCurPage() * parm.getPageSize() + 1);
            parm.setTest2((parm.getCurPage() + 1) * parm.getPageSize());
            return unifiedDao.getItems("checkListCustomClerance.selectCustomCleranceForExport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectCustomCleranceForImport(SearchCheckListCustomClearanceParm parm) throws DaoException {
    	try{
    		parm.setTest1(parm.getCurPage() * parm.getPageSize() + 1);
            parm.setTest2((parm.getCurPage() + 1) * parm.getPageSize());
            return unifiedDao.getItems("checkListCustomClerance.selectCustomCleranceForImport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectCustomerCleranceListsForTranshipment(SearchCheckListCustomClearanceParm parm) throws DaoException {
    	try{
    		parm.setTest1(parm.getCurPage() * parm.getPageSize() + 1);
            parm.setTest2((parm.getCurPage() + 1) * parm.getPageSize());
            
            return unifiedDao.getItems("checkListCustomClerance.selectCustomCleranceForImport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
