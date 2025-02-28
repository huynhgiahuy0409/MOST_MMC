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
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IInterfaceLogDao {
	
	public DataItemList searchInterfaceLogItems(SearchInterfaceLogParm parm)throws DaoException;
	public DataItemList updateInterfaceLogAGItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateInterfaceLogWBItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateInterfaceLogHGItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateInterfaceLogFASTItems(UpdateItemsBizParm parm) throws DaoException;
}
