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
            interval: 0
        },
        frames: []
    };

    for (var i in defaultOptions)
        if (defaultOptions.hasOwnProperty(i) && options[i] === undefined)
            options[i] = defaultOptions[i];

    this.options = options;

    this.spriteContainer = document.createElement('div');

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

    this.setSpriteStyling();
};

SpriteAnimator.prototype.setSpriteStyling = function() {

};