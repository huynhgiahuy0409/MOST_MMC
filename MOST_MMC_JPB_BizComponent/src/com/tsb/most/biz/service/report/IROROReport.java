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
* Created on   : 2013. 4. 22.
* CVS revision : $Revision: 1.1 $ 
*
* ====================================
* CHANGE REVISION
* ====================================
* DATE           AUTHOR           REVISION
* 2014. 1. 20.   Anna 1.0    First release.
* ====================================
* CLASS DESCRIPTION
* Export Report  
* ====================================
*/

package com.tsb.most.biz.service.report;


import com.tsb.most.biz.dataitem.report.ReportItem;
import com.tsb.most.biz.parm.report.SearchReportParm;
import com.tsb.most.framework.exception.BizException;


public interface IROROReport {
	public ReportItem getROROVinByShiftReportItems(SearchReportParm parm) throws BizException;
	public ReportItem getRoRoDamageVinByShiftReportItems(SearchReportParm parm) throws BizException;
	public ReportItem getInventoryPerVinAndShiftReportItems(SearchReportParm parm) throws BizException;
}