"use strict";

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import newDot from './modules/newDot';
import changeImage from './modules/changeImage';
import validCalc from './modules/validCalc';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import slider from './modules/slider';

//  TIMER
countTimer("27 march 2021");

//  MENU
toggleMenu();

//  POPUP
togglePopup();

//  TABS
tabs();

//  ADD DOTS
newDot();

//  Change Image 
changeImage();

//  Valid Calc
validCalc();

//  Calculator 
calc(100);

//  Send-ajax-form
sendForm();

//  SLIDER
slider();