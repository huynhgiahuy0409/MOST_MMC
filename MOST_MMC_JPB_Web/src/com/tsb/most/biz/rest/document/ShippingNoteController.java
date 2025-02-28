package com.tsb.most.biz.rest.document;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.parm.common.SearchVesselCallListParm;
import com.tsb.most.basebiz.parm.configuration.SearchEquipmentConfigurationParm;
import com.tsb.most.biz.dataitem.document.ShippingNoteItem;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.HtmlFileItem;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/shippingnote")
public class ShippingNoteController extends RestBaseController {
	@RequestMapping(value = "/shippingnotelist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShippingNoteList(SearchShippingNoteParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.shippingNote.selectShippingNoteList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/shippingnotedetail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShippingNoteDtlList(SearchShippingNoteParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.shippingNote.selectShippingNoteDtlList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/shippingnoteack", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse updateShippingNoteAckItems(@RequestBody ShippingNoteItem item) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		DataItemList itemList = new DataItemList();
		
		itemList.add(item);
		items.setUpdateItems(itemList);
		
		Object result = invokeService("MOST.shippingNote.updateShippingNoteAckItems", items);
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/shippingnotedetail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertShippingNote(@RequestBody UpdateBizParm<ShippingNoteItem> parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		InsertItemsBizParm insertItems = new InsertItemsBizParm();
		
		insertItems.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.shippingNote.insertItems", insertItems);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/shippingnotedetail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateShippingNote(@PathVariable("id") String id, @RequestBody UpdateBizParm<ShippingNoteItem> parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.shippingNote.updateItems", items);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/shippingnotelist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteShippingNote(@PathVariable("id") String id, @RequestBody ShippingNoteItem item) {
		DataItemList itemList = new DataItemList();
		itemList.add(item);
		
		DeleteItemsBizParm delParm = new DeleteItemsBizParm();
		
		delParm.setDeleteItems(itemList);
		invokeService("MOST.shippingNote.deleteItems", delParm);
	}

	@RequestMapping(value = "/filelist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFileList(SearchEquipmentConfigurationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.shippingNote.selectFileList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/unitlist", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectRoRoItems(SearchShippingNoteParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.shippingNote.selectRoRoItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/shippingnotepkgdetail", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectPackageItems(SearchShippingNoteParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.shippingNote.selectPackageItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/selectSearchVesselCallId", method = RequestMethod.GET)
	@ResponseBody
    public RestResponse selectSearchVesselCallId(SearchVesselCallListParm parm) throws ServiceException {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.searchVesselCall.selectSearchVesselCallId",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
    }
	
	@RequestMapping(value = "/validationSn", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectValidationCode(SearchShippingNoteParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = this.invokeService("MOST.shippingNote.selectValidationCode", parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rorosampleupload", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse roroSampleUpLoad(HttpServletRequest request, HttpServletResponse response) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
        ServletContext servlet = request.getServletContext();
        String path = servlet.getRealPath("/reports/LAIP_RORO_LoadingDetailList.xlsx");
        InputStream in = new FileInputStream(path);
        
        HtmlFileItem result = new HtmlFileItem();
        result.setContent(IOUtils.toString(in, "ISO-8859-1"));
        List items = new ArrayList();
        items.add(result);
        res.setData(items);
				
		return res;		
		
	}
	
	@RequestMapping(value = "/packagesampleupload", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse packageSampleUpLoad(HttpServletRequest request, HttpServletResponse response) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
        ServletContext servlet = request.getServletContext();
        String path = servlet.getRealPath("/reports/LAIP_GeneralCargo_PackageDetail.xlsx");
        InputStream in = new FileInputStream(path);
        
        HtmlFileItem result = new HtmlFileItem();
        result.setContent(IOUtils.toString(in, "ISO-8859-1"));
        List items = new ArrayList();
        items.add(result);
        res.setData(items);
				
		return res;		
		
	}
}
