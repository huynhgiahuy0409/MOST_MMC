Ext.define('MOST.util.ColorUtil', {
	singleton: true,
    alternateClassName: 'ColorUtil',

    getCovertColorDecToRGB: function(value) {
    	if (StringUtil.isNullorEmpty(value) === true || Number.isNaN(value) === true || value === '0') {
            return '';
        }
        else {
            var decValue = Number.parseInt(value);

            var r = (decValue & 0xFF);
            var g = (decValue & 0xFF00) >>> 8;
            var b = (decValue & 0xFF0000) >>> 16;

            return "rgb(" + [r, g, b].join(",") + ")";
        }
    },
    
    getCovertDecFromRGB: function(r, g, b) {
        return (b << 16) + (g << 8) + (r);
    }
});