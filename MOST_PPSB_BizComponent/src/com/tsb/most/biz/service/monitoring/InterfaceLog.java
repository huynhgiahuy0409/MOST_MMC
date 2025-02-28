/**
*
* CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF TOTAL SOFT BANK 
* LTD
*
* Copyright (C) 1988-2010 TOTAL SOFT BANK LTD. All Rights
* Reserved. Use of this source code is subject to the terms of 
* the applicable license agreement.
*
* The copyright notice(s) in this source code does not indicate 
* the actual or intended publication of this source code.
*
* Created on   : 2011. 1. 24.
* CVS revision : $Revision: 1.1 $ 
*
* ====================================
* CHANGE REVISION
* ====================================
* DATE           AUTHOR           REVISION
* ====================================
* CLASS DESCRIPTION
* ====================================
*/
package com.tsb.most.biz.service.monitoring;

import java.util.ArrayList;

import com.tsb.most.biz.dao.monitoring.IInterfaceLogDao;
import com.tsb.most.biz.dataitem.monitoring.InterfaceLogItem;
import com.tsb.most.biz.parm.monitoring.SearchInterfaceLogParm;
import com.tsb.most.framework.bizcomponemt.base.BaseBizComponent;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class InterfaceLog extends BaseBizComponent implements IInterfaceLog {
	
	private IInterfaceLogDao interfaceLogDao;
		
	public void setInterfaceLogDao(IInterfaceLogDao interfaceLogDao) {
		this.interfaceLogDao = interfaceLogDao;
	}

	public DataItemList searchInterfaceLogItems(SearchInterfaceLogParm parm) throws BizException {
		DataItemList items = interfaceLogDao.searchInterfaceLogItems(parm); 
		return items;
	}
	
	public DataItemList updateInterfaceLogItems(UpdateItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getUpdateItems();
		UpdateItemsBizParm updateAGItems = new UpdateItemsBizParm();
		UpdateItemsBizParm updateWBItems = new UpdateItemsBizParm();
		UpdateItemsBizParm updateFASTItems = new UpdateItemsBizParm();
		UpdateItemsBizParm updateHGItems = new UpdateItemsBizParm();
		
		for(InterfaceLogItem item: (ArrayList<InterfaceLogItem>)itemList.getCollection()) {
			if(item == null) {
				return null;
			}
			
			if(item.getMsgId() != null && item.getMsgId() != "") {
				if(item.getMsgId().substring(0, 2).equals("MA")) {
					//autogate
					updateAGItems.addUpdateItem(item);
				} else if(item.getMsgId().substring(0, 2).equals("MW")) {
					//weighbridge
					updateWBItems.addUpdateItem(item);
				} else if(item.getMsgId().substring(0, 3).equals("MHG")) {
					//hanging scale
					updateHGItems.addUpdateItem(item);
				} else if(item.getMsgId().substring(0, 2).equals("MF")) {
					//fast
					updateFASTItems.addUpdateItem(item);
				}
			}
		}
		
		if(updateAGItems.getUpdateItems() != null) {
			interfaceLogDao.updateInterfaceLogAGItems(updateAGItems);
		}
		
		if(updateWBItems.getUpdateItems() != null) {
			interfaceLogDao.updateInterfaceLogWBItems(updateWBItems);
		}
		
		if(updateHGItems.getUpdateItems() != null) {
			interfaceLogDao.updateInterfaceLogHGItems(updateHGItems);
		}
		
		if(updateFASTItems.getUpdateItems() != null) {
			interfaceLogDao.updateInterfaceLogFASTItems(updateFASTItems);
		}
		
        return itemList;
    }
}