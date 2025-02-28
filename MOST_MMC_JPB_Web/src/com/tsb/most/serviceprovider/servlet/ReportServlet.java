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
 * Created on   : 2014.01.16
 * CVS revision : $Revision: 1.1 $ 
 *
 * ====================================
 * CHANGE REVISION
 * ====================================
 * DATE           AUTHOR           REVISION
 * 2014.01.16  Anna Kim 1.0    First release.
 * ====================================
 * CLASS DESCRIPTION
 * ====================================
 */
package com.tsb.most.serviceprovider.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import com.tsb.most.biz.dataitem.report.ReportItem;
import com.tsb.most.biz.parm.report.SearchReportParm;
import com.tsb.most.common.util.ReportType;
import com.tsb.most.framework.bizparm.BizParmMetaInfo;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;
import com.tsb.most.util.report.IReportBuilder;
import com.tsb.most.util.report.ReportBuilder;

import net.sf.jasperreports.engine.JasperReport;

/**
 * Servlet implementation class for Servlet: ServiceProviderServlet
 * 
 */
public class ReportServlet extends javax.servlet.http.HttpServlet implements
		javax.servlet.Servlet {

	protected PrintWriter out = null;
	protected String printType = null; // PRINT, EXCEL, PDF, TXT, PREVIEW

	/*
	 * (non-Java-doc)
	 * 
	 * @see javax.servlet.http.HttpServlet#HttpServlet()
	 */
	public ReportServlet() {

		super();
	}

	/*
	 * (non-Java-doc)
	 * 
	 * @see javax.servlet.http.HttpServlet#doGet(HttpServletRequest request,
	 * HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		//MMC
		doPost(request, response);
	}

	/*
	 * (non-Java-doc)
	 * 
	 * @see javax.servlet.http.HttpServlet#doPost(HttpServletRequest request,
	 * HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		try {
			
			System.out.println("call servlet");
			
			/*
			 * if (printType == null || printType.equals(CommonConstants.BLANK)) { printType
			 * = ReportType.SAVE_PDF; }
			 */
			String printTpParm = request.getParameter("printType");
			if("PDF".equals(printTpParm)) {
				printType = ReportType.SAVE_PDF;
			}
			else if("EXCEL".equals(printTpParm)) {
				printType = ReportType.EXCEL;
			}
			else {
				printType = ReportType.SAVE_PDF;
			}
			/*
			 * By Anna 20090826 object stream In case of opera brwoser,
			 * user-defined header value of request is null use objectstream
			 * instead of header
			 */
			
			SearchReportParm bizParm = new SearchReportParm();
			bizParm.setServiceId(request.getParameter("serviceId"));
			bizParm.setFile(request.getParameter("file"));
			bizParm.setBranchCode(request.getParameter("branchCode"));
			
			BizParmMetaInfo metaInfo = new BizParmMetaInfo();
			metaInfo.setServiceID(request.getParameter("serviceId"));
			
			bizParm.setBizParmMetaInfo(metaInfo);
			bizParm.setParam1(request.getParameter("param1"));
			bizParm.setParam2(request.getParameter("param2"));
			bizParm.setParam3(request.getParameter("param3"));
			bizParm.setParam4(request.getParameter("param4"));
			bizParm.setParam5(request.getParameter("param5"));
			bizParm.setParam6(request.getParameter("param6"));
			bizParm.setParam7(request.getParameter("param7"));
			bizParm.setParam8(request.getParameter("param8"));
			bizParm.setParam9(request.getParameter("param9"));
			bizParm.setParam10(request.getParameter("param10"));
			
			String serviceId = request.getParameter("serviceId");

			DataItemList result = null;
			Map<String, Object> parameterMap = null;
			ReportItem resultItem  = null;
			
			if (serviceId != null) {
				// invoke service through ServiceProviderPojo object or
				// ServiceProviderEjb
				ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
				resultItem = (ReportItem) serviceProviderPojo.execute(bizParm,this.getServletContext());
				parameterMap = resultItem.getParameterMap();
				
				if(parameterMap == null)
					parameterMap = new HashMap<String, Object>();
				
				result = resultItem.getDataItemList();
			}

			reportSetBuilder(request, response, result.getCollection(), resultItem.getMainReport(),
					parameterMap);
			//request.getRequestDispatcher("/reportBuilder/PDFPreview.jsp").forward(request, response);
		} catch (Exception ex) {
			ex.printStackTrace();
		}

	}

	protected String getBizParmType(String xml) {
		String bizTypeName = null;

		try {

			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder docBuilder = dbf.newDocumentBuilder();

			Document doc = docBuilder.parse(new InputSource(new StringReader(
					xml)));
			// Element root=doc.getDocumentElement();

			bizTypeName = doc.getDocumentElement().getNodeName();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return bizTypeName;
	}

	/** Jasper Report Library�� �����Ͽ� Report Viewer�� �����Ѵ�. */
	protected void reportSetBuilder(HttpServletRequest request, HttpServletResponse response, List list,JasperReport jasperReport, Map parameters) throws Exception {

		IReportBuilder builder = new ReportBuilder();
		builder.setDatasource(list);
		
		builder.setJasperReport(jasperReport);

		if (parameters != null) {
			builder.setParameter(parameters);
		}

		if (printType.equals(ReportType.PRINT)) {
			builder.export(ReportType.PRINT,request,response);
		} else if (printType.equals(ReportType.PDF)) {
			builder.export(ReportType.GET_PDF,request,response);
		} else if (printType.equals(ReportType.SAVE_PDF)) {
			builder.export(ReportType.SAVE_PDF,request,response);
		} else if (printType.equals(ReportType.EXCEL)) {
			builder.export(ReportType.GET_EXCEL,request,response);
		} else if (printType.equals(ReportType.TXT)) {
			builder.export(ReportType.GET_TXT,request,response);
		} else {
			builder.export(ReportType.PREVIEW,request,response);
		}
	}

}