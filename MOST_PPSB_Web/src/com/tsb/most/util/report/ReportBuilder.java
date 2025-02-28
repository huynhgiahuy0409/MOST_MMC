/**
*
\* CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF TOTAL SOFT BANK 
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
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tsb.most.common.util.ReportType;
import com.tsb.most.framework.config.AppContextPropertyLoader;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JRResultSetDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JExcelApiExporter;
import net.sf.jasperreports.engine.export.JRTextExporter;
import net.sf.jasperreports.engine.export.JRTextExporterParameter;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;

public class ReportBuilder implements IReportBuilder{
	private JasperReport report;
	private JRDataSource dataSource;
	private Map map;
	private JasperPrint print;
	
	public ReportBuilder(){}
	
	public void setJrXml(String strJrXml) throws JRException{
		report = JasperCompileManager.compileReport(strJrXml);
//		JasperCompileManager.compileReportToFile(strJrXml);
	}
	public void setJasperReport(JasperReport jasperReport) throws JRException{
		report = jasperReport;
//		JasperCompileManager.compileReportToFile(strJrXml);
	}
	public void setDatasource(ResultSet rs){
		this.dataSource = new JRResultSetDataSource(rs);
	}
	
	public void setDatasource(List list){
	    this.dataSource = new JRBeanCollectionDataSource(list);
	}
	
	public void setParameter(Map map){
		this.map = map;
	}
	
	//added by Brian (2020/05/28)
	public void removePDFfile(InputStream in, File file) throws IOException{
		try {
			in.close();
			Thread.sleep(3000);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		file.delete();
	}
	
	//added by Brian (2020/05/28)
	public String generatePDF() throws IOException{
		String fileName = "";
		String exportPath = "";
		try{
			if(report == null && dataSource == null){
		        throw new JRException("Null");
		    }
		    
		    //if(ReportType.GET_PDF!= exportType){
		     print = JasperFillManager.fillReport(report, map, dataSource);
		    //}
		    
		    exportPath = getReportFilePath() + File.separator;
			fileName = print.getName()+System.currentTimeMillis()+ReportType.PDF;
			

			JasperExportManager.exportReportToPdfFile(print, exportPath+fileName);
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return exportPath+fileName;
	}
	
	private void print(HttpServletResponse response) throws JRException, IOException, ServletException{
	    if (print != null)
		{
			response.setContentType("application/octet-stream"); 		// application/x-java-serialized-object
			ServletOutputStream ouputStream = response.getOutputStream();
			
			ObjectOutputStream oos = new ObjectOutputStream(ouputStream);
			oos.writeObject(print);
			oos.flush();
			oos.close();
		
			ouputStream.flush();
			ouputStream.close();
		}else{
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			out.println("<html>");
			out.println("<head>");
			out.println("<title>Report Builder - Web Application</title>");
			out.println("<link rel=\"stylesheet\" type=\"text/css\" href=\"../stylesheet.css\" title=\"Style\">");
			out.println("</head>");
			
			out.println("<body bgcolor=\"white\">");
	
			out.println("<span class=\"bold\">Empty response.</span>");
	
			out.println("</body>");
			out.println("</html>");
		}
	    /*
		PrintRequestAttributeSet printRequestAttributeSet = new HashPrintRequestAttributeSet();
		printRequestAttributeSet.add(MediaSizeName.ISO_A4);

		PrintServiceAttributeSet printServiceAttributeSet = new HashPrintServiceAttributeSet();
		
		JRPrintServiceExporter exporter = new JRPrintServiceExporter();
		
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, print);
		exporter.setParameter(JRPrintServiceExporterParameter.PRINT_REQUEST_ATTRIBUTE_SET, printRequestAttributeSet);
		exporter.setParameter(JRPrintServiceExporterParameter.PRINT_SERVICE_ATTRIBUTE_SET, printServiceAttributeSet);
		exporter.setParameter(JRPrintServiceExporterParameter.DISPLAY_PAGE_DIALOG, Boolean.FALSE);
		exporter.setParameter(JRPrintServiceExporterParameter.DISPLAY_PRINT_DIALOG, Boolean.TRUE);
		
		exporter.exportReport();
		*/
	}
	
	private void preview(HttpServletResponse response) throws JRException, IOException, ServletException{
		if (print != null)
		{
			response.setContentType("application/octet-stream");	//   application/x-java-serialized-object
			ServletOutputStream ouputStream = response.getOutputStream();
			
			ObjectOutputStream oos = new ObjectOutputStream(ouputStream);
			oos.writeObject(print);
			oos.flush();
			oos.close();

			ouputStream.flush();
			ouputStream.close();
		}
		else
		{
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			out.println("<html>");
			out.println("<head>");
			out.println("<title>Report Builder - Web Application</title>");
			out.println("<link rel=\"stylesheet\" type=\"text/css\" href=\"../stylesheet.css\" title=\"Style\">");
			out.println("</head>");
			
			out.println("<body bgcolor=\"white\">");
	
			out.println("<span class=\"bold\">Empty response.</span>");
	
			out.println("</body>");
			out.println("</html>");
		}

	    /*
        JRViewer jrv = new JRViewer(print);
        JDialog viewer = new JDialog();
        
        java.awt.Dimension screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
        viewer.setSize(screenSize.width-300, screenSize.height-150);
        viewer.setLocation((screenSize.width-viewer.getWidth())/2,(screenSize.height-viewer.getHeight())/2);
        viewer.setTitle("Report Builder");
        viewer.getContentPane().add(jrv);
        viewer.show();
        */
        
	}
	
	public void export(String exportType,HttpServletRequest request, HttpServletResponse response) throws JRException, IOException, ServletException{
	    if(report == null && dataSource == null){
	        throw new JRException("Null");
	    }
	    
	    if(ReportType.GET_PDF!= exportType){
	        print = JasperFillManager.fillReport(report, map, dataSource);
	    }
	    
		if( exportType.equals(ReportType.SAVE_PDF) ){
			exportPDF(response);
		} else if ( exportType.equals(ReportType.SAVE_EXCEL) ) {
			exportEXCEL();
		} else if ( exportType.equals(ReportType.SAVE_HTML) ) {
			exportHTML();
		} else if ( exportType.equals(ReportType.GET_EXCEL) ) {
			getEXCEL(response);
		} else if ( exportType.equals(ReportType.GET_PDF) ) {
			getPDF(response);
		} else if ( exportType.equals(ReportType.GET_TXT) ) {
			getTXT(response);
		} else if ( exportType.equals(ReportType.PRINT) ) {
			print(response);
		} else {
			preview(response);
		}
	}
	
	private void exportEXCEL() throws JRException{
		JRXlsExporter exporter = new JRXlsExporter();
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, print);
		exporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, print.getName()+ ReportType.EXCEL);
		exporter.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.TRUE);
		exporter.setParameter(JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
		exporter.setParameter(JRXlsExporterParameter.FORMAT_PATTERNS_MAP, map);
		exporter.exportReport();
	}

	private void exportHTML() throws JRException{
		JasperExportManager.exportReportToHtmlFile(print, print.getName()+ ReportType.HTML);
	}
	
	private void exportPDF(HttpServletResponse response) throws JRException{
		try{
			String exportPath = getReportFilePath() + File.separator;
			String fileName = print.getName()+System.currentTimeMillis()+ReportType.PDF;
			JasperExportManager.exportReportToPdfFile(print, exportPath+fileName);
			
			File file = new File(exportPath+File.separator+fileName);	
			FileInputStream fis = new FileInputStream(file);
			
			ServletOutputStream out = response.getOutputStream();

			response.setContentType("application/pdf");
			response.setHeader("Content-Disposition", "inline; filename=\""+fileName+"\";");
			response.setHeader("Content-Length", String.valueOf(file.length()));
			
			byte[] buffer = new byte[8192];
			int read = 0;
			while((read = fis.read(buffer,0,buffer.length)) > 0){
				out.write(buffer, 0, read);
			}			
			
			out.flush();
			out.close();
			fis.close();
			
			boolean delete = file.delete();
			if(delete){
				System.out.println("Report File Deleted!!");
			}else{
				System.out.println("File Delete Fail");
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	private void getTXT(HttpServletResponse response) throws JRException, IOException{
	    response.setContentType("text/plain");
	    response.setHeader("Content-disposition", "attachment; filename=" + print.getName()+ ReportType.TXT);
 		
 	    OutputStream oStream = null;
 	    try {
 			oStream = response.getOutputStream();
 
 			JRTextExporter exporter = new JRTextExporter();
			exporter.setParameter(JRExporterParameter.JASPER_PRINT, print);
			exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, oStream);			
			exporter.setParameter(JRTextExporterParameter.CHARACTER_WIDTH, new Integer(10));
			exporter.setParameter(JRTextExporterParameter.CHARACTER_HEIGHT, new Integer(10));
 			exporter.exportReport();
 	     }finally {
 	         if (oStream != null) {
 	         	oStream.flush();
 	         	oStream.close();
 	         }
 	     }	
	}
	
	private void getPDF(HttpServletResponse response) throws JRException, IOException{
		byte[] bytes =	JasperRunManager.runReportToPdf(report, map, dataSource);
		
		response.setContentType("application/pdf");
		response.setContentLength(bytes.length);
		
		ServletOutputStream ouputStream = response.getOutputStream();
		try{
			ouputStream.write(bytes, 0, bytes.length);
	    }finally {
	        if (ouputStream != null) {
	            ouputStream.flush();
	        	ouputStream.close();
	        }
	        bytes = null;
	    }
	}

	private void getEXCEL(HttpServletResponse response) throws JRException, IOException{
	    response.setContentType("application/vnd.ms-excel");
	    response.setHeader("Content-disposition", "attachment; filename=" + print.getName() + ".xlsx"); //ReportType.EXCEL
 		
 	    OutputStream oStream = null;
 	    try {
 			oStream = response.getOutputStream();
 
// 			JRXlsExporter exporterXLS = new JRXlsExporter();
//			JExcelApiExporter exporterXLS = new JExcelApiExporter();

			JRXlsxExporter exporterXLS = new JRXlsxExporter();
 			exporterXLS.setParameter(JRExporterParameter.JASPER_PRINT, print);
 			exporterXLS.setParameter(JRExporterParameter.OUTPUT_STREAM, oStream);
			exporterXLS.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.FALSE);
 			exporterXLS.setParameter(JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
 			exporterXLS.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.TRUE);
 			exporterXLS.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.FALSE);
 			exporterXLS.exportReport();
 	    }finally {
 	         if (oStream != null) {
 	         	oStream.flush();
 	         	oStream.close();
			}
		}
	}
	
	private String getReportFilePath(){
		try
		{
			return AppContextPropertyLoader.properties.getProperty("file.pdf.path");
		}
		catch(Exception e)
		{
			e.getStackTrace();
		}
		
		return null;		
	}
	
	
}