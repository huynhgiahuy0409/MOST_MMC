package com.tsb.most.biz.rest.document;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.biz.dataitem.document.NominationManifestItem;
import com.tsb.most.biz.parm.document.SearchNominationManifestParm;
import com.tsb.most.biz.parm.document.SearchValidationCodeParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/forwardernomination")
public class ForwarderNominationController extends RestBaseController {

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectForwarderNominationList(SearchNominationManifestParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.nominationManifest.getNominationManifestList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateNominationManifest(@PathVariable("id") String id, @RequestBody NominationManifestItem item)
			throws ServiceException, Exception {
		item.setCrud(DAOProcessType.UPDATE);

		UpdateItemsBizParm pParm = new UpdateItemsBizParm();
		pParm.setDataItem(item);

		invokeService("MOST.nominationManifest.processNominationManifestItem", pParm);
	}

	@RequestMapping(value = "/uploadfile", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertUploadedFileInfo(@RequestBody FileUploadItem item) throws ServiceException, Exception {

		item.setCrud(DAOProcessType.INSERT);
		item.setWorkingStatus(DAOProcessType.INSERT);

		DataItemList items = new DataItemList();
		items.add(item);

		UpdateItemsBizParm pParm = new UpdateItemsBizParm();
		pParm.setUpdateItems(items);

		RestResponse rtnResponse = (RestResponse) invokeService("MOST.nominationManifest.applyFileUploadItems", pParm);

		return rtnResponse;
	}

	@RequestMapping(value = "/validationCode", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectValidationCode(SearchValidationCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.nominationManifest.getValidationCode", parm);

		res.setData(((DataItemList) result).getCollection());

		return res;
	}
}
