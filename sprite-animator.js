/**
 * Created by niels on 11/28/14.
 */

function SpriteAnimator(options) {
    if (typeof options == 'string') {
        options = {
            'spriteUrl': options
        };
    } else if (typeof options == 'undefined') options = {};

    var defaultOptions = {
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

}