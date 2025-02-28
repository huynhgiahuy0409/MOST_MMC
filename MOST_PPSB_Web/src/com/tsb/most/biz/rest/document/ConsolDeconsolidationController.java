package  com.tsb.most.biz.rest.document;

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

import com.tsb.most.biz.parm.document.SearchConsolDeconsolidationParm;
import com.tsb.most.biz.dataitem.document.BLItem;
import com.tsb.most.biz.dataitem.document.ConsolDeconsolidationItem;
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
@RequestMapping("/v1/consoldeconsolidation")
public class ConsolDeconsolidationController extends RestBaseController{
	@RequestMapping(value = "/cargoStatusCombo", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectCargoStatusCombo(SearchConsolDeconsolidationParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.consolDeconsolidation.selectCargoStatusCombo",parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectConsolDeconsolidationList(SearchConsolDeconsolidationParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.consolDeconsolidation.selectConsolDeconsolidationList",parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
		
	@RequestMapping(value = "/updateGetInSnBl", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse updateGetInStatusForSnBl(@RequestBody UpdateBizParm<ConsolDeconsolidationItem> parm) throws ServiceException{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.consolDeconsolidation.updateGetInStatusForSnBl",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/updateGetOutSnBl", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse updateGetOutStatusForSnBl(@RequestBody UpdateBizParm<ConsolDeconsolidationItem> parm) throws ServiceException{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItem(parm.getItem());
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.consolDeconsolidation.updateGetOutStatusForSnBl",insertParm);
	
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}
