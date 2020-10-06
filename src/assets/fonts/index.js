import SfUiDisplayBold from '../fonts/sf-ui-display-bold-58646a511e3d9.woff';
import SfUiDisplaySemibold from '../fonts/sf-ui-display-semibold-58646eddcae92.woff';
import SfUiDisplayMedium from '../fonts/sf-ui-display-medium-58646be638f96.woff';
import SfUiDisplayLight from '../fonts/sf-ui-display-light-58646b33e0551.woff';
import SfUiDisplayHeavy from '../fonts/sf-ui-display-heavy-586470160b9e5.woff';

export const SfUiLight = {
    fontFamily: 'SfUiDisplay',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
        local('SfUiDisplay'),    
        local('SfUiDisplayLight'),
        url(${SfUiDisplayLight}) format('woff')
    `,
};

export const SfUiMedium = {
    fontFamily: 'SfUiDisplay',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 500,
    src: `
        local('SfUiDisplay'),    
        local('SfUiDisplayMedium'),
        url(${SfUiDisplayMedium}) format('woff')
    `,
};

export const SfUiSemibold = {
    fontFamily: 'SfUiDisplay',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 600,
    src: `
        local('SfUiDisplay'),    
        local('SfUiDisplaySemibold'),
        url(${SfUiDisplaySemibold}) format('woff')
    `,
};

export const SfUiBold = {
    fontFamily: 'SfUiDisplay',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 700,
    src: `
        local('SfUiDisplay'),    
        local('SfUiDisplayBold'),
        url(${SfUiDisplayBold}) format('woff')
    `,
};

export const SfUiHeavy = {
    fontFamily: 'SfUiDisplay',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 800,
    src: `
        local('SfUiDisplay'),    
        local('SfUiDisplayHeavy'),
        url(${SfUiDisplayHeavy}) format('woff')
    `,
};
