package com.tsb.most.biz.rest.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/filedownload")
public class FileDownloadController extends RestBaseController {
	
	@RequestMapping(value = "/download", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFileDownload(SearchFileUploadParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		DataItemList fileList = (DataItemList)invokeService("MOST.fileUpload.selectFileList",parm);
		List<FileUploadItem> items = (List<FileUploadItem>)fileList.getCollection();
		
		if(items.size() > 0) {
			FileUploadItem fileUploadItem = items.get(0); 
			String loadDataDir = AppContextPropertyLoader.properties.getProperty("file.upload.path");
		    
			String fileName = String.format("%s%s", loadDataDir, fileUploadItem.getUfileName());
		    File file = new File(fileName);
	        
            InputStream in = new FileInputStream(file);
            fileUploadItem.setContent(IOUtils.toString(in, "ISO-8859-1"));
            
            List tempList = new ArrayList();
            tempList.add(fileUploadItem);
            
            res.setData(tempList);
		}
		
		return res;
	}
}
