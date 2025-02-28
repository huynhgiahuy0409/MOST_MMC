package com.tsb.most.rest.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.Marshaller;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.ResourceHttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.xml.MarshallingHttpMessageConverter;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.module.jaxb.JaxbAnnotationModule;

@Configuration
@EnableWebMvc
// Brian (need to check what those are,2021/03/12)
//@ImportResource({"classpath*:/pcs/spring/context-datasource.xml",
//				 "classpath*:/pcs/spring/context-scheduling.xml"
//				 })
@ComponentScan(basePackages = {"com.tsb.most.rest","com.tsb.most.service", "com.tsb.most.basebiz.service", "com.tsb.most.basebiz.component","com.tsb.most.biz.rest"},
useDefaultFilters = false, includeFilters = {@Filter(Controller.class), @Filter(ControllerAdvice.class)})
public class RestAppConfig extends WebMvcConfigurerAdapter {
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new RestInterceptor());
	}
	
	@Override
	public void configureMessageConverters(
			List<HttpMessageConverter<?>> converters) {
		
		converters.add(marshallingHttpMessageConverter());
		converters.add(mappingJacksonHttpMessageConverter());
		converters.add(new StringHttpMessageConverter());
		converters.add(new ResourceHttpMessageConverter());
		converters.add(byteArrayHttpMessageConverter());
	}
	
//	@Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/rest/*")
//	        .allowedMethods("PUT", "DELETE", "POST", "GET")
//			.allowCredentials(false).maxAge(3600);;
////        registry.addMapping("/**").allowedOrigins("http://localhost:1841");
//    }
	
	@Override
	public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
		configurer
			/*if there is file extention, use extention. if no, use Java Activation Framework's FileTypeMap.getContentType 
			 * e.g) /codes.xml */
			.useJaf(true)
			.favorPathExtension(true)
			
			/*if there is parameter 'format', then use its mediatype
			 * e.g) /codes?format=xml */
			.favorParameter(true)
			
			/*Use Accept of HTTP Header 
			 * e.g) Accept: application/xml */
			.ignoreAcceptHeader(false)
			
			/*Default*/
			.defaultContentType(MediaType.APPLICATION_JSON)
			
			.mediaType(MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_JSON)
			.mediaType(MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_XML)
			.mediaType(MediaType.APPLICATION_OCTET_STREAM_VALUE, MediaType.APPLICATION_OCTET_STREAM)
			.mediaType(MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_JPEG)
			.mediaType(MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_PNG)
			.mediaType(MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_GIF)
			;
			
	}
	
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/resources/**")
//                .addResourceLocations("/WEB-INF/resources/");
//
//        registry.addResourceHandler("swagger-ui.html")
//                .addResourceLocations("classpath:/META-INF/resources/");
//
//        registry.addResourceHandler("/webjars/**")
//                .addResourceLocations("classpath:/META-INF/resources/webjars/");
//    }
//	
	@Bean
	public MappingJackson2HttpMessageConverter mappingJacksonHttpMessageConverter() {
		MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
		
		ObjectMapper objectMapper = converter.getObjectMapper();
		objectMapper.getFactory().setCharacterEscapes(new HTMLCharacterEscapes());
		objectMapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, true);
		objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
		objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
		
		JaxbAnnotationModule module = new JaxbAnnotationModule();
		objectMapper.registerModule(module);
		
		converter.setPrettyPrint(true);
		return converter;
	}
	
	@Bean
	public MarshallingHttpMessageConverter marshallingHttpMessageConverter() {
		MarshallingHttpMessageConverter converter = new MarshallingHttpMessageConverter();
		converter.setMarshaller(jaxb2Marshaller());
		converter.setUnmarshaller(jaxb2Marshaller());
		return converter;
	}
	
	@Bean
	public Jaxb2Marshaller jaxb2Marshaller() {
		Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
		
		marshaller.setPackagesToScan(new String[] {
				"com.tsb.most.dataitem.*"
		});
		
		Map<String, Object> marshallerProperties = new HashMap<String, Object>();
		marshallerProperties.put(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
		marshaller.setMarshallerProperties(marshallerProperties);
		
		return marshaller;
	}
	
	@Bean
	public ByteArrayHttpMessageConverter byteArrayHttpMessageConverter() {
	    ByteArrayHttpMessageConverter arrayHttpMessageConverter = new ByteArrayHttpMessageConverter();
	    arrayHttpMessageConverter.setSupportedMediaTypes(getSupportedMediaTypes());
	    return arrayHttpMessageConverter;
	}
	
	private List<MediaType> getSupportedMediaTypes() {
	    List<MediaType> list = new ArrayList<MediaType>();
	    list.add(MediaType.IMAGE_JPEG);
	    list.add(MediaType.IMAGE_PNG);
	    list.add(MediaType.APPLICATION_OCTET_STREAM);
	    return list;
	}
	

	/**
	 * <pre>
	 * message source 
	 * ResourceBundlMessageSource - Road one time only / ReloadableResourceBundleMessageSource - for every setCacheSeconds, system refresh resources.
	 * </pre>
	 * @Method Name : messageSource
	 * @date : 2015. 4. 2.
	 * @author : JiHeon
	 * @history 
	 * <pre>
	 * 2014.4.2 - change classpath to filepath for Basename (we can use external file for message resources.)
	 *          - change ResourceBundleMessageSource to ReloadableResourceBundleMessageSource. this is to catch & refresh the changing of resource file.
	 *          - apply J2EE configuration - this configuration maintains all of IP address, filepath and some constants values. - see the J2EE Configuration.
	 * </pre>
	 *	-----------------------------------------------------------------------
	 *	Date			Author			Job History			  
	 *	----------- ------------------- ---------------------------------------
	 *	2015. 4. 2.		JiHeon				First release
	 *	-----------------------------------------------------------------------
	 * 
	 * @return
	 */
	// removed by Brian (2021/03/12)
//	@Bean 
//	public MessageSource messageSource() {
////		PropertyElement element = null;
////		try {
////			element = PropertyHolder.getProderty();
////		} catch (Exception e) {
////			// TODO Auto-generated catch block
////			e.printStackTrace();
////		}
//		
//		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
//		//TODO-DEPLOY : the MesasgeResourcePath should be changed to external side. 
//			//The path was specified as comment block, so just exchange them. the file is config.properties(message.resource.path). 
//			//and then, the messages files should be located at external side which is specified on config.properties(message.resource.path).
//		
//		//messageSource.setBasename(element.getMessageResourcePath());		//from system setting file
//		//messageSource.setDefaultEncoding(element.getMessageResourceEncoding());
//		messageSource.setBasename(System.getProperty("message.resource.path"));		//from system setting file
//		messageSource.setDefaultEncoding(System.getProperty("message.resource.encoding"));
//		
//		messageSource.setUseCodeAsDefaultMessage(true);
//		messageSource.setCacheSeconds(60);	// # -1 : never reload, 0 : always reload, others : wait for seconds then reload if there is some changes on file.
//		return messageSource;
//		
//	}	
}
