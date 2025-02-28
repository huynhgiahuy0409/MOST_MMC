/**
* CommonController.java
*
* (C) 2019 TotalSoftBank. All Rights Reserved.
*
* These source codes contain the ideas, concepts, know-how and technology, 
* which are proprietary and confidential to TotalSoftBank.
* These source codes are protected by copyright law and other applicable law.
* You are prohibited to copy, modify, distribute, assign, and/or publicly display
* these source codes without obtaining prior written approval of TotalSoftBank.
* Nothing shall be construed to license any copyright, patent, trademark or other
* intellectual property rights in these source codes.
*
*/

package com.tsb.most.rest.common;

import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.log.CommonLogUtil;
import com.tsb.most.rest.base.RestBaseController;


@Controller
public class CommonController extends RestBaseController {
	
	private static SimpleDateFormat formatterDateTime;
	
	public CommonController() {
		formatterDateTime = new SimpleDateFormat("yyyy-MM-dd-HH:mm:ss.SSS", Locale.UK);
	}
	
	 /**
	 * 이승일(2021. 2. 19.): 접속자 분산 서버로 포워딩 (SteveLee)
	 * 접속요청 > 접최대 접속(로그인)목록 확인 > 분산여부 체크 > 분산(포워딩) 처리
	 * @param locale
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/ytMain")
	public String main(HttpServletRequest request, Model model) {
		
		String uRedirected = ServletRequestUtils.getStringParameter(request, "redirected", "N");	// 리다이렉트 체크
		
		model.addAttribute("useLiftOff", AppContextPropertyLoader.properties.get("yt.server.client.useLiftOff"));		//LiftOff Button 사용여부
		model.addAttribute("useStoppage", AppContextPropertyLoader.properties.get("yt.server.client.useStoppage"));	//Stoppage Button 사용여부
		
		boolean clientFowradYn = Boolean.getBoolean((String) AppContextPropertyLoader.properties.get("yt.server.client.forward"));
		// 클라이언트 분산처리 포워딩 처리
		if(clientFowradYn) {
			if(uRedirected != null && uRedirected.equals("Y")) {
				return "forward:/" + AppContextPropertyLoader.properties.get("yt.server.client.mainpage");
			} else {
//				int currentLoginSize = ytService.getClientLoginSize();
//				int currentLoginSize = 0;
//				CommonLogUtil.debug("* currentLoginSize = " + currentLoginSize + ", maxClient = " + maxClient);
//				
//				if(currentLoginSize >= maxClient) {
//					if(this.isAlive(redirectServerUrl, 1000)) {								// 포워딩 Server 접속 체크
//						CommonLogUtil.debug("* redirectServerUrl >>> " + redirectServerUrl);
//						model.addAttribute("redirectUrl", redirectServerUrl + "/ytMain");		// 포워딩 URL
//						return "forward:/redirect.jsp";
//					}
//				}
			} 
		}
		
		return "forward:/" + AppContextPropertyLoader.properties.get("yt.server.client.mainpage");
	}
	
	 /**
	 * 이승일(2021. 2. 23.): 포워딩 서버 접속 가능여부 확인
	 * @param returnUrl
	 * @return
	 */
	public boolean isAlive(String returnUrl, int pTimeOut) {
		boolean rtnValue = false;
		
		try {
			URL url = new URL(returnUrl);
			HttpURLConnection connection = (HttpURLConnection)url.openConnection();
			connection.setRequestMethod("GET");
			connection.setConnectTimeout(pTimeOut);
			connection.connect();

			int code = connection.getResponseCode();
			connection.disconnect();
			
			// logger.debug("* ytMain(): " + returnUrl + ", getResponseCode() = " + code);
			
			if(code == 200) {	// 연결성공(200)
				rtnValue = true;
			}
			
		} catch (Exception e) {
			// e.printStackTrace();
			CommonLogUtil.debug("* Redirect-Server isAlive = false > " + returnUrl);
		}
		
		return rtnValue;
	}

	@RequestMapping("/httpTest")
	@ResponseBody
	public String httpTest(HttpServletRequest request, Model model) {
		StringBuffer rtnValue = new StringBuffer();
		rtnValue.append("* [Start]: " + this.getCurDateTime());
		long ssTime = System.currentTimeMillis();

		String reUrl = ServletRequestUtils.getStringParameter(request, "url", "N");
		rtnValue.append(" > Url = http://" + reUrl);
		
		if(this.isAlive("http://" + reUrl, 60000)) {	// 최대 60초 대기
			long eeTime = System.currentTimeMillis();
			double ttTime = (eeTime - ssTime) /1000;
			rtnValue.append(" >> Success = " + String.format("%.2f", ttTime)).append("(초)");	
		} else {
			long eeTime = System.currentTimeMillis();
			double ttTime = (eeTime - ssTime) /1000;
			rtnValue.append(" >> False = " + String.format("%.2f", ttTime)).append("(초)");
		}
		
		return rtnValue.toString();
	}
	
	public static String getCurDateTime() {
        return formatterDateTime.format(new Date());
    }
}
