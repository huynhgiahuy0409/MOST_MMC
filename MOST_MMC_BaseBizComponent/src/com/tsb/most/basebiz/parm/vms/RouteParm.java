package com.tsb.most.basebiz.parm.vms;
//import com.pcs.foundation.bizparm.Parm;
import com.tsb.most.framework.bizparm.BaseBizParm;

public class RouteParm extends BaseBizParm {
    
	private static final long serialVersionUID = 1L;
	
	private String portCode;
    private String routeCode;
    private String portVesselCode;
    
    public String getRouteCode() {
        return routeCode;
    }

    public void setRouteCode(String routeCode) {
        this.routeCode = routeCode;
    }

    public String getPortCode() {
        return portCode;
    }

    public void setPortCode(String portCode) {
        this.portCode = portCode;
    }

    public String getPortVesselCode() {
        return portVesselCode;
    }
    
    public void setPortVesselCode(String portVesselCode) {
        this.portVesselCode = portVesselCode;
    }
  
}