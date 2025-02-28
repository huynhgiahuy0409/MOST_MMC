package com.tsb.most.biz.rest.billing;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.billing.ForeignExchangeRateItem;
import com.tsb.most.biz.parm.billing.SearchForeignExchangeRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/foreignexchangerate")
public class ForeignExchangeRateController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getForeignExchangeRateList(SearchForeignExchangeRateParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.foreignExchangeRate.selectCurrencyList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/copy", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectForeignExchangeRate(SearchForeignExchangeRateParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.foreignExchangeRate.selectCurrencyList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/duplicateDate", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getForeignExchangeRateListDuplicateDate(SearchForeignExchangeRateParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.foreignExchangeRate.selectDupliateData", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/selectcurrencymaster", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCurrencyMaster(SearchForeignExchangeRateParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.foreignExchangeRate.selectCurrencyMaster", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/selectCurrencyIndex", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCurrencyIndex(SearchForeignExchangeRateParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.foreignExchangeRate.selectCurrencyIndex", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<ForeignExchangeRateItem> parm)
			throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();

		insertParm.setInsertItems(super.getItems(parm));

		Object result = invokeService("MOST.foreignExchangeRate.insertItems", insertParm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id,
			@RequestBody UpdateBizParm<ForeignExchangeRateItem> parm) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();

		updateParm.setUpdateItems(super.getItems(parm));

		Object result = invokeService("MOST.foreignExchangeRate.updateItems", updateParm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteItems(@PathVariable("id") String id,
			@RequestBody UpdateBizParm<ForeignExchangeRateItem> parm) throws ServiceException, Exception {
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.foreignExchangeRate.deleteItems", deleteParm);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
}
