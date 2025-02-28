package com.tsb.most.basebiz.dataitem.vms;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

public class RoutePositionGroup {
	
	@JacksonXmlProperty(localName="count", isAttribute = true)
	private String count;
	
    @JacksonXmlElementWrapper(useWrapping = false) 
	@JacksonXmlProperty(localName="Position")
	private List<RoutePositionItem> routePosition = new ArrayList<RoutePositionItem>();

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public List<RoutePositionItem> getRoutePosition() {
		return routePosition;
	}

	public void setRoutePosition(List<RoutePositionItem> routePosition) {
		this.routePosition = routePosition;
	}
	
	
}
