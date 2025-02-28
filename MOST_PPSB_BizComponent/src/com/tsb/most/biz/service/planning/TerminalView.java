package com.tsb.most.biz.service.planning;

import com.tsb.most.basebiz.dao.codes.ICommodityCodeDao;
import com.tsb.most.basebiz.dao.combobox.IComboboxServiceDao;
import com.tsb.most.basebiz.dao.configuration.IWarehouseDefinitionDao;
import com.tsb.most.basebiz.parm.combobox.SearchComboBoxServiceParm;
import com.tsb.most.basebiz.parm.configuration.SearchWarehouseDefinitionParm;
import com.tsb.most.biz.dao.planning.ITerminalViewDao;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TerminalView extends MOSTBaseService implements ITerminalView {
	private ITerminalViewDao terminalViewDao;
	private ICommodityCodeDao commodityCodeDao;
	private IComboboxServiceDao comboboxServiceDao;
	private IWarehouseDefinitionDao warehouseDefinitionDao;
	
	public void setWarehouseDefinitionDao(IWarehouseDefinitionDao warehouseDefinitionDao) {
		this.warehouseDefinitionDao = warehouseDefinitionDao;
	}	
	
	public void setComboboxServiceDao(IComboboxServiceDao comboboxServiceDao) {
		this.comboboxServiceDao = comboboxServiceDao;
	}
	
	public void setTerminalViewDao(ITerminalViewDao terminalViewDao) {
		this.terminalViewDao = terminalViewDao;
	}
	
	public void setCommodityCodeDao(ICommodityCodeDao commodityCodeDao) {
		this.commodityCodeDao = commodityCodeDao;
	}

	public DataItemList selectBerthInfo(SearchBerthPlanParm parm) throws BizException{
        return terminalViewDao.selectBerthInfo(parm);
	}
	
	public DataItemList selectWhConfiguration(SearchWarehouseDefinitionParm parm) throws BizException {
    	return warehouseDefinitionDao.selectWhConfiguration(parm);
    }
	 
	public DataItemList selectAreaInfoList(SearchWarehouseDefinitionParm parm) throws BizException {
    	return terminalViewDao.selectAreaInfoList(parm);
    }
	
	public DataItemList selectMasterBlList(SearchBLParm parm) throws BizException {
    	return terminalViewDao.selectMasterBlList(parm);
    }
	
	public DataItemList selectSubBlList(SearchBLParm parm) throws BizException {
    	return terminalViewDao.selectSubBlList(parm);
    }
	
	public DataItemList selectBookingNoList(SearchShippingNoteParm parm) throws BizException {
    	return terminalViewDao.selectBookingNoList(parm);
    }
	
	public DataItemList selectShippingNoteList(SearchShippingNoteParm parm) throws BizException {
    	return terminalViewDao.selectShippingNoteList(parm);
    }
	
	public DataItemList selectCommodityGroupCodeCombo(SearchComboBoxServiceParm parm) throws BizException {
    	return comboboxServiceDao.selectComboBoxCommodityCode(parm);
	}

}