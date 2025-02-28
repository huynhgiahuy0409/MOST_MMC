package com.tsb.most.biz.rest.vms;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.tsb.most.basebiz.dataitem.vms.RouteGroupItem;
import com.tsb.most.basebiz.parm.vms.RouteParm;
//import com.pcs.foundation.exception.ServiceException;
//import com.pcs.foundation.rest.exception.ResourceNotFoundException;
import com.tsb.most.framework.exception.ResourceNotFoundException;
//import com.pcs.rest.base.controller.RestBaseController;
//import com.plus.biz.common.PcsProperties;
//import com.plus.foundation.common.RestResponse;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/routes")
public class RouteController extends RestBaseController {
    
    // Route Vessel List
    @RequestMapping(value = "/data", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectPortList(RouteParm parm) throws ServiceException {
    	
    	try {
	    	//해당 디렉토리의 최신 파일을 읽음
	    	String path = ""; //PcsProperties.getProperty("path.route");
			File dir = new File(path);
			
			if(!dir.exists()){
				dir.mkdirs();
			}
			
			File[] contsnts = dir.listFiles();
			
			long date =0;
			int index = 0;
			for(int i=0;i<contsnts.length;i++){
				if(contsnts[i].getName().startsWith("routes")){
					if(date < contsnts[i].lastModified()){
						date = contsnts[i].lastModified();
						index = i;
					}
				}
			}
			
			File f = contsnts[index];
        
			InputStream is =new FileInputStream(f);
			String xml = IOUtils.toString(is);
			
			//Deserialize From XML String
			XmlMapper xmlMapper = new XmlMapper();
			//To prevent unknow element set false.
			xmlMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, true);
			RouteGroupItem routeGroupItem =  xmlMapper.readValue(xml, RouteGroupItem.class);
			
			RestResponse res = new RestResponse();
			res.setData(routeGroupItem.getRouteItem());
			
			return res;
    		
			
		} catch (Exception ex) {
			throw new ResourceNotFoundException();
		}
    }
}   
 