package com.tsb.most.basebiz.dataitem.vms;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

@JacksonXmlRootElement(localName="Routes")
public class RouteGroupItem implements Serializable{
    
	private static final long serialVersionUID = -7690578135829327008L;

	@JacksonXmlProperty(localName="generatedDate", isAttribute = true)
    private String generatedDate;	
	
	@JacksonXmlProperty(localName="routeCount", isAttribute = true)
    private String routeCount;
    
    @JacksonXmlElementWrapper(useWrapping = false) 
	@JacksonXmlProperty(localName="Route")
	private List<RouteItem> routeItem = new ArrayList<RouteItem>();

	public String getGeneratedDate() {
		return generatedDate;
	}

	public void setGeneratedDate(String generatedDate) {
		this.generatedDate = generatedDate;
	}

	public String getRouteCount() {
		return routeCount;
	}

	public void setRouteCount(String routeCount) {
		this.routeCount = routeCount;
	}

	public List<RouteItem> getRouteItem() {
		return routeItem;
	}

	public void setRouteItem(List<RouteItem> routeItem) {
		this.routeItem = routeItem;
	}

   
}