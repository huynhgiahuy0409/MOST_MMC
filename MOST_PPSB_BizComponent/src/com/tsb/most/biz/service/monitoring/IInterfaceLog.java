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
* 2016. 10. 4.   Anna Kim    First release.
* ====================================
* CLASS DESCRIPTION
* ====================================
*/
package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchInterfaceLogParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IInterfaceLog {
	public DataItemList searchInterfaceLogItems(SearchInterfaceLogParm parm) throws BizException;
	public DataItemList updateInterfaceLogItems(UpdateItemsBizParm parm) throws BizException;
}
