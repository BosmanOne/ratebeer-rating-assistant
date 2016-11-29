$(document).ready(function() {
	var range_els = document.querySelectorAll('input[type=range]'), 
			
		n = range_els.length, 
		style_el = document.createElement('style'), 
		styles = [], 
		track_sel = [
			'::-moz-range-track', 
			'::-webkit-slider-runnable-track', ' /deep/ #track'], 
		thumb_sel = ['::-webkit-slider-thumb', ' /deep/ #thumb'], 
		a = ':after', b = ':before', 
		highestMaxValue = 0;
		s = ['', '%', '%'];
	

	document.body.appendChild(style_el);
		for(var i = 0; i < n; i++) {
			var maxValue = parseInt(range_els[i].attributes.max.value);
			if (maxValue > highestMaxValue){
				highestMaxValue = maxValue;
			}
		}

	for(var i = 0; i < n; i++) {
		styles.push('');
		
		//setting up width of every slider
		var maxValue = parseInt(range_els[i].attributes.max.value)
		var width = (100/highestMaxValue)*maxValue;
		var correction = (highestMaxValue/maxValue)*0.4-0.4; //Cant calibrate it correctly, can't find needed value
		correction = correction.toFixed(3);
		range_els[i].style.width = "calc("+width+"% + "+correction +"em)";

		range_els[i].addEventListener('input', function() {

			var idx = this.id.split('r')[1] - 1, 
					base_sel = '.js #' + this.id, 
					str = '', 
					min = this.min || 0, max = this.max || 100, 
					c_style, u, edge_w, val;

			this.setAttribute('value', this.value); 
			
			var score = this.value+"/"+this.max;
			var sliderId = this.id;
			$("#"+sliderId).closest("div.rating-div").find("div.rating-score").text(score);
			


			if(this.classList.contains('tip')) {
				str += base_sel + thumb_sel[0] + a + ',' + 
					base_sel + thumb_sel[1] + a + 
					'{content:"' + this.value + s[idx] + '"}';
			}

			if(this.classList.contains('fill')) {
				if(idx == 0) {
					c_style = getComputedStyle(this);
					u = c_style.backgroundSize.split(' ')[0].split('px')[0];
					edge_w = (c_style.width.split('px')[0] - u*(max - min))/2;
					val = ((this.value - min)*u + edge_w) + 'px';
				}
				else {
					val = this.value + '%';
				}

				if(this.classList.contains('fill-replace')) {
					str += base_sel + track_sel[0] + '{background-size:' + val + '}';
				}

				str += base_sel + track_sel[1] + a + ',' + 
					base_sel + track_sel[2] + a + '{width:' + val + '}';
			}

			styles[idx] = str;
			style_el.textContent = styles.join('');
		}, false);
	}
});