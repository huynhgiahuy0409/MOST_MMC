package  com.tsb.most.biz.rest.document;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.parm.common.SearchVesselCallListParm;
import com.tsb.most.basebiz.parm.configuration.SearchEquipmentConfigurationParm;
import com.tsb.most.biz.dataitem.document.BLItem;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchDeliveryOrderParm;
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
@RequestMapping("/v1/blinfo")
public class BLController extends RestBaseController{
	@RequestMapping(value = "/vslCallIdInfo", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectSearchVesselCallList(SearchVesselCallListParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.searchVesselCall.selectSearchVesselCallList",parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectBLList(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.selectBLList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/checkbloperation", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getDataBLOperation(SearchBLParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.checkBLOperation",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/checkBlNo", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse checkBLNo(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bl.checkBLNo",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectContainerList(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bl.selectContainerList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/mfBlList", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectMfBLList(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bl.selectMfBLList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/blListForMf", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectBLListForMf(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bl.selectBLListForMf",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/filelist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFileList(SearchEquipmentConfigurationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.selectFileList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<BLItem> parm) throws ServiceException{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.bl.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateBl(@PathVariable("id") String id, @RequestBody UpdateBizParm<BLItem> parm) throws ServiceException{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.bl.updateItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteBLList(@PathVariable("id") String id, @RequestBody BLItem item) throws ServiceException, Exception{
		DataItemList items = new DataItemList();
		items.add(item);
		
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		deleteItems.setDeleteItems(items);
		
		invokeService("MOST.bl.deleteItems", deleteItems);
	}
	
	@RequestMapping(value = "/blCargoDetail", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectBlCargoDetail(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bl.selectBlCargoDetail",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitlist", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectRoRoItems(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.selectRoRoItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/blpkgdetail", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectPackageItems(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.selectPackageItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/blsplitpkgdetail", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectSplitPackageItems(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.selectSplitPackageItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/checkDO", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse checkDO(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.checkDO",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/checkTruck", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse checkTruck(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.checkTruck",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/checkOperation", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse checkOperation(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.checkOperation",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/checkGateIn", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse checkGateIn(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.checkGateIn",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/duplicateCheckSplitWgt", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSplitWgtChk(SearchBLParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.selectSplitWgtChk", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/selectSplitWgt", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSplitWgt(SearchBLParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.selectSplitWgt", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/checkSplitExist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSplitExistChk(SearchBLParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.selectSplitExistChk", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
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
	
	@RequestMapping(value = "/confirmdelivery/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateConfirmDeliveryStatus(@PathVariable("id") String id, @RequestBody UpdateBizParm<BLItem> parm) throws ServiceException{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		invokeService("MOST.bl.updateConfirmDeliveryStatus",updateParm);
	}
	
	@RequestMapping(value = "/sdoWeightList", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectSubDoWeightList(SearchBLParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bl.selectSubDoWeightList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
}
