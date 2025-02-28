package com.tsb.most.basebiz.dataitem.vms;
import java.util.Date;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class PortItem extends DataItem{
    
//  common use
    private String portType;
    private String portCode;
    private String longitude;
    private String latitude;
    
//  port list use
    private String routeCode;
    private String portSeq;
    private String portName;
    private String timeZone;
    private String areaCode;
    
//  port Detail Use
    private String portVesselCode;
    private String portVesselName;
    private String portVesselVoy;
    private String portVesselQty;
    private String portCargoCode;
    private String portCargoName;
    private String pidCode;
    private String codeName;
    private String etaDtm;
    private String etbDtm;
    private String etdDtm;
    
// port addition field
    private String bunkerport;
    private String tag;
    private Date portDate;
    private String status;
    private String winDayQty;
    
    
    public String getPortCode() {
        return portCode;
    }
    public void setPortCode(String portCode) {
        this.portCode = portCode;
    }
    public String getLongitude() {
        return longitude;
    }
    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }
    public String getLatitude() {
        return latitude;
    }
    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }
    public String getRouteCode() {
        return routeCode;
    }
    public void setRouteCode(String routeCode) {
        this.routeCode = routeCode;
    }
    public String getPortSeq() {
        return portSeq;
    }
    public void setPortSeq(String portSeq) {
        this.portSeq = portSeq;
    }
    public String getPortName() {
        return portName;
    }
    public void setPortName(String portName) {
        this.portName = portName;
    }
    public String getTimeZone() {
        return timeZone;
    }
    public void setTimeZone(String timeZone) {
        this.timeZone = timeZone;
    }
    public String getAreaCode() {
        return areaCode;
    }
    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }
    public String getPortVesselCode() {
        return portVesselCode;
    }
    public void setPortVesselCode(String portVesselCode) {
        this.portVesselCode = portVesselCode;
    }
    public String getPortVesselName() {
        return portVesselName;
    }
    public void setPortVesselName(String portVesselName) {
        this.portVesselName = portVesselName;
    }
    public String getPortVesselVoy() {
        return portVesselVoy;
    }
    public void setPortVesselVoy(String portVesselVoy) {
        this.portVesselVoy = portVesselVoy;
    }
    public String getPortVesselQty() {
        return portVesselQty;
    }
    public void setPortVesselQty(String portVesselQty) {
        this.portVesselQty = portVesselQty;
    }
    public String getPortCargoCode() {
        return portCargoCode;
    }
    public void setPortCargoCode(String portCargoCode) {
        this.portCargoCode = portCargoCode;
    }
    public String getPortCargoName() {
        return portCargoName;
    }
    public void setPortCargoName(String portCargoName) {
        this.portCargoName = portCargoName;
    }
    public String getPidCode() {
        return pidCode;
    }
    public void setPidCode(String pidCode) {
        this.pidCode = pidCode;
    }
    public String getCodeName() {
        return codeName;
    }
    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }
    public String getEtaDtm() {
        return etaDtm;
    }
    public void setEtaDtm(String etaDtm) {
        this.etaDtm = etaDtm;
    }
    public String getEtbDtm() {
        return etbDtm;
    }
    public void setEtbDtm(String etbDtm) {
        this.etbDtm = etbDtm;
    }
    public String getEtdDtm() {
        return etdDtm;
    }
    public void setEtdDtm(String etdDtm) {
        this.etdDtm = etdDtm;
    }
    public String getPortType() {
        return portType;
    }
    public void setPortType(String portType) {
        this.portType = portType;
    }
	public String getBunkerport() {
		return bunkerport;
	}
	public void setBunkerport(String bunkerport) {
		this.bunkerport = bunkerport;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getWinDayQty() {
		return winDayQty;
	}
	public void setWinDayQty(String winDayQty) {
		this.winDayQty = winDayQty;
	}
    public Date getPortDate() {
        return portDate;
    }
    public void setPortDate(Date portDate) {
        this.portDate = portDate;
    }
    
}