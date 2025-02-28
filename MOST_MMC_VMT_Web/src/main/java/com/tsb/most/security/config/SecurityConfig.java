package com.tsb.most.security.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.InvalidCsrfTokenException;
import org.springframework.security.web.csrf.MissingCsrfTokenException;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.bind.ServletRequestUtils;

import com.tsb.most.framework.log.CommonLogUtil;

@Configuration
@EnableWebSecurity
@ComponentScan("com.tsb.most.security.config")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	PreflightCorsFilter preflightCorsFilter;
	
	@Autowired
	AuthenticationTokenFilter authenticationTokenFilter;
	
	@Autowired
	TokenAuthenticationProvider tokenAuthenticationProvider;

	@Autowired
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.formLogin()
		        .loginPage("/index.jsp") 
		        .loginProcessingUrl("/common/login-proc")
		        .failureUrl("/index.jsp") 
		        .defaultSuccessUrl("/loginsuccess.html")				// DeskTop 메인페이지: Jsp
		        .usernameParameter("username")
		        .passwordParameter("password")
		        .permitAll();
		
		http.logout()
        .logoutUrl("/common/logout-proc") // default
        .logoutSuccessUrl("/index.jsp")
        .clearAuthentication(true)
        .permitAll();
		
		http.headers().frameOptions().disable();
		
		http
        .addFilterBefore(preflightCorsFilter, BasicAuthenticationFilter.class)
	        .antMatcher("/rest/**")
        .addFilterBefore(preflightCorsFilter, BasicAuthenticationFilter.class)
	        .antMatcher("/direct/**")
		.addFilterBefore(preflightCorsFilter, BasicAuthenticationFilter.class)
	        .antMatcher("/exported_excel_file/**")	
        .addFilterBefore(authenticationTokenFilter, BasicAuthenticationFilter.class)
           // .antMatcher("/**") - to call the JSP page for PDF Servlet (2021/04/22)
        	.antMatcher("/rest/v1/**")
        .authenticationProvider(tokenAuthenticationProvider);
		
      http.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint) 
		.accessDeniedPage("/common/error") 
		.accessDeniedHandler(new AccessDeniedHandler() { 
			@Override 
			public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException exception) throws IOException, ServletException {
				CommonLogUtil.debug("*** >>> AccessDeniedHandler <<< ***");
				String _csrf = ServletRequestUtils.getStringParameter(request, "_csrf", "");
				
				if (exception instanceof MissingCsrfTokenException) { 
					//Some Exception Handling 
					CommonLogUtil.debug("*** >>> MissingCsrfTokenException <<< ***: _csrf = " + _csrf);
				} else if (exception instanceof InvalidCsrfTokenException) { 
					//Some Exception Handling 
					CommonLogUtil.debug("*** >>> InvalidCsrfTokenException <<< ***: _csrf = " + _csrf);
				}
			}
		}).and()
      .sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    	.and()
    	.authorizeRequests() //permission all 
        	.antMatchers("/ws/**","/**", "/css/**", "/img/**", "/index.jsp", "/common/**", "/index.html", "/sample/**", "/js/**", "/indexYT.jsp", "/indexYTmain.jsp", "/redirect.jsp","/direct/**", "/httpTest", "/equipment/**", "/webjars/**","/ws/**", "/yt/**","/rest/auth/**", "/rest/oauth2/**", "/rest/v2/**", "/rest/policy/**").permitAll()
            .anyRequest().authenticated()
            .and()
       .csrf().requireCsrfProtectionMatcher(new AntPathRequestMatcher("/rest/**")).disable();
	}
	
//	@Bean
//	CorsConfigurationSource corsConfigurationSource() {
//		CorsConfiguration configuration = new CorsConfiguration();
//		configuration.setAllowedOrigins(Arrays.asList("http://localhost:1841"));
//		configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE"));
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", configuration);
//		return source;
//	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/rest/auth/**", "/rest/oauth2/**", "/rest/v2/**");
		web.ignoring().antMatchers("/exported_edi_file/**");
		web.ignoring().antMatchers("/classic/**");
		web.ignoring().antMatchers("/modern/**");
		web.ignoring().antMatchers("/resources/**");
		web.ignoring().antMatchers("/cache.appcache");
		web.ignoring().antMatchers("/modern.json");
		web.ignoring().antMatchers("/modern.jsonp");
		web.ignoring().antMatchers("/classic.json");
		web.ignoring().antMatchers("/classic.jsonp");
		web.ignoring().antMatchers("/framework.js");
		web.ignoring().antMatchers("/index.html");
		web.ignoring().antMatchers("/login.html");
		web.ignoring().antMatchers("/rest/v1/identities/users/regitrationconfirm");
		web.ignoring().antMatchers("/rest/v1/identities/users/activeuser");
//		web.ignoring().antMatchers("/swagger-ui.html","/webjars/**","/swagger-resources/**");
    }
}