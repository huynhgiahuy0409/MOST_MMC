/**
* IoTOS.java
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

package com.tsb.most.websocket.config;
	
/**
 * IoTOS.java
 * Description: 
 * @since 2019. 10. 7.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *  2019. 10. 7.  이승일(SteveLee)          최초 생성
 *  
 *   Web Service 상수값 정의 관리
 *  
 * </pre>
 */

public interface IWeb {

	// TODO:
	
	public final static String CSRF_ID			= "_csrf";
	public final static String REF_URL			= "referer";
	
	public final static String MSG_ERR_MSG = "err.msg";			// 오류 메시지 직접 표시용
	public final static String MSG_ERR_C3IT_MSG = "err.req.c3it"; // C3IT 에러 메세지 
	
	
	// WebSocket-Topic: 메시지 BroadCasting
	public final static String WEB_SOCKET_CONNECT		= "/ws/connect-websocket";	// WebSocket 접속 주소
	public final static String WEB_SOCKET_TOPIC_URL		= "/ws/topic";		// Topic URL 시작
	public final static String WEB_SOCKET_PUB_URL		= "/ws/pub";		// Topic URL 시작
	public final static String WEB_SOCKET_TOPIC_ALL		= "/ws/topic/all";	// Default Topic
	
}
