package com.tsb.most.biz.rest.document;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dataitem.document.VesselParticularItem;
import com.tsb.most.biz.parm.document.SearchVesselParticularParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/vesselparticular")
public class VesselParticularController extends RestBaseController{
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselParticularList(SearchVesselParticularParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.vesselParticular.selectVesselParticularList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value="/vslChange", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRequestVesselChangeList(SearchVesselParticularParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.vesselParticular.selectRequestVesselChangeList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/shaList", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectShaList(SearchVesselParticularParm  parm)	throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.vesselParticular.selectShaList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/agency", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectSha(SearchVesselParticularParm  parm)	throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.vesselParticular.selectSha", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/vslIdDuplicateCheck", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse vslScheduleCheck(SearchVesselParticularParm  parm)	throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.vesselParticular.vslScheduleCheck", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/validateformq", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse isCheckValidateForMQ(SearchVesselParticularParm  parm)	throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.vesselParticular.isCheckValidateForMQ", parm);	// Service Bean ID
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/shpList", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectShpList(SearchVesselParticularParm  parm)	throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.vesselParticular.selectShpList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectVesselParticularDetailItem(SearchVesselParticularParm  parm)	throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.vesselParticular.selectVesselParticularDetailItem", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/dataList", method = RequestMethod.GET)
	@ResponseBody	
	public RestResponse selectCombobox(SearchCodeMasterParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.comboboxService.selectCombobox", parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public void insertItems(@RequestBody UpdateBizParm<VesselParticularItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		
		Object result = invokeService("MOST.vesselParticular.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
	}
	
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody  UpdateBizParm<VesselParticularItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.vesselParticular.updateItems", updateParm);
		
		VesselParticularItem itemCol = (VesselParticularItem)updateParm.getUpdateItems().getCollection().get(0);
	
		if(itemCol.getCheck().equals("Y")){
			result = invokeService("MOST.vesselParticular.updateVesselParticularItemConfirm", updateParm);
		}
		
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody VesselParticularItem item) throws ServiceException, Exception{
		DataItemList items = new DataItemList();
		items.add(item);
		
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		deleteItems.setDeleteItems(items);
		
		invokeService("MOST.vesselParticular.deleteItems", deleteItems);
	}
}
