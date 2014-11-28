/**
 * Created by niels on 11/28/14.
 */

function SpriteAnimator(options) {
    if (typeof options == 'string') {
        options = {
            'input': options
        };
    } else if (typeof options == 'undefined') options = {};

    var defaultOptions = {
        input: null,
        frame: {
            width: 0,
            height: 0
        },
        sprite: {
            width: 0,
            height: 0
        },
        animation: {
            frames: 0,
            xFrames: 0,
            yFrames: 0,
            interval: 0
        },
        frames: []
    };

    for (var i in defaultOptions)
        if (defaultOptions.hasOwnProperty(i) && options[i] === undefined)
            options[i] = defaultOptions[i];

    this.options = options;

    this.spriteContainer = document.createElement('div');
    this.interval = null;
    this.currentFrame = 0;

    if (this.init()) {
        console.log('Successfully initiated SpriteAnimator');
    }
}

SpriteAnimator.prototype.init = function() {
    if (this.options.input === null) {
        console.warn('Cannot init SpriteAnimator without input');
        return false;
    }
    var img, self=this;
    if (typeof this.options.input == 'string') {
        img = document.createElement('img');
        img.onload = function() {
            self.init(); // Run init again, now with the proper element
        };
        img.src = this.options.input;
        document.body.appendChild(img);
        this.options.input = img;
        return false;
    } else if (this.options.input instanceof HTMLImageElement) {
        img = this.options.input;
        if (!img.complete) {
            img.onload = function() {
                self.init();
            };
            return false;
        }
    }
    // Check parameters
    if (this.options.frame.width == 0 || this.options.frame.height == 0) {
        console.warn('Cannot run SpriteAnimator without setting frame width/height');
        return false;
    }

    this.options.sprite.width = img.width;
    this.options.sprite.height = img.height;
    this.options.sprite.src = img.src;

    img.parentNode.removeChild(img);

    this.setSpriteStyling();
    if (!this.options.animation.frames) {
        this.countFrames();
    }
    if (this.options.frames.length == 0)
        this.getFrames();
};

SpriteAnimator.prototype.setSpriteStyling = function() {
    var sprite = this.spriteContainer;

    var style =
        'background-image: url(\''+this.options.sprite.src+'\');' +
        'display: inline-block;' +
        'width: '+this.options.frame.width+'px;' +
        'height: '+this.options.frame.height+'px;' +
        'background-size: '+this.options.sprite.width+'px '+this.options.sprite.height+'px;' +
        'background-position: 0 0;' +
        'background-repeat: no-repeat;'
    ;
    sprite.setAttribute('style', style);

    document.body.appendChild(this.spriteContainer);
};

SpriteAnimator.prototype.countFrames = function() {
    // This is a very simple method, which just does some math to get the frame count, nothing to check for empty frames
    var xFrames = this.options.sprite.width / this.options.frame.width;
    var yFrames = this.options.sprite.height / this.options.frame.height;
    this.options.animation.frames = xFrames * yFrames;
    this.options.animation.xFrames = xFrames;
    this.options.animation.yFrames = yFrames;
};

SpriteAnimator.prototype.getFrames = function() {

    for (var y=0; y<this.options.animation.yFrames; y++) {
        for (var x=0; x<this.options.animation.xFrames; x++) {
            this.options.frames.push({
                x: x*this.options.frame.width,
                y: y*this.options.frame.height
            });
        }
    }
};

SpriteAnimator.prototype.startAnimation = function() {
    var self = this;
    if (this.interval !== null) this.stopAnimation();
    this.interval = setInterval(function() {
        self.nextFrame();
    }, this.options.animation.interval);
};

SpriteAnimator.prototype.stopAnimation = function() {
    clearInterval(this.interval);
};

SpriteAnimator.prototype.nextFrame = function() {
    if (++this.currentFrame == this.options.animation.frames) this.currentFrame = 0;
    var frame = this.options.frames[this.currentFrame];

    this.spriteContainer.style.backgroundPosition = '-'+frame.x+'px -'+frame.y+'px';
};