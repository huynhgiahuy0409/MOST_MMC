package com.tsb.most.biz.rest.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.common.bizparm.export.HtmlFileExportBizParm;
import com.tsb.most.framework.dataitem.HtmlFileItem;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/fileexport")
public class FileExportController extends RestBaseController {
	
	@RequestMapping(value = "/createFile", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse searchItems(@RequestBody HtmlFileExportBizParm parm) throws ServiceException, Exception{
		
		String serviceID = "MOST.htmlExcelExporter.createFile";
		if(!parm.getIsExcel()) {
			serviceID = "MOST.htmlPdfExporter.createFile";
		}
		
		HtmlFileItem result = (HtmlFileItem)invokeService(serviceID, parm);
		RestResponse res = new RestResponse();
	    File file = new File(result.getFullName());
        
        InputStream in = new FileInputStream(file);
        result.setContent(IOUtils.toString(in, "ISO-8859-1"));
        
        List items = new ArrayList();
        items.add(result);
        res.setData(items);
        
		return res;
	}
}
