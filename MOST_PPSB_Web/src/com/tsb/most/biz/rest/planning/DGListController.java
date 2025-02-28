package com.tsb.most.biz.rest.planning;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.biz.dataitem.document.DGDeclarationItem;
import com.tsb.most.biz.dataitem.planning.DGListItem;
import com.tsb.most.biz.parm.document.SearchDGDeclarationParm;
import com.tsb.most.biz.parm.planning.SearchDGListParm;
import com.tsb.most.common.util.ReportType;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;
import com.tsb.most.util.report.IReportBuilder;
import com.tsb.most.util.report.ReportBuilder;
import com.tsb.most.framework.config.AppContextPropertyLoader;

@Controller
@RequestMapping("/v1/dglist")
public class DGListController  extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDGList(SearchDGListParm parm) throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.dgList.getDGList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDGDetail(SearchDGListParm parm) throws ServiceException, Exception {		

		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.dgList.getDGDetail",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse processDGDetail(@RequestBody UpdateBizParm<DGListItem> item) throws ServiceException, Exception{
		
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(item));
		
		Object result = invokeService("MOST.dgList.processDGDetail",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;

	}
	
	@RequestMapping(value = "/substance", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDGDeclarationSubstance(SearchDGListParm parm) throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.dgList.getSubstanceItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
}
