package com.tsb.most.biz.dao.planning;

import com.tsb.most.basebiz.parm.codes.SearchCommodityCodeParm;
import com.tsb.most.basebiz.parm.configuration.SearchWarehouseDefinitionParm;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class TerminalViewDao extends BaseDao implements ITerminalViewDao {

	public DataItemList selectBerthInfo(SearchBerthPlanParm parm) throws DaoException {
        return unifiedDao.getItems("berthPlan.selectBerthInfoList", parm);
    }
	
	public DataItemList selectMasterBlList(SearchBLParm parm) throws DaoException {
        return unifiedDao.getItems("terminalView.selectMasterBlList", parm);
    }
	
	public DataItemList selectSubBlList(SearchBLParm parm) throws DaoException {
        return unifiedDao.getItems("terminalView.selectSubBlList", parm);
    }
	
	public DataItemList selectBookingNoList(SearchShippingNoteParm parm) throws DaoException {
        return unifiedDao.getItems("terminalView.selectBookingNoList", parm);
    }
	
	public DataItemList selectShippingNoteList(SearchShippingNoteParm parm) throws DaoException {
        return unifiedDao.getItems("terminalView.selectShippingNoteList", parm);
    }
	
	public DataItemList selectCommodityGroupCodeCombo(SearchCommodityCodeParm parm) throws DaoException {
    	return unifiedDao.getItems("commodityCode.selectCommodityGroupCode", parm);
    }
	
	public DataItemList selectWhConfiguration(SearchWarehouseDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("warehouseDefinition.selectWhConfiguration", parm);
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
}
