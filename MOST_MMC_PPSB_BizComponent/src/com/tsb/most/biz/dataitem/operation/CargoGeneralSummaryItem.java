package com.tsb.most.biz.dataitem.operation;

import com.tsb.most.framework.dataitem.DataItem;

public class CargoGeneralSummaryItem extends DataItem {
    
    private String type;
    private String sumQty;
    private String sumWgt;
    private String sumM3;

    public String getSumM3() {
        return sumM3;
    }
    public void setSumM3(String sumM3) {
        this.sumM3 = sumM3;
    }
    public String getSumQty() {
        return sumQty;
    }
    public void setSumQty(String sumQty) {
        this.sumQty = sumQty;
    }
    public String getSumWgt() {
        return sumWgt;
    }
    public void setSumWgt(String sumWgt) {
        this.sumWgt = sumWgt;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
}
