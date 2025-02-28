package com.tsb.most.websocket.config;



import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

import com.tsb.most.framework.config.AppContextPropertyLoader;

@Configuration
@EnableWebSocketMessageBroker
@ComponentScan("com.tsb.most.websocket.config")
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker(IWeb.WEB_SOCKET_TOPIC_URL); // Topic 주소: Broadcast용
		config.setApplicationDestinationPrefixes(IWeb.WEB_SOCKET_PUB_URL); // Publish 주소 Prefix
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		String listOrigin = (String)AppContextPropertyLoader.properties.get("list.origin");
    	String[] splitParts = listOrigin.split(",");
		//registry.addEndpoint(IWeb.WEB_SOCKET_CONNECT).withSockJS();
		registry.addEndpoint(IWeb.WEB_SOCKET_CONNECT).setAllowedOrigins(splitParts).withSockJS(); // WebSocket 접속 URL: Allowed Origins 추가
	}

	@Bean
	public ServletServerContainerFactoryBean createWebSocketContainer() {
		ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
		container.setMaxSessionIdleTimeout((long) 30000); // 5분
		return container;
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration registration) {
		registration.interceptors(webSocketHandler());
	}

	@Bean
	public WebSocketHandler webSocketHandler() {
		return new WebSocketHandler();
	}
}
