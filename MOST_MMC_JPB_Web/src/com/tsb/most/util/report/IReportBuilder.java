/**
*
* CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF TOTAL SOFT BANK 
* LTD
*
* Copyright (C) 1988-2008 TOTAL SOFT BANK LTD. All Rights
* Reserved. Use of this source code is subject to the terms of 
* the applicable license agreement.
*
* The copyright notice(s) in this source code does not indicate 
* the actual or intended publication of this source code.
*
* Created on   : 2009.03.26
* CVS revision : $Revision: 1.1 $ 
*
* ====================================
* CHANGE REVISION
* ====================================
* DATE           AUTHOR           REVISION
* 2009.03.26  Mr Tonny Kim 1.0    First release.
* ====================================
* CLASS DESCRIPTION
* ====================================
*/
package com.tsb.most.util.report;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperReport;

public interface IReportBuilder {
	public void setJrXml(String strJrXml) throws JRException;
	public void setJasperReport(JasperReport jsperReport) throws JRException;	
	public void setDatasource(ResultSet rs);
	public void setDatasource(List list);
	public void setParameter(Map map);
	public void export(String exportType,HttpServletRequest request, HttpServletResponse resp) throws JRException, IOException,ServletException;
	public String generatePDF() throws IOException;
	public void removePDFfile(InputStream in, File file) throws IOException;
}
