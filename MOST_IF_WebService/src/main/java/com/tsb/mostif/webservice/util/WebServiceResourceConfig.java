package com.tsb.mostif.webservice.util;

import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;

public class WebServiceResourceConfig extends ResourceConfig {
	
	public WebServiceResourceConfig() {
		register(AuthorizationFilter.class);
		register(LoggingFilter.class);
		register(JacksonFeature.class);
		
//		register(LoggingFeature.class);
//        Feature feature = new LoggingFeature(Logger.getLogger("test"));
//		register(feature);
//		property(LoggingFeature.LOGGING_FEATURE_LOGGER_LEVEL_SERVER, "FINEST");
//		property(LoggingFeature.LOGGING_FEATURE_VERBOSITY_SERVER,
//		      LoggingFeature.Verbosity.PAYLOAD_ANY);
		
	}
}

