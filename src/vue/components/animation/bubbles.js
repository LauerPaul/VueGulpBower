export default {
	data: () => ({
		/*Bubbles*/
		width: 'test',
		height: '',
		canvas: '',
		ctx: '',
		circles: [],
		target: '',
		animateHeader: true
	}),
	methods: {
		// Canvas manipulation
	    Circle(t) {
	        var _this = this;

	        // constructor
	        (function() {
	            _this.pos = {};
	            init();
	            console.log(_this);
	        })();

	        function init() {
	            _this.pos.x = Math.random()*t.width;
	            _this.pos.y = t.height+Math.random()*100;
	            _this.alpha = 0.1+Math.random()*0.9;
	            _this.scale = 0.1+Math.random()*0.9;
	            _this.velocity = Math.random();
	        }

	        this.draw = function() {
	            if(_this.alpha <= 0) {
	                init();
	            }
	            _this.pos.y -= _this.velocity;
	            _this.alpha -= 0.0005;
	            t.ctx.beginPath();
	            t.ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
	            t.ctx.fillStyle = 'rgba(157,188,225,'+ _this.alpha+')';
	            t.ctx.fill();
	        };
	    },
		animate(t) {
			if(t.animateHeader) {
				t.ctx.clearRect(0,0,t.width,t.height);
			for(var i in t.circles) {
				t.circles[i].draw();
			}
			}
			requestAnimationFrame(this);
		}
	},
	mounted: function () {
		this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.target = {x: 0, y: this.height};

		this.canvas = document.getElementById("bubbles");
		this.canvas.width = parseInt(this.width);
        this.canvas.height = this.height;
		this.ctx = this.canvas.getContext("2d");

		 // create particles
        for(let x = 0; x < this.width*0.9; x++) {
            let c = new this.Circle(this);
            this.circles.push(c);
        }

        this.animate(this);
	}
}


// bubbles () {
//     addListeners();


//     // Event handling
//     function addListeners() {
//         window.addEventListener('scroll', scrollCheck);
//         window.addEventListener('resize', resize);
//     }

//     function scrollCheck() {
//         if(document.body.scrollTop > height) animateHeader = false;
//         else animateHeader = true;
//     }

//     function resize() {
//         width = window.innerWidth;
//         height = window.innerHeight;
//         canvas.width = width;
//         canvas.height = height;
//     }




// }