package com.tsb.most.biz.rest.administrator;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.dataitem.administrator.CompanyRegisterItem;
import com.tsb.most.basebiz.parm.administrator.SearchCompanyRegisterParm;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
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
	public RestResponse selectCompanyRegisterList(SearchCompanyRegisterParm parm)	throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.companyRegister.selectCompanyRegisterList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());

		return res;
	}
	
	@RequestMapping(value = "/companyRegisterdetail", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectCompanyRegisterDetail(SearchCompanyRegisterParm parm)	throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.companyRegister.selectCompanyRegisterDetail",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/ptnrValidation", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse checkValidation(SearchCompanyRegisterParm parm)	throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.companyRegister.checkPtnrValidation",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/ptnrCodeValidation", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse checkPtnrCode(SearchCompanyRegisterParm parm)	throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.companyRegister.checkPtnrCode",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/companyRegisterList", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<CompanyRegisterItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItems(super.getItems(parm));
		
		Object result = invokeService("MOST.companyRegister.insertItems", insertParm);
		
		RestResponse res = new RestResponse();
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}	

	@RequestMapping(value = "/companyRegisterList/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<CompanyRegisterItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.companyRegister.updateItems", updateParm);
		
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/companyRegisterList/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id,@RequestBody UpdateBizParm<CompanyRegisterItem> parm) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(this.getItems(parm));
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.companyRegister.deleteItems",deleteParm);
	}
	
	//s-AUT-001 Company Register
	@RequestMapping(value = "/shplist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSystemList(SearchCompanyRegisterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.companyRegister.selectShpList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}
	
	@RequestMapping(value = "/filelist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFileList(SearchFileUploadParm parm) throws BizException {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.companyRegister.selectFileList", parm);
		
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		
		return res;
	}
	//e-AUT-001 Company Register
}
 