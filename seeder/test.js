import { addMinutesToCurrentLocaleTime, startTimer } from "./utils.js";

const expirationTime = addMinutesToCurrentLocaleTime(1);
startTimer(expirationTime);
