/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.plus.biz.dao.common.UserListDao.java
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
package com.tsb.most.basebiz.dao.vms;
import com.tsb.most.basebiz.parm.vms.SalesParm;
//import com.plus.base.dao.VmsBaseDao;
import com.tsb.most.framework.dao.BaseDao;
//import com.pcs.foundation.exception.DaoException;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public class SalesDao extends BaseDao implements ISalesDao {
	@Override
	public DataItemList selectSalesData(SalesParm parm) throws DaoException {
		return unifiedDao.getItems("Sales.selectSalesData", parm);
	}

	@Override
	public DataItemList selectBulkSalesPlanVsActualDataList(SalesParm parm) throws DaoException {
	    return unifiedDao.getItems("Sales.selectBulkSalesPlanVsActualDataList", parm);
	}
	
	@Override
	public DataItemList selectBulkSalesPlanVsPlanDataList(SalesParm parm) throws DaoException {
	    return unifiedDao.getItems("Sales.selectBulkSalesPlanVsPlanDataList", parm);
	}
	
	@Override
	public DataItemList selectBulkSalesActualDataList(SalesParm parm) throws DaoException {
	    return unifiedDao.getItems("Sales.selectBulkSalesActualDataList", parm);
	}
}
