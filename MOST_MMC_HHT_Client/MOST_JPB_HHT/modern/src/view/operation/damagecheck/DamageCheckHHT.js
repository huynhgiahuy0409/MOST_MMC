Ext.define('MOST.view.operation.DamageCheckHHT', {
    extend: 'Ext.Panel',
    alias: 'widget.app-damagecheckhht',

    requires: [
         'MOST.view.controller.DamageCheckHHTController'
        ,'MOST.view.controller.TheListOfDamageCheckOfGCModel'
    ],

    // detailViewAlias: 'app-damagecheckhhtpopup',

    controller: 'damagecheckhht',
    viewModel: {
        type: 'theListOfDamageCheckOfGC'
    },

    listeners: {
		initialize: 'onTblLoad',
    },

    /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refGridDamageCheckHHT',
	MAIN_STORE_NAME: 'tblDamageCheckStore',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

    title: '',
    layout: 'fit',
	shadow: false,
    padding: 5,

    items: [{
        xtype: 'formpanel',
        padding: 0,
        layout: {
			type: 'vbox',
			align: 'stretch'
		},
        items: [{   
            xtype: 'fieldset',  /** Row1 > Buttons */
            layout: {
				type: 'hbox',
				align: 'stretch'
			},
            defaults: {
                xtype: 'button',
                margin: '0 0 0 0',
            },
            items: [{
				reference:'refBtnDamageCheckHHTRetrive',
                text: 'Retrieve',
				handler: 'onTblRetrieve',
				iconCls: 'x-fa fa-search',
				ui: 'retrieve-button-modern',
                width: 150,
            },
            {
                xtype: 'spacer',
                width: 15
            },
            {
				reference:'refBtnDamageCheckHHTAdd',
                text: 'ADD',
				handler: 'onTblAdd',
                ui: 'create-button-modern',
                width: 150,
            },
            {
                xtype: 'spacer',
                width: 15
            },
            {
				reference: 'refBtnDamageCheckHHTUpdate',
				text: 'UPDATE',
				handler: 'onTblUpdate',
				ui: 'update-button-modern',
                width: 150,
			},
            {
                xtype: 'spacer',
                width: 15
            },
            {
				reference: 'refBtnDamageCheckHHTDelete',
				text: 'DELETE',
				handler: 'onTblDelete',
				ui: 'delete-button-modern',
                width: 150,
			}
        ]
        },
        {
            xtype: 'fieldset', /** Row2 > SearchFilters */
            layout: 'vbox',
			defaults: {
				margin: '6 0 0 0'
			},
			items: [{
                xtype: 'container',
                layout: 'hbox',
                defaults: {
					flex: 1,
                    labelAlign: 'left'
                },
                items: [{
                    xtype: 'combobox',  /**  Row2.1 > Master BL */
                    reference: 'refCboMasterBL',
                    label: 'Master B/L',
                    bind: {
                        store: '{tblMasterBlComboStore}',
                        value: '{theSearch.masterBlNo}'
                    },
                    displayField: 'cdNm',
                    valueField: 'cd',
                    queryMode: 'local',
                    clearable: true,
                    typeAhead: true,
                    listeners: {
                        select: 'onTblSelectMfDocIdCombo'
                    }
                },{
                    xtype: 'combobox',  /** Row2.2 > Booking No */
                    reference: 'refCboBookingNo',
                    label: 'Booking No.',
                    bind: {
                        store: '{tblBookingNoComboStore}',
                        value: '{theSearch.bookingNo}'
                    },
                    displayField: 'cdNm',
                    valueField: 'cd',
                    queryMode: 'local',
                    clearable: true,
                    typeAhead: true,
                    listeners: {
                        select: 'onTblSelectMfDocIdCombo'
                    }
                },{
					xtype: 'textfield', /** Row2.3 > UNIT No */
					reference: 'refTxtUnitNo',
                    label: 'UNIT No.',
					bind: {
						value: '{theSearch.unitNo}'
					}
				}]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                defaults: {
					flex: 1,
                    labelAlign: 'left'
                },
                items: [{
                    xtype: 'combobox',  /** Row3.1 > Sub BL */
                    reference: 'refCboSubBL',
                    label: 'Sub No.',
                    bind: {
                        store: '{tblBlComboStore}',
                        value: '{theSearch.blNo}'
                    },
                    displayField: 'cdNm',
                    valueField: 'cd',
                    queryMode: 'local',
                    clearable: true,
                    typeAhead: true,
                },{
                    xtype: 'combobox',  /** Row3.2 > Shipping Note */
                    reference: 'refCboSN',
                    label: 'SN',
                    bind: {
                        store: '{tblSnComboStore}',
                        value: '{theSearch.snNo}'
                    },
                    displayField: 'cdNm',
                    valueField: 'cd',
                    queryMode: 'local',
                    clearable: true,
                    typeAhead: true,
                },{
                    xtype: 'spacer',
                }]
            }]
        },
        {//GRID
			xtype: 'container',
			layout: 'hbox',
			scrollable: true,
			flex: 1,
			items: [{
                xtype: 'grid',
                reference: 'refGridDamageCheckHHT',
                bind: {
                    store: '{tblDamageCheckStore}'
                },
                columns: [{
                        xtype: 'rownumberer',
                        text: 'No.',
                        width: 50,
                    },
                    {
                        text: 'Vessel Call ID',
                        dataIndex: 'vslCallId',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: {type: 'bundle', key: 'catgCd'},
                        dataIndex: 'catgNm',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Master BL/Booking No.',
                        dataIndex: 'mfDocId',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Sub BL/SN',
                        dataIndex: 'cgNo',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Unit No.',
                        dataIndex: 'unitNo',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Damage Qty',
                        dataIndex: 'dmgQty',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Damage MT',
                        dataIndex: 'dmgMt',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Damage M3',
                        dataIndex: 'dmgM3',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Check Time',
                        dataIndex: 'checkedDt',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Check Location',
                        dataIndex: 'locCd',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Damage Parts',
                        dataIndex: 'dmgPartNm',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Damage Level',
                        dataIndex: 'dmgLevelNm',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Damage Desc',
                        dataIndex: 'dmgDescNm',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Remark',
                        dataIndex: 'remark',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'File Attachment',
                        dataIndex: 'fileCount',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Shipping Agent',
                        dataIndex: 'shaNm',
                        filter: 'string',
                        width: 250,
                    },
                    {
                        text: 'Forwarding Agent',
                        dataIndex: 'fwdNm',
                        filter: 'string',
                        width: 250,
                    },
                    {
                        text: 'Shipper/Consignee',
                        dataIndex: 'cnsneNm',
                        filter: 'string',
                        width: 250,
                    },
                    {
                        text: 'Cargo Type',
                        dataIndex: 'cgTpNm',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Commodity Group',
                        dataIndex: 'cmdtGrpNm',
                        filter: 'string',
                        width: 200,
                    },
                    {
                        text: 'Commodity',
                        dataIndex: 'cmdtNm',
                        filter: 'string',
                        width: 200,
                    },
                    {
                        text: 'Package Type',
                        dataIndex: 'pkgTpNm',
                        filter: 'string',
                        width: 200,
                    },
                    {
                        text: 'Brand',
                        dataIndex: 'brandCd',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Model',
                        dataIndex: 'modelCd',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Marks & Nos',
                        dataIndex: 'marksNo',
                        filter: 'string',
                        width: 200,
                    },
                    {
                        text: 'Description of Goods',
                        dataIndex: 'descGoods',
                        filter: 'string',
                        width: 200,
                    },
                    {
                        text: 'Created By',
                        dataIndex: 'createBy',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Created Date/Time',
                        dataIndex: 'createDt',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Updated By',
                        dataIndex: 'updateBy',
                        filter: 'string',
                        width: 150,
                    },
                    {
                        text: 'Updated Date/Time',
                        dataIndex: 'updateDt',
                        filter: 'string',
                        width: 150,
                    },
                ]
            }]
        }
    ]
    }]
});