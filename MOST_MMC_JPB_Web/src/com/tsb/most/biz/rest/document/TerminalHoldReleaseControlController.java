package com.tsb.most.biz.rest.document;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dataitem.document.TerminalHoldReleaseControlItem;
import com.tsb.most.biz.parm.document.SearchTerminalHoldReleaseControlParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/terminalholdreleasecontrol")
public class TerminalHoldReleaseControlController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTerminalHoldReleaseList(SearchTerminalHoldReleaseControlParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.terminalHoldReleaseControl.selectTerminalHoldReleaseList", parm);
		DataItemList resList = (DataItemList)result;
		
		res.setData(resList.getCollection());
		res.setLimit(resList.getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems( @RequestBody UpdateBizParm<TerminalHoldReleaseControlItem> parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = new Object();
		
		if(parm.getWorkingStatus().equals(DAOProcessType.INSERT)) {
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			insertParm.setInsertItems(super.getItems(parm));
			result = invokeService("MOST.terminalHoldReleaseControl.insertItems",insertParm);
		}else if(parm.getWorkingStatus().equals(DAOProcessType.UPDATE)){
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			updateParm.setUpdateItems(super.getItems(parm));
			result = invokeService("MOST.terminalHoldReleaseControl.updateItems",updateParm);
		}
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<TerminalHoldReleaseControlItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.terminalHoldReleaseControl.updateItems", updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<TerminalHoldReleaseControlItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		deleteParm.setDeleteItems(super.getItems(parm));
		
		invokeService("MOST.terminalHoldReleaseControl.deleteItems", deleteParm);
	}
	
	@RequestMapping(value = "/history", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTerminalHoldReleaseHist(SearchTerminalHoldReleaseControlParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.terminalHoldReleaseControl.selectTerminalHoldReleaseHist", parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/operationStoped", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectOPStoppedByHoldReason(SearchTerminalHoldReleaseControlParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.terminalHoldReleaseControl.selectOPStoppedByHoldReason", parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/checkTerminalHold", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse checkTerminalHold(SearchTerminalHoldReleaseControlParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.terminalHoldReleaseControl.checkTerminalHold", parm);
		DataItemList resList = (DataItemList)result; 
		res.setData(resList.getCollection());
		res.setLimit(resList.getTotalRowCount());
		return res;
	}
}