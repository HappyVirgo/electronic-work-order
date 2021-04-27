import { Bold } from "./bold";
import { Medium } from "./medium";
import { Light } from "./light";
import { SemiBold } from "./semibold";
import { Heavy } from "./heavy";

export const SfUiLight = {
    fontFamily: 'SfUiDisplay',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
        local('SfUiDisplay'),    
        local('SfUiDisplayLight'),
        url(data:application/x-font-woff;charset=utf-8;base64,${Light}) format('woff')
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
        url(data:application/x-font-woff;charset=utf-8;base64,${Medium}) format('woff')
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
        url(data:application/x-font-woff;charset=utf-8;base64,${SemiBold}) format('woff')
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
        url(data:application/x-font-woff;charset=utf-8;base64,${Bold}) format('woff')
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
        url(data:application/x-font-woff;charset=utf-8;base64,${Heavy}) format('woff')
    `,
};
