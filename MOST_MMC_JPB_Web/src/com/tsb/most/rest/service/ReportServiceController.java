package com.tsb.most.rest.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.common.PackageItem;
import com.tsb.most.biz.parm.common.PackageParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;


@Controller
@RequestMapping("/v1/print")
public class ReportServiceController extends RestBaseController{
	
	@RequestMapping(value = "/printPDF", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectBayPlan(HttpServletResponse response, PackageParm parm) throws ServiceException, Exception {
    	RestResponse res = new RestResponse();
    	
    	String uuid = UUID.randomUUID().toString();
    	parm.setPackageFilePath(uuid);
    	Object result = invokeService("MOST.berthReport.printBayPlan", parm);
    	PackageItem  resultItem = (PackageItem)((DataItemList)result).getCollection().get(0);  
    	List<PackageItem> bayPlan = new ArrayList<PackageItem>();
    	bayPlan.add(resultItem);
		bayPlan.get(0).setContent(generateStreamData(resultItem.getReportFilePath()));

        res.setData(bayPlan);
		return res;    	
    }
	
	@RequestMapping(value = "/previewpdf", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse previewPdfVslInternal(PackageParm parm, HttpServletRequest request, HttpServletResponse response) throws ServiceException, Exception{

		RestResponse res = new RestResponse();
    	
    	String uuid = UUID.randomUUID().toString();
    	parm.setPackageFilePath(uuid);
    	Object result = invokeService("MOST.berthReport.printBayPlan", parm);
    	PackageItem  resultItem = (PackageItem)((DataItemList)result).getCollection().get(0);  
    	List<PackageItem> bayPlan = new ArrayList<PackageItem>();
    	bayPlan.add(resultItem);
		bayPlan.get(0).setContent(generateStreamData(resultItem.getReportFilePath()));

        res.setData(bayPlan);
		return res;    	
	};
}
