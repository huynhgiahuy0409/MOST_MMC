package com.tsb.most.rest.pdf;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.biz.dataitem.report.ReportItem;
import com.tsb.most.biz.parm.report.SearchReportParm;
import com.tsb.most.common.util.ReportType;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;
import com.tsb.most.util.report.IReportBuilder;
import com.tsb.most.util.report.ReportBuilder;

@Controller
@RequestMapping("/v1/pdfservice")
public class ReportPDFController extends RestBaseController{

	@RequestMapping(value = "/getPrint", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getPrint(SearchReportParm parm, HttpServletRequest request, HttpServletResponse response) throws ServiceException, Exception{
		RestResponse RestRes = new RestResponse();
		DataItem resItem = new DataItem();
		IReportBuilder builder = new ReportBuilder();
		
		if (parm.getPrintType() == null || parm.getPrintType().equals(CommonConstants.BLANK)) {
			parm.setPrintType(ReportType.SAVE_PDF);
		}
	 
		//String serviceId = parm.getBizParmMetaInfo().getServiceID();
		String serviceId = parm.getServiceId();//modified by Brian (2020/11/26) To get the service Id

		DataItemList result = null;
		Map<String, Object> parameterMap = null;
		ReportItem resultItem  = null;
		
		if (parm.getServiceId() != null) {
			Object rtnObj = invokeService(parm.getServiceId(), parm);
			resultItem = (ReportItem)rtnObj;
			
			parameterMap = resultItem.getParameterMap();
			
			if(parameterMap == null) {
				parameterMap = new HashMap<String, Object>();
			}
			
			result = resultItem.getDataItemList();
			
		}
		
		if(result == null) {
			return null;
		}
		
		builder.setDatasource(result.getCollection());
		builder.setJasperReport(resultItem.getMainReport());
		builder.setParameter(parameterMap);
		
		String filePathName = builder.generatePDF();
		String fileName[] = filePathName.split(AppContextPropertyLoader.properties.getProperty("filePath"));
		
		File file = new File(filePathName);
		
		InputStream in = new FileInputStream(file);
		FileUploadItem fileItem = new FileUploadItem();
		
		fileItem.setFileName(fileName[fileName.length-1]);
		fileItem.setContent(IOUtils.toString(in, "ISO-8859-1"));
		
		List resultList = new ArrayList();
		resultList.add(fileItem);
		
		RestRes.setData(resultList);
		
		//Remove temp file
		builder.removePDFfile(in,file);
		
		return RestRes;
		
	}
	
}
