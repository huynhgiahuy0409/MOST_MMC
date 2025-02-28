package com.tsb.most.biz.rest.administrator;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.dataitem.administrator.CompanyRegisterItem;
import com.tsb.most.basebiz.parm.administrator.SearchCompanyRegisterParm;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/companyregister")
public class CompanyRegisterController extends RestBaseController {

	@RequestMapping(value = "/companyRegisterList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCompanyRegisterList(SearchCompanyRegisterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.companyRegister.selectCompanyRegisterList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/companyRegisterdetail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCompanyRegisterDetail(SearchCompanyRegisterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.companyRegister.selectCompanyRegisterDetail", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/companyRegisterList/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<CompanyRegisterItem> parm)
			throws ServiceException, Exception {
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();

		deleteItems.add(this.getItems(parm));
		deleteParm.setDeleteItems(deleteItems);

		invokeService("MOST.companyRegister.deleteItems", deleteParm);
	}
	
	@RequestMapping(value = "/shplist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSystemList(SearchCompanyRegisterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.companyRegister.selectShpList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}
	
	//s-MGR-008 PLUS – Company Register List and Detail screen
	@RequestMapping(value = "/filelist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFileList(SearchFileUploadParm parm) throws BizException {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.companyRegister.selectFileList", parm);
		
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		
		return res;
	}
	//e-MGR-008 PLUS – Company Register List and Detail screen
}
