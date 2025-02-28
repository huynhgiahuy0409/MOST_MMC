package com.tsb.most.rest.common;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.api.client.auth.oauth2.TokenResponseException;
import com.tsb.most.basebiz.dataitem.auth.CredentialItem;
import com.tsb.most.basebiz.dataitem.parameters.ParameterSettingItem;
import com.tsb.most.basebiz.parm.user.UserInfoParm;
import com.tsb.most.common.service.CacheService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CacheServiceConstants;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/auth")
public class AuthController extends RestBaseController{

    @RequestMapping(value = "/token", method = RequestMethod.POST)
    @ResponseBody
    public RestResponse createToken(@RequestBody CredentialItem item) throws ServiceException, Exception {
    	InsertItemsBizParm param = new InsertItemsBizParm();
    	RestResponse res = new RestResponse();
    	
    	List<CredentialItem> items = new ArrayList<CredentialItem>();
    	
    	param.setBranchCode(item.getBranchCode());
    	param.setDataItem(item);
		
    	CredentialItem result = (CredentialItem)invokeService("MOST.authentication.executeTokenCredential",param);
    	
    	//PARAMETTER SETTINGS
    	ParameterSettingItem settingItem = CacheService.getInstance().getParameterSettingItem(CacheServiceConstants.CUSTOM_HOLD_CHK);
    	item.setCustomHoldChk(settingItem.getSettingChk());
    	
    	settingItem = CacheService.getInstance().getParameterSettingItem(CacheServiceConstants.TMNL_HOLD_CHK);
    	item.setTmnlHoldChk(settingItem.getSettingChk());
    	
    	items.add(result);
    	
		res.setData(items);
		
		return res;
    }
    
    @RequestMapping(value = "/newtoken", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse createNewTokenByRefreshToken(@RequestBody CredentialItem item) throws ServiceException, Exception {
    	UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		List<CredentialItem> items = new ArrayList<CredentialItem>();
		
		updateParm.setBranchCode(item.getBranchCode());
		updateParm.setDataItem(item);
		
		CredentialItem result = (CredentialItem)invokeService("MOST.authentication.executeNewTokenCredential",updateParm);
    	items.add(result);
    	
		res.setData(items);
		
		return res;
    }
    
    //added by Brian (to check for session time out) 2019.11.07
    @RequestMapping(value = "/checkSession", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse monitoringTokenSessionTime(@RequestBody CredentialItem item) throws TokenResponseException, IOException, Exception {
    	UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		List<CredentialItem> items = new ArrayList<CredentialItem>();
		
		updateParm.setBranchCode(item.getBranchCode());
		updateParm.setDataItem(item);
		
		CredentialItem result = (CredentialItem)invokeService("MOST.authentication.monitoringTokenSessionTime",updateParm);

		//PARAMETTER SETTINGS
    	ParameterSettingItem settingItem = CacheService.getInstance().getParameterSettingItem(CacheServiceConstants.CUSTOM_HOLD_CHK);
    	result.setCustomHoldChk(settingItem.getSettingChk());
    	
    	settingItem = CacheService.getInstance().getParameterSettingItem(CacheServiceConstants.TMNL_HOLD_CHK);
    	result.setTmnlHoldChk(settingItem.getSettingChk());
		
		items.add(result);
    	
		res.setData(items);
		
		return res;
    	
    }
    
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
	@ResponseBody
	public void logout(@RequestBody CredentialItem item) throws ServiceException, Exception {
    	DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
    	
    	deleteParm.setBranchCode(item.getBranchCode());
    	deleteParm.setDataItem(item);
    	
    	invokeService("MOST.authentication.deleteToken",deleteParm);
    	
	}
    
	@RequestMapping(value = "/findPassword", method = RequestMethod.POST)
	@ResponseBody
	public void findPassword(HttpServletRequest request, @RequestBody UserInfoParm parm) throws ServiceException, Exception{
		
		invokeService("MOST.user.updateRecoveryPassword", parm);
	}
    
	@RequestMapping(value = "/accessfail", method = RequestMethod.POST)
	@ResponseBody
	public void accessfail(@RequestBody CredentialItem item) throws ServiceException, Exception {
		InsertItemsBizParm param = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		List<CredentialItem> items = new ArrayList<CredentialItem>();
		
		param.setBranchCode(item.getBranchCode());
		param.setDataItem(item);
		
		invokeService("MOST.authentication.executeAccessFailLog",param);
	}
}