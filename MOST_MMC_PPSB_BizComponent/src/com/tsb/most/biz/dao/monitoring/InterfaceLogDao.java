/**
*
* CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF TOTAL SOFT BANK 
* LTD
*
* Copyright (C) 1988-2016 TOTAL SOFT BANK LTD. All Rights
* Reserved. Use of this source code is subject to the terms of 
* the applicable license agreement.
*
* The copyright notice(s) in this source code does not indicate 
* the actual or intended publication of this source code.
*
* Created on   : 2016. 7. 6.
* CVS revision : $Revision: 1.1 $ 
*
* ====================================
* CHANGE REVISION
* ====================================
* DATE           AUTHOR         REVISION
* 2016. 7. 6.   dh.ha    		First release.
* ====================================
* CLASS DESCRIPTION
* ====================================
*/

package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchInterfaceLogParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class InterfaceLogDao extends BaseDao implements IInterfaceLogDao {

	public DataItemList searchInterfaceLogItems(SearchInterfaceLogParm parm) throws DaoException {
		return unifiedDao.getItemsPage("interfaceLog.searchInterfaceLogItems", parm);
	}
	
	public DataItemList updateInterfaceLogAGItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "interfaceLog.updateInterfaceLogAGItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	public DataItemList updateInterfaceLogWBItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "interfaceLog.updateInterfaceLogWBItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	public DataItemList updateInterfaceLogHGItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "interfaceLog.updateInterfaceLogHGItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	public DataItemList updateInterfaceLogFASTItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "interfaceLog.updateInterfaceLogFASTItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
}
