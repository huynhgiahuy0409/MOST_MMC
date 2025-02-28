/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.plus.biz.service.common.IAuthentication.java
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

import com.tsb.most.basebiz.parm.vms.SalesParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ISales{
	public DataItemList selectSalesData(SalesParm parm) throws BizException;
	public DataItemList selectBulkSalesPlanVsActualDataList(SalesParm parm) throws BizException;
	public DataItemList selectBulkSalesPlanVsPlanDataList(SalesParm parm) throws BizException;
	public DataItemList selectBulkSalesActualDataList(SalesParm parm) throws BizException;
}