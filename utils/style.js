export default {
	rem:0,
	dpr:0,
	_shipei(){

		var docEl = document.documentElement;
		this.dpr = window.devicePixelRatio || 1;
		this.rem = docEl.clientWidth * this.dpr / 10;

		var scale = 1 / this.dpr;
		var fontEl = document.createElement('style');
		var metaEl = document.querySelector('meta[name="viewport"]');
		metaEl.setAttribute('content', 'width=' + this.dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
		docEl.setAttribute('data-dpr', this.dpr);
		docEl.firstElementChild.appendChild(fontEl);
		fontEl.innerHTML = 'html{font-size:' + this.rem + 'px!important;}';
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