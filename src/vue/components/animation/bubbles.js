export default {
	data: () => ({
		/*Bubbles*/
		width: 'test',
		height: '',
		canvas: '',
		ctx: '',
		draw: '',
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
	        })();

	        function init() {
	            _this.pos.x = Math.random()*t.width;
	            _this.pos.y = t.height+Math.random()*100;
	            _this.alpha = 0.1+Math.random()*0.9;
	            _this.scale = 0.1+Math.random()*0.9;
	            _this.velocity = Math.random();
	        }

	        _this.draw = function() {
	            if(_this.alpha <= 0) {
	                init();
	            }
	            _this.pos.y -= _this.velocity;
	            _this.alpha -= 0.0005;
	            t.ctx.beginPath();
	            t.ctx.arc(_this.pos.x, _this.pos.y, _this.scale*8, 0, 4 * Math.PI, false);
	            t.ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
	            t.ctx.fill();
	        };
	    },
		animate() {
			let draw = this.draw;
			if(this.animateHeader) {
				this.ctx.clearRect(0,0,this.width,this.height);
				for(let i in this.circles) {
					this.circles[i].draw();
				}
			}
			requestAnimationFrame(this.animate.bind(this));
		},

		scrollCheck() {
	        if(document.body.scrollTop > this.height) this.animateHeader = false;
	        else this.animateHeader = true;
	    },
	    resize() {
	        this.width = window.innerWidth;
	        this.height = window.innerHeight;
	        this.canvas.width = this.width;
	        this.canvas.height = this.height;
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
        for(let x = 0; x < this.width*0.1; x++) {
            let c = new this.Circle(this);
            this.circles.push(c);
        }
        let animation_ = this.animate.bind(this);
        let scroll_ = this.scrollCheck.bind(this);
        let resize_ = this.resize.bind(this);

        window.addEventListener('scroll', scroll_);
        window.addEventListener('resize', resize_);
        
        animation_();
	}
}
