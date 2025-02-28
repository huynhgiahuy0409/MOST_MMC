/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.plus.biz.dao.common.IUserListDao.java
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
import com.tsb.most.framework.dataitem.DataItemList;
//import com.pcs.foundation.exception.DaoException;
import com.tsb.most.framework.exception.DaoException;

public interface ISalesDao {
	public DataItemList selectSalesData(SalesParm parm) throws DaoException;
	public DataItemList selectBulkSalesPlanVsActualDataList(SalesParm parm) throws DaoException;
	public DataItemList selectBulkSalesPlanVsPlanDataList(SalesParm parm) throws DaoException;
	public DataItemList selectBulkSalesActualDataList(SalesParm parm) throws DaoException;
}
