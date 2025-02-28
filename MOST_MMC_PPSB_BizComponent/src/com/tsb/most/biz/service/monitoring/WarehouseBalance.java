package com.tsb.most.biz.service.monitoring;


import com.tsb.most.biz.dao.monitoring.IWarehouseBalanceDao;
import com.tsb.most.biz.parm.monitoring.SearchWarehouseBalanceParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class WarehouseBalance extends MOSTBaseService implements IWarehouseBalance {
	private IWarehouseBalanceDao warehouseBalanceDao;

	public void setWarehouseBalanceDao(IWarehouseBalanceDao warehouseBalanceDao) {
		this.warehouseBalanceDao = warehouseBalanceDao;
	}

	///////////////////////////////////////////////
	public DataItemList selectWarehouseBalanceItems(SearchWarehouseBalanceParm parm) throws BizException {
        return warehouseBalanceDao.selectWarehouseBalanceItems(parm);
    }
	
}