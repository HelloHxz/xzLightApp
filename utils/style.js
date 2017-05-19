export default {
	rem:0,
	_shipei(){
		var dpr, scale;
		var docEl = document.documentElement;
		var fontEl = document.createElement('style');
		var metaEl = document.querySelector('meta[name="viewport"]');
		dpr = window.devicePixelRatio || 1;
		this.rem = docEl.clientWidth * dpr / 10;
		scale = 1 / dpr;
		metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
		docEl.setAttribute('data-dpr', dpr);
		docEl.firstElementChild.appendChild(fontEl);
		fontEl.innerHTML = 'html{font-size:' + this.rem + 'px!important;}';
		window.dpr = dpr;
	},
	rem2px(v){
		if(this.rem===0){
			this._shipei();
		}
		v = parseFloat(v);
		return v * this.rem;		
	},
	px2rem(v){
		if(this.rem===0){
			this._shipei();
		}
		v = parseFloat(v);
		return v / this.rem;
	},
	createSheet(styles){
		alert(styles);
	}

}