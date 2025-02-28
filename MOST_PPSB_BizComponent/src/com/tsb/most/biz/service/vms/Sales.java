/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.plus.biz.service.common.Authentication.java
* CREATE ON : 2017. 05. 31.
* CLASS DESCRIPTION :
*
* 
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION    
* --------------------------------------------------------------------------
* 2017. 05. 31.  LUIS			             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.biz.service.vms;

import com.tsb.most.basebiz.dao.vms.ISalesDao;
import com.tsb.most.basebiz.parm.vms.SalesParm;
//import com.plus.base.service.VmsBaseService;
//import com.plus.foundation.common.RestResponse;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class Sales extends MOSTBaseService implements ISales {
	private ISalesDao salesDao;
	
	public ISalesDao getSalesDao() {
		return salesDao;
	}

	public void setSalesDao(ISalesDao salesDao) {
		this.salesDao = salesDao;
	}

	@Override
	public DataItemList selectSalesData(SalesParm parm)throws BizException{
		return salesDao.selectSalesData(parm);
	}

	@Override
	public DataItemList selectBulkSalesPlanVsActualDataList(SalesParm parm)throws BizException{
		return salesDao.selectBulkSalesPlanVsActualDataList(parm);
	}
	
	@Override
	public DataItemList selectBulkSalesPlanVsPlanDataList(SalesParm parm)throws BizException{
		return salesDao.selectBulkSalesPlanVsPlanDataList(parm);
	}
	
	@Override
	public DataItemList selectBulkSalesActualDataList(SalesParm parm)throws BizException{
		return salesDao.selectBulkSalesActualDataList(parm);
	}
	
}
