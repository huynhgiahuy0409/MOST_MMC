package com.tsb.most.biz.rest.configuration;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tsb.most.basebiz.dataitem.configuration.AllowanceConfigurationItem;
import com.tsb.most.basebiz.parm.configuration.SearchAllowanceConfigurationParm;
import com.tsb.most.basebiz.parm.validation.SearchValidationCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@RestController
@RequestMapping("/v1/allowance")
public class AllowanceConfigurationController extends RestBaseController {

	@GetMapping(value = "/allowanceconfiglist")
	public RestResponse getAllowanceConfigurationList(SearchAllowanceConfigurationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.allowanceConfiguration.getAllowanceConfigurationItems", parm);
		res.setData(((DataItemList) result).getCollection());

		return res;

	}

	@GetMapping(value = "/allowancevalidate")
	public RestResponse getAllowanceValidate(SearchValidationCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.validationCode.selectValidation", parm);
		res.setData(((DataItemList) result).getCollection());

		return res;
	}

	@GetMapping(value = "/stafflist")
	public RestResponse getStaffItem(SearchAllowanceConfigurationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.allowanceConfiguration.getStaffItem", parm);
		res.setData(((DataItemList) result).getCollection());

		return res;
	}

	@PostMapping(value = "/allowanceconfiglist")
	@ResponseStatus(HttpStatus.CREATED)
	public RestResponse insertAllowanceConfiguration(@RequestBody AllowanceConfigurationItem item) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		DataItemList insertItems = new DataItemList();
		insertItems.add(item);
		
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItems(insertItems);

		Object result = invokeService("MOST.allowanceConfiguration.insertItem", insertParm);
		res.setData(((DataItemList) result).getCollection());

		return res;
	}

	@PutMapping(value = "/allowanceconfiglist/{id}")
	public RestResponse updateAllowanceConfiguration(@PathVariable("id") String id, @RequestBody AllowanceConfigurationItem item) throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		DataItemList updateItems = new DataItemList();
		updateItems.add(item);

		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(updateItems);

		Object result = invokeService("MOST.allowanceConfiguration.updateItem", updateParm);
		res.setData(((DataItemList) result).getCollection());

		return res;

	}

	@DeleteMapping(value = "/allowanceconfiglist/{id}")
	public void deleteAllowanceConfiguration(@PathVariable("id") String id, @RequestBody AllowanceConfigurationItem item) {
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();

		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);

		invokeService("MOST.allowanceConfiguration.deleteItem", deleteParm);
	}

}
