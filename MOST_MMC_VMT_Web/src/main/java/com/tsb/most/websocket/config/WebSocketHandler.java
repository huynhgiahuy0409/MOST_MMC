package com.tsb.most.websocket.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;

import com.tsb.most.framework.log.CommonLogUtil;
import com.tsb.most.rest.common.YardTractorController;



public class WebSocketHandler implements ChannelInterceptor {
	//private Logger logger = LoggerFactory.getLogger(getClass());

/*	
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		MessageHeaders headers = message.getHeaders();
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		
		MultiValueMap<String, String> multiValueMap = headers.get(StompHeaderAccessor.NATIVE_HEADERS, MultiValueMap.class);
		for(Map.Entry<String, List<String>> head : multiValueMap.entrySet()) {
			System.out.println(head.getKey() + "#" + head.getValue());
		}
		return message;
	}
*/	

	@Override
	public void postSend(Message<?> message, MessageChannel channel, boolean sent) {
    	String userId = null;			// 로그인아이디
    	String userPwd = null;			// 비번
    	String equNo = null;			// 장비번호
    	
    	try {
			MessageHeaders headers = message.getHeaders();
			
			StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
			String sessionId = accessor.getSessionId();
			
			switch (accessor.getCommand()) {
			    case CONNECT:
			        // Websocket.connect() 요청시 이벤트/호출
			    	userId = (String)(accessor.getNativeHeader("userid") == null ? null : accessor.getNativeHeader("userid").get(0));			
			    	userPwd = (String)(accessor.getNativeHeader("pwcode") == null ? null : accessor.getNativeHeader("pwcode").get(0));
			    	equNo = (String)(accessor.getNativeHeader("equno") == null ? null : accessor.getNativeHeader("equno").get(0));
			    	// CommonLogUtil.out("############################################ [WebSocketHandler]: * Websocket.Connect(!!!); userid = "+ userId + ", userPwd=" + userPwd + ", EquNo = " + equNo);
			    	
			    	if(userId != null && equNo != null) {
			    		// 연결 확인처리
			    		//if(yardTractorController != null) {
			    			//Modified by MS.Kim (2022.11.13) [EGMPT] 134419: C21 요청 2번->1번
//			    			yardTractorController.webSocketConnect(userId, userPwd, equNo);
			    		//} else {
			    			CommonLogUtil.out("############################################ [WebSocketHandler]: Error yardTractorController is Null!!! ");
			    		//}
			    	}
			    	
			        break;
			    case DISCONNECT:
			        // Websocket의 disconnect() 호출(페이지 이동~ 브라우저 닫기) 이벤트/호출 (F5 -> Disconnect -> Connect 호출됨)
			    	userId = (String)(accessor.getNativeHeader("userid") == null ? null : accessor.getNativeHeader("userid").get(0));			
			    	userPwd = (String)(accessor.getNativeHeader("pwcode") == null ? null : accessor.getNativeHeader("pwcode").get(0));
			    	equNo = (String)(accessor.getNativeHeader("equno") == null ? null : accessor.getNativeHeader("equno").get(0));
			    	
			    	CommonLogUtil.out("############################################ [WebSocketHandler]: * Websocket.Disconnect(!!!); userid = "+ userId + ", userPwd=" + userPwd + ", EquNo = " + equNo);

			    	if(userId != null && equNo != null) {
			    		// 연결 해지처리
			    		//if(yardTractorController != null) {
			    		//	yardTractorController.webSocketConnectClose(userId, equNo);
			    		//} else {
			    			CommonLogUtil.out("############################################ [WebSocketHandler]: Error yardTractorController is Null!!! ");
			    		//}
			    	}
			    	
			        break;
			    
			    case SEND:
		    		// TODO
			    	CommonLogUtil.out("############################################ [WebSocketHandler]: accessor.getCommand() = SEND ");
			    	break;
			    case ABORT:
			    		// TODO
			    	CommonLogUtil.out("############################################ [WebSocketHandler]: Error yardTractorController is Null!!! ");
			    	break;
			    
			    default:
			        break;
			}
		} catch (Exception e) {
			CommonLogUtil.out("############################################ [WebSocketHandler]: Error " + e.getMessage());
			e.printStackTrace();
		}
		
	}

}
