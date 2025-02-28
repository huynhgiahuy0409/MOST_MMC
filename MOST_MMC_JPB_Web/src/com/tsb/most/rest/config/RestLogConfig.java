/**
 * 
 */
package com.tsb.most.rest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;


/**
 * @author simonkang
 *
 */
@Configuration
@EnableAspectJAutoProxy
public class RestLogConfig {
	/**
	 * Aop Config for Userlog Collection
	 * @return
	 */
	
/*	@Bean
	public UserLogCollection userLogCollertion(){
		return new UserLogCollection();
	}*/
	
	@Bean
	public UserLogAspect userLogAspect(){
		
		
		return new UserLogAspect();  
	}

}
