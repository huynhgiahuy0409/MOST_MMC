/**
* FILE NAME : RestBaseController.java 
* PACKAGE NAME : com.pcs.rest.base.controller
* Created on   : 2015. 6. 5
*
* ------------------------------------------------------------
* CHANGE REVISION
* ------------------------------------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2015. 6. 5     LUIS             First release.
* ------------------------------------------------------------
* CLASS DESCRIPTION
* CudParm Class(Data Transfer Object for CUD)
* ------------------------------------------------------------
*
* COPYRIGHT (PLUS) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*/

package com.tsb.most.rest.base;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;

import com.tsb.most.framework.bizparm.BaseBizParm;
import com.tsb.most.framework.bizparm.IBaseBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.ExceptionItem;
import com.tsb.most.framework.exception.BaseException;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;
import com.tsb.most.security.config.TokenAuthentication;

/**
 * The Class RestBaseController.
 */
public abstract class RestBaseController {
	private static Logger logger = LoggerFactory.getLogger(RestBaseController.class);

    protected String generateStreamData(String fileName)  throws BizException, IOException {
	    File file = new File(fileName);
	    String result="";
	    
		if(!file.exists()){
			throw new BizException("File not found exception");
		}

		InputStream in = null;
		try{
			in = new FileInputStream(file);
			result = IOUtils.toString(in, "ISO-8859-1");
		}finally{
			if(in != null){
				in.close();
			}
		}
    	
    	return result;
    }
	    
	protected Object invokeService(String serviceID, IBaseBizParm bizParm) {
		Object result = null;
		BaseBizParm baseBizParm = (BaseBizParm) bizParm;
		
		if(baseBizParm.getBranchCode() == null || baseBizParm.getBranchCode().equals("")) {
			TokenAuthentication tokenAuth = (TokenAuthentication)SecurityContextHolder.getContext().getAuthentication();
			if(tokenAuth != null) {
				baseBizParm.setBranchCode(tokenAuth.getBranchCode());
			}else {
				baseBizParm.setBranchCode(AppContextPropertyLoader.properties.get("defaultBranch").toString());
			}
			
		}
		
		ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
		result = serviceProviderPojo.execute(serviceID,baseBizParm);
		
		if(result instanceof ExceptionItem){
			ExceptionItem item = (ExceptionItem)result;
		}	
		return result;
	}
 
    
    protected <T extends DataItem> DataItemList getItems(UpdateBizParm<T> parm) {
	    DataItemList items = new DataItemList();
	    
	    if (parm.getItems() != null && parm.getItems().size() > 0) {
	        for(T item: parm.getItems()){
	            items.add(item);
	        }
	    }
	    else {
	        items.add(parm.getItem());
	    }
	    
	    return items;
	}
    

}