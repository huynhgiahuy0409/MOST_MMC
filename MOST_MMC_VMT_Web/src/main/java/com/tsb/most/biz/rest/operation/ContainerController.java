package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.ContainerProcessItem;
import com.tsb.most.biz.parm.operation.ContainerProcessParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/container")
public class ContainerController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectListofContainerProcessItems(ContainerProcessParm parm)
			throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.container.selectContainerProcessList", parm);
		response.setData(((DataItemList) result).getCollection());
		response.setLimit(((DataItemList) result).getTotalRowCount());
		return response;
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertContainerProcessItem(@RequestBody UpdateBizParm<ContainerProcessItem> item)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = new Object();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItems(super.getItems(item));

		result = invokeService("MOST.container.insertContainerProcessItems", insertParm);

		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateContainerProcessItem(@RequestBody UpdateBizParm<ContainerProcessItem> item)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = new Object();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(item));

		result = invokeService("MOST.container.updateContainerProcessItems", updateParm);

		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteContainerProcessItem(@PathVariable("id") String id,
			@RequestBody UpdateBizParm<ContainerProcessItem> item) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = new Object();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		deleteParm.setDeleteItems(super.getItems(item));

		result = invokeService("MOST.container.deleteContainerProcessItems", deleteParm);

		res.setData(((DataItemList) result).getCollection());
		return res;
	}
}
