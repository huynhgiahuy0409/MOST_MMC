Ext.define('MOST.view.main.BadgeText', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.badgetext',

    disableBg: '',
    enableBg: '#ff0000',
    textSize: 9,
    textColor: '#fff',
    defaultText: '&#160;',
    disableOpacity: 0,
    align: 'right',
    text: '&#160;',
    disabled: true,
    button: null,

    init: function (button) {
        var me = this;
        me.button = button;
        me.text = me.defaultText;

        button.on('render', me.addBadgeEl, me);

        Ext.apply(button, {
            setBadgeText: function (text) {
                me.disabled = typeof text == 'undefined' || text == me.defaultText;
                me.text = !me.disabled ? (text) : me.defaultText;
                if (button.rendered) {
                    button.badgeEl.update(text.toString() ? text.toString() : me.defaultText);
                    me.setDisabled(me.disabled);
                }
                return button;
            },

            getBadgeText: function () {
                return me.text;
            }
        });

    },

    addBadgeEl: function (button) {
        var me = this;
        var style = {
            'position': 'absolute',
            'background-color': me.disableBg,
            'font-size': me.textSize + 'px',
            'color': me.textColor,
            'padding': '0px 1px',
            'top': '0px',
            'z-index': 50,
            'border-radius': '3px',
            'font-weight': 'bold',
            'font-family': 'monospace',
            'cursor': 'pointer',
            'text-align': 'center',
            'white-space': 'nowrap',
            'min-width': '13px',
            'height': '13px',
            'line-height': '13px'
        }

        if (me.align == 'right') {
            style.right = '0px';
        } else {
            style.left = '0px';
        }

        button.badgeEl = Ext.DomHelper.append(button.el, {
            tag: 'span',
            cls: 'x-badge x-unselectable',
        }, true);
        button.badgeEl.setOpacity(me.disableOpacity);
        button.badgeEl.setStyle(style);
        button.badgeEl.update(me.text.toString() ? me.text.toString() : me.defaultText);
    },

    setDisabled: function (disabled) {
        var me = this;

        me.button.badgeEl.setStyle({
            'background-color': disabled ? me.disableBg : me.enableBg,
            'opacity': disabled ? me.disableOpacity : 1
        });

        me.button.badgeEl.clearListeners();
        if (!disabled) {
            me.button.badgeEl.on('click', me.onBadgeClick, me, {
                preventDefault: true,
                stopEvent: true
            });
        }
    },

    onBadgeClick: function () {
        var me = this;
        me.button.fireEvent('click', me.button, me.text)
    },

})