package com.tsb.most.biz.rest.vms;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.dataitem.vms.VesselImageItem;
import com.tsb.most.basebiz.dataitem.vms.VesselItem;
import com.tsb.most.basebiz.parm.vms.VesselParm;
//import com.pcs.foundation.bizparm.CudParm;
//import com.pcs.foundation.exception.BizException;
//import com.pcs.foundation.exception.ServiceException;
//import com.pcs.rest.base.controller.RestBaseController;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/coast")
public class VesselCoastController extends RestBaseController {
	/** The logger. */
	//private ILogger logger = new LoggingService(getClass());

	// Vessel List
	@RequestMapping(value = "/vessels", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselList(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCoast.selectVesselList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	// Vessel Duplicate Remove Route Code List
	@RequestMapping(value = "/routecodes", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselRouteCodeList(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCoast.selectVesselRouteCodeList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	// Vessel Kind List
	@RequestMapping(value = "/vesselkinds", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectVesselKindList(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCoast.selectVesselKindList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
    }
	
	// Vessel Movements
	@RequestMapping(value = "/vesselmovements", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectVesselMovements(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCoast.selectVesselMovements", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/vesselimage", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectVesselImage(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCoast.selectVesselImage", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
    }   
	
	@RequestMapping(value = "/vesselimageupload",method = RequestMethod.POST)
    public @ResponseBody void create(HttpServletRequest request, HttpServletResponse response, @RequestParam String vesselCode) throws ServiceException, IOException, BizException {
		
//		response.setCharacterEncoding("UTF-8");
//	    response.setContentType("text/html");
//	    
//	    PrintWriter writer = response.getWriter();
//	    
//	    boolean isMultipart = ServletFileUpload.isMultipartContent(request);
//	    
//	    if (!isMultipart) {
//	    	//ToDo: What the meaning of isMultipart
//	    	throw new ServiceException("Error ID","Error Description", null);
//	    }            
//	    
//	    FileItemFactory factory = new DiskFileItemFactory();
//	    ServletFileUpload upload = new ServletFileUpload(factory);
//	    
//	    String atchFileName = null;
//	    String fileSize = null;
//	    String maskedFileName = null;
//	    
//	    try {
//	    	
//	    	//PropertyElement element = PropertyHolder.getProderty();     
//	    	//get config value of config.properties file
//	    	List fileUploadParseRequest = upload.parseRequest(request);
//	    	Iterator iterParsor = fileUploadParseRequest.iterator();
//	    	
//	    	response.setContentType("text/html");
//	    	
//	    	while ( iterParsor.hasNext() ) {
//	    		
//	    		//String loadDataDir = PcsProperties.getProperty("image.vessel");
//	    	    String loadDataDir = AppContextPropertyLoader.properties.getProperty("file.upload.path");	    		
//	    		File file = null;
//	    		FileItem fileItem = (FileItem) iterParsor.next();
//	    		atchFileName = fileItem.getName();
//
//	    		String sExtention = atchFileName.substring(atchFileName.lastIndexOf(".")+1);
//	    		maskedFileName = String.valueOf(System.currentTimeMillis()) + "." + sExtention;
//	    			    		
//	    		file = new File(loadDataDir + maskedFileName);	    		
//	    		File dir = new File(loadDataDir);
//	    		
//	    		if(!dir.exists()) {
//                	dir.mkdirs();
//                }
//	    		
//                fileItem.write(file);
//	    		fileSize = Long.toString(fileItem.getSize());
//	    	}
//	    	VesselImageItem item = new VesselImageItem();
//	    	item.setVesselCode(vesselCode);
//	    	item.setAtchFileName(atchFileName);
//	    	item.setMaskedFileName(maskedFileName);
//	    	item.setMainImage("Y");
//	    	
//	        InsertItemsBizParm param = new InsertItemsBizParm();
//	        param.setDataItem(item);
//	        execute("vesselCoast","insertVesselImage",param);
//	    	
//	    	
//	    	writer.println("{success:true, fileName:'"+maskedFileName+"', atchFileName:'"+atchFileName+"', fileSize:'"+fileSize+"'}");
//	 	    writer.close();	
//	    	
//	    }catch ( Exception e ) {
//    		throw new BizException(null, e);
//    	}
	}
	
    
	@RequestMapping(value = "/vesselimage", method = RequestMethod.POST)
	@ResponseBody
	public void insertVesselImage(@RequestBody VesselImageItem item) throws ServiceException, Exception{
	    
//	    item.setCrud(DAOProcessType.INSERT);
//	    InsertItemsBizParm param = new InsertItemsBizParm();
//	    param.setDataItem(item);
//	    execute("vesselCoast","insertVesselImage",param);
	}
	
    @RequestMapping(value = "/vesselimage/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateVesselImage(@PathVariable("id") String id, @RequestBody VesselImageItem item) throws ServiceException, Exception{
		
//		item.setCrud(DAOProcessType.UPDATE);
//		UpdateItemsBizParm param = new UpdateItemsBizParm();
//		param.setDataItem(item);
//		execute("vesselCoast","updateVesselImage",param);
	}
    
    @RequestMapping(value = "/vesselimage/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteVesselImage(@PathVariable("id") String id, @RequestBody VesselImageItem item) throws ServiceException, Exception{
		
//		item.setCrud(DAOProcessType.DELETE);
//		
//		DeleteItemsBizParm param = new DeleteItemsBizParm();
//		param.setDataItem(item);
//
//		execute("vesselCoast","deleteVesselImage",param);
	}	
	
	
    @RequestMapping(value = "/vesselgps/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateVesselGps(@PathVariable("id") String id, @RequestBody VesselItem item) throws ServiceException, Exception{
		
//		item.setCrud(DAOProcessType.UPDATE);
//		UpdateItemsBizParm param = new UpdateItemsBizParm();
//		param.setDataItem(item);
//		execute("vesselCoast","updateVesselGps",param);
	}    
	
	
}
