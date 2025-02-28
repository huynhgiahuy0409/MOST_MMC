package com.tsb.most.rest.common;


import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/file/manage")
public class FileUploadController extends RestBaseController {
	@RequestMapping(value = "/excelupload",method = RequestMethod.POST)
    public @ResponseBody void excelUpload(HttpServletRequest request, HttpServletResponse response) throws BizException {
		
		try {
			
			Map<String, Object> sendMap = new HashMap<String, Object>();
			response.setCharacterEncoding("UTF-8");
		    response.setContentType("text/html");
		    
		    PrintWriter writer = response.getWriter();
		    
		    FileItemFactory factory = new DiskFileItemFactory();
		    ServletFileUpload upload = new ServletFileUpload(factory);
		    
		    String fileName = null;

	    	List fileUploadParseRequest = upload.parseRequest(request);
	    	Iterator iterParsor = fileUploadParseRequest.iterator();
	    	response.setContentType("text/html");
	    	while ( iterParsor.hasNext() ) {
	    		String uuid = UUID.randomUUID().toString();
	    		String loadDataDir = null;
	    		File file = null;
	    		FileItem fileItem = (FileItem) iterParsor.next();
	    		
    			loadDataDir = AppContextPropertyLoader.properties.getProperty("file.excel.path");
    			fileName = String.format("%s%s", loadDataDir, uuid)+".xlsx";
    			file = new File(fileName);
	    		
	    		File dir = new File(loadDataDir);
	    		
	    		if(!dir.exists()) {
                	dir.mkdirs();
                }
                fileItem.write(file);
	    			
	            sendMap.put("fileName",uuid+".xlsx");
	    	}
	    	
	    	ObjectMapper sendObj = new ObjectMapper();
	    	String sendJsonMsg = sendObj.writeValueAsString(sendMap);
	    	writer.println(sendJsonMsg); // Reponse Message
	    }catch ( Exception e ) {
	    	throw new BizException(null, e);
    	}
	}
	
	@RequestMapping(value = "/fileupload",method = RequestMethod.POST)
    public @ResponseBody void create(HttpServletRequest request, HttpServletResponse response) throws BizException {
		
		try {
			
			Map<String, Object> sendMap = new HashMap<String, Object>();
			response.setCharacterEncoding("UTF-8");
		    response.setContentType("text/html");
		    
		    PrintWriter writer = response.getWriter();
		    
		    boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		    
		    if (!isMultipart) {
		    	//ToDo: What the meaning of isMultipart
		    	throw new ServiceException("Error ID","Error Description", null);
		    }            
		    
		    FileItemFactory factory = new DiskFileItemFactory();
		    ServletFileUpload upload = new ServletFileUpload(factory);
		    
		    String fileName = null;

	    	List fileUploadParseRequest = upload.parseRequest(request);
	    	Iterator iterParsor = fileUploadParseRequest.iterator();
	    	response.setContentType("text/html");
	    	while ( iterParsor.hasNext() ) {
	    		String uuid = UUID.randomUUID().toString();
	    		String loadDataDir = null;
	    		File file = null;
	    		FileItem fileItem = (FileItem) iterParsor.next();
	    		
    			loadDataDir = AppContextPropertyLoader.properties.getProperty("file.upload.path");
    			fileName = String.format("%s%s", loadDataDir, uuid);
    			file = new File(fileName);
	    		
	    		File dir = new File(loadDataDir);
	    		
	    		if(!dir.exists()) {
                	dir.mkdirs();
                }
                fileItem.write(file);
	    			
	            sendMap.put(fileItem.getName(), uuid);
	    	}
	    	
	    	ObjectMapper sendObj = new ObjectMapper();
	    	String sendJsonMsg = sendObj.writeValueAsString(sendMap);
	    	writer.println(sendJsonMsg); // Reponse Message
	    }catch ( Exception e ) {
	    	throw new BizException(null, e);
    	}
	}
	
	@RequestMapping(value = "/filedownload",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFileDownload(SearchFileUploadParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object obj = invokeService("MOST.fileUpload.selectFileUploadList",parm);
		res.setData(((DataItemList)obj).getCollection());
		
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
}
