/**
* 
* COPYRIGHT (PLUS) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
* 
* FILE NAME : com.pcs.rest.common.CodeMasterController.java 
* CREATE ON : 2015. 3. 27
* CLASS DESCRIPTION :
* 
*  
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION     
* --------------------------------------------------------------------------
* 2015. 3. 27     simonkang             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.biz.rest.codes;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.dataitem.codes.DangerousGoodsCodeItem;
import com.tsb.most.basebiz.parm.codes.SearchDangerousGoodsCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

/**
 * The Class CodeMasterController.
 */
@Controller
@RequestMapping("/v1/dangerousgoodscode")
public class DangerousGoodsCodeController extends RestBaseController {
	
	@RequestMapping(value = "/dangerousgoodscode", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDangerousGoodsCode(SearchDangerousGoodsCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.dangerousGoodsCode.selectDangerousGoodsCode",parm);

		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/dangerousgoodscode", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<DangerousGoodsCodeItem> item) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(item));
		
		Object result = invokeService("MOST.dangerousGoodsCode.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
		
	}
	
	@RequestMapping(value = "/dangerousgoodscode/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<DangerousGoodsCodeItem> item) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(item));
		
		Object result = invokeService("MOST.dangerousGoodsCode.updateItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/dangerousgoodscode/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody DangerousGoodsCodeItem item) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.dangerousGoodsCode.deleteItems",deleteParm);
	}
}
