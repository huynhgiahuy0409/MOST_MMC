package com.tsb.most.biz.rest.billing;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.InvoiceItem;
import com.tsb.most.biz.parm.billing.SearchInvoiceParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/invoiceList")
public class InvoiceListController extends RestBaseController{
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectInvoiceItemList(SearchInvoiceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = null;
		
		result = invokeService("MOST.invoiceList.selectInvoiceItemList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateXmsInvoiceStatus(@PathVariable("id") String id, @RequestBody InvoiceItem item) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		DataItemList list = new DataItemList();
		
		list.add(item);
		updateParm.setUpdateItems(list);
		
		if(item.getIsUpdatePaid().equals("true")) {
			invokeService("MOST.invoiceList.updateXmsInvoiceStatus",updateParm);
		}
		
	}
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteInvoiceList(@PathVariable("id") String id, @RequestBody InvoiceItem item) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		DataItemList list = new DataItemList();
		
		item.setCrud(DAOProcessType.DELETE);
		
		list.add(item);
		deleteParm.setDeleteItems(list);
		
		invokeService("MOST.invoiceList.deleteItems",deleteParm);
	}
	//////////////////////////////////////////////////////////
	@RequestMapping(value = "/invoicelistdetail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse searchInvoiceDataItems(SearchInvoiceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.invoiceList.selectInvoiceDetailItem",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/invoicelistdetail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertInvoice(@RequestBody InvoiceDataItem item) throws ServiceException, Exception {
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
		
		Object result = invokeService("MOST.invoiceList.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;	
	}
	
	@RequestMapping(value = "/invoicelistdetail/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteInvoice(@PathVariable("id") String id, @RequestBody UpdateBizParm<InvoiceDataItem> parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		DeleteItemsBizParm items = new DeleteItemsBizParm();
		
		items.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.invoiceList.deleteItems", items);
		
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/invoicelistdetail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateInvoiceDetailItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<InvoiceDataItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		invokeService("MOST.invoiceList.updateInvoiceDetailItem", updateParm);
	}
	
	@RequestMapping(value = "/uploadfile", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse uploadFile(@RequestBody InvoiceDataItem item) throws ServiceException, Exception{
		UpdateItemsBizParm pParm = new UpdateItemsBizParm();
		DataItemList list = new DataItemList();
		
		item.setCrud(DAOProcessType.INSERT);
		item.setWorkingStatus(DAOProcessType.INSERT);
		
		list.add(item);
		
		pParm.setUpdateItems(list);
		
		RestResponse rtnResponse = (RestResponse)invokeService("MOST.fileUpload.applyUploadItems",pParm);
		
		return rtnResponse;
	}
	
	@RequestMapping(value = "/uploadfile", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getUploadFile(SearchFileUploadParm parm) throws ServiceException, Exception {
		RestResponse res = (RestResponse)invokeService("MOST.fileUpload.selectFileUploadList",parm);
		List<FileUploadItem> items = res.getData();
		
		if(items.size() > 0) {
			FileUploadItem fileUploadItem = items.get(0); 
			String loadDataDir = AppContextPropertyLoader.properties.getProperty("file.upload.path");
		    
			String fileName = String.format("%s%s", loadDataDir, fileUploadItem.getUfileName());
		    File file = new File(fileName);
	        
            InputStream in = new FileInputStream(file);
            fileUploadItem.setContent(IOUtils.toString(in, "ISO-8859-1"));
		}
		
		return res;
	}
	
	@RequestMapping(value = "/uploadfile/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteUploadFile(@PathVariable("id") String id, @RequestBody FileUploadItem item) throws ServiceException, Exception{
		DeleteItemsBizParm pParm = new DeleteItemsBizParm();
		DataItemList list = new DataItemList();
		
		item.setCrud(DAOProcessType.DELETE);
		pParm.setDeleteItems(list);
		
		invokeService("MOST.fileUpload.deleteUploadItems",pParm);
	}
	
	@RequestMapping(value = "/transfer/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void transferInvoiceItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<InvoiceItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		invokeService("MOST.invoiceList.transferInvoiceItems", updateParm);
	}

}
