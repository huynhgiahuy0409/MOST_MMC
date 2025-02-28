package com.tsb.most.biz.rest.operation;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.operation.CargoArrvDelvItem;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/gatetransaction")
public class GateTransactionController extends RestBaseController{
	@RequestMapping(value = "/portSafetyConfirmationComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPortSafetyConfirmationList(SearchCargoArrvDelvParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = new Object();
		if ("comboList".equals(parm.getSearchType())) {
			result = invokeService("MOST.gateTransaction.selectCargoArrvDelvComboList",parm);
        } else if (parm.getSearchType().equals("Chk") ) {
        	result = invokeService("MOST.gateTransaction.selectArrvDelvIsCheck",parm);
        } else if (parm.getSearchType().equals("ChkGO") ) {
        	result = invokeService("MOST.gateTransaction.selectGateOutCheck",parm);
        } else if (parm.getSearchType().equals("lorryGateIn") ) {
        	result = invokeService("MOST.gateTransaction.selectGateInData",parm);
        } else{
        	result = invokeService("MOST.gateTransaction.selectCargoArrvDelv",parm);
        }
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/portSafetyConfirmationComboList", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<CargoArrvDelvItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.gateTransaction.insertItems",insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/portSafetyConfirmationComboList/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoArrvDelvItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.gateTransaction.updateItems",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
		
}
