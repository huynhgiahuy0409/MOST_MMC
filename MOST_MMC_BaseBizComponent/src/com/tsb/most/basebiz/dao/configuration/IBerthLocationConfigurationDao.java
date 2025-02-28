/**
* FILE NAME : IBerthWharfLocCodeDao.java 
* PACKAGE NAME : com.pcs.integ.dao.code
* Created on   : 2015. 6. 16
*
* ------------------------------------------------------------
* CHANGE REVISION
* ------------------------------------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2015. 6. 16     LUIS             First release.
* ------------------------------------------------------------
* CLASS DESCRIPTION
* ------------------------------------------------------------
* 
* 
* ------------------------------------------------------------
* COPYRIGHT (PLUS) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*/
package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchBerthLocationConfigurationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IBerthLocationConfigurationDao {
	public DataItemList selectBerthWharfList(SearchBerthLocationConfigurationParm parm) throws DaoException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
}