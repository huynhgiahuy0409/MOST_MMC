package com.tsb.most.biz.rest.vms;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

//import com.pcs.foundation.log.ILogger;
//import com.pcs.foundation.log.LoggingService;
//import com.pcs.rest.base.controller.RestBaseController;
//import com.plus.biz.common.PcsProperties;

import com.tsb.most.rest.base.RestBaseController;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.exception.ServiceException;

@Controller
@RequestMapping("/file")
public class FileController extends RestBaseController {
	
	@RequestMapping(value = "/vessels/images/{id}", method = RequestMethod.GET)
	@ResponseBody
	public byte[] getVesselImageAsByteArray(@PathVariable("id") String id) throws ServiceException, Exception {
	    
	    //String imageDir = PcsProperties.getProperty("image.vessel");
	    String imageDir = AppContextPropertyLoader.properties.getProperty("file.upload.path");	 
	    
	    File dir = new File(imageDir);
	    File[] files = dir.listFiles();
        
        int index = -1;
        for(int i=0;i<files.length;i++){
            if(FilenameUtils.getBaseName(files[i].getName()).equals(id)){
                index = i;
                break;
            }
        }
        
        if(index > -1) {
            File imageFile = files[index];
            InputStream in = new FileInputStream(imageFile);
            
            return IOUtils.toByteArray(in);
        } else {
            return "".getBytes();
        }
	}
}
