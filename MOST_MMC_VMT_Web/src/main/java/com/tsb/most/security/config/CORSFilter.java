package com.tsb.most.security.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.log.CommonLogUtil;

//@ WebFilter(asyncSupported = true, urlPatterns = { "/*" })
public class CORSFilter  implements Filter {
    /**
     * Default constructor.
     */
    public CORSFilter() {
        // TODO Auto-generated constructor stub
    }
 
    /**
     * @see Filter#destroy()
     */
    public void destroy() {
        // TODO Auto-generated method stub
    }
 
    /**
     * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
     */
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
            throws IOException, ServletException {
 
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        CommonLogUtil.out("CORSFilter HTTP Request: " + request.getMethod());
        String origin = request.getHeader("Origin");

        if(isValidOrigin(origin)) {
        	((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", origin);
        	((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Credentials", "true");
        }else {
        	((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", "http://localhost:8080");
        }
        // Authorize (allow) all domains to consume the content
        //((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", "http://localhost:1841");
        ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, PUT, POST");
        ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Headers", "Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization");
 
        HttpServletResponse resp = (HttpServletResponse) servletResponse;
 
        // For HTTP OPTIONS verb/method reply with ACCEPTED status code -- per CORS handshake
        if (request.getMethod().equals("OPTIONS")) {
            resp.setStatus(HttpServletResponse.SC_ACCEPTED);
            return;
        }
 
        // pass the request along the filter chain
        chain.doFilter(request, servletResponse);
    }
 
    /**
     * @see Filter#init(FilterConfig)
     */
    public void init(FilterConfig fConfig) throws ServletException {
        // TODO Auto-generated method stub
    }
    
    
    /**
     * 2024.03.18:
     * Robert added check for Origin. Allow with configured list in Properties file:
     * */
    private boolean isValidOrigin(String origin) {
    	String listOrigin = (String)AppContextPropertyLoader.properties.get("list.origin");
    	String[] splitParts = listOrigin.split(",");
    	List<String> urlList = new ArrayList<>(Arrays.asList(splitParts));
        return urlList.contains(origin) ;
    }
}

