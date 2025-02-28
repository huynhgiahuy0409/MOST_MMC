package com.tsb.mostif.webservice.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.ServletException;

import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

import com.tsb.most.common.service.CacheService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.config.WebAppContextManager;
import com.tsb.most.framework.dataitem.ComboItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.ListCacheItem;
import com.tsb.most.framework.server.ServerInformation;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;
import com.tsb.most.framework.servlet.StartupServlet;

public class MOSTIFStartupServlet extends StartupServlet {
	
	private static final long serialVersionUID = 1L;
	
	public MOSTIFStartupServlet() {
		super();
	}

	public void init() throws ServletException {
		setLog4jConfigurationFile("logback_mostif.xml");
		super.init();
		WebAppContextManager.getApplicationContext(this.getServletContext());
		loadLocalCacheInfo();
	}

	
	private void loadLocalCacheInfo(){
		String localCacheInfoPropPath = "";
		localCacheInfoPropPath = CONF_ROOT_PATH + "/localCache/"
				+ this.getInitParameter("ws_cacheservice_config_filename");
		
		InputStream ios = null;

		ios = getServletContext().getResourceAsStream("/" + localCacheInfoPropPath);
		
		DataItemList cacheItems = parseCacheXMLList(ios);
		CacheService.getInstance().setCacheItems(cacheItems);	
	}
	
	
	public DataItemList parseCacheXMLList(InputStream ios) {

		DataItemList items = new DataItemList();

		try {
			SAXBuilder oBuilder = new SAXBuilder();
			Document oDoc = oBuilder.build(ios);

			Element xmlRoot = oDoc.getRootElement(); // root element
			List<?> trackListList = xmlRoot.getChildren(); // root element ->
															// List

			Element trackListEle = null; // trackList
			for (int i = 0; i < trackListList.size(); i++) { // trackList
				trackListEle = (Element) trackListList.get(i);

				ListCacheItem listCacheItem = new ListCacheItem();

				List<?> attList = trackListEle.getAttributes();
				for (int j = 0; j < attList.size(); j++) { // track
					Attribute attribute = (Attribute) attList.get(j);

					listCacheItem.setKey(attribute.getValue());
				}

				DataItemList comboItemList = new DataItemList();

				List<?> elementList = trackListEle.getContent();
				for (int j = 0; j < elementList.size(); j++) {
					if (elementList.get(j) instanceof Element) {
						ComboItem comboItem = new ComboItem();

						Element element = (Element) elementList.get(j);
						List<?> subAttList = element.getAttributes();
						for (int k = 0; k < subAttList.size(); k++) {
							Attribute attribute = (Attribute) subAttList.get(k);

							if (attribute.getName().equals("key")) {
								comboItem.setKey(attribute.getValue());
							} else if (attribute.getName().equals("value")) {
								comboItem.setValue(attribute.getValue());
							}
						}

						comboItemList.add(comboItem);
					}
				}

				listCacheItem.setDataItemList(comboItemList);
				items.add(listCacheItem);
			}
		} catch (JDOMException je) {
			je.printStackTrace();
		} catch (IOException io) {
			io.printStackTrace();
		}

		return items;
	}

}