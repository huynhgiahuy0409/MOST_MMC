package com.tsb.most.biz.rest.billing;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tsb.most.biz.dataitem.billing.CreditNoteItem;
import com.tsb.most.biz.parm.billing.SearchCreditNoteParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@RestController
@RequestMapping("/v1/creditnote")
public class CreditNoteController extends RestBaseController {

	@GetMapping("/list")
	@ResponseBody
	public RestResponse selectCreditNoteList(SearchCreditNoteParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.creditNote.selectCreditNoteList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@GetMapping("/detail")
	public RestResponse selectCreditNoteDetail(SearchCreditNoteParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.creditNote.selectCreditNoteDetail", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@PostMapping("/detail")
	@ResponseStatus(HttpStatus.CREATED)
	public RestResponse insertItems(@RequestBody UpdateBizParm<CreditNoteItem> parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		InsertItemsBizParm inertParm = new InsertItemsBizParm();

		inertParm.setInsertItems(super.getItems(parm));

		Object result = invokeService("MOST.creditNote.insertItems", inertParm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@PutMapping("/detail/{id}")
	public RestResponse updateItems(@RequestBody UpdateBizParm<CreditNoteItem> parm)
			throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();

		updateParm.setUpdateItems(super.getItems(parm));

		Object result = invokeService("MOST.creditNote.updateItems", updateParm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

}
