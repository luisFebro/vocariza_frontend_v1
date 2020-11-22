// import DateFnsUtils from "@date-io/date-fns";
import { parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import getDayMonthBr from "./getDayMonthBr"; // 20 de Junho de 2020 is better than 20º de junho, 2020...
import formatDistance from "date-fns/formatDistance";
import formatRelative from "date-fns/formatRelative";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import isToday from "date-fns/isToday";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import { getPureParsedDate } from "./helpers/dateFnsHelpers";

const localeObj = {
    default: ptBR,
    ptBR,
};

// const dateFnsUtils = DateFnsUtils;
const ptBRLocale = ptBR;

const treatZero = (number) => {
    if (Number(number) <= 9) {
        return `0${number}`;
    }
    return number;
};

// tools
const pick = (locale) => (locale ? localeObj[locale] : localeObj.default);
const now = new Date();

const formatDMY = (date, short) =>
    getDayMonthBr(date, { needYear: true, short });
const fromNow = (pastDate, locale) =>
    formatDistance(new Date(pastDate), now, {
        addSuffix: true,
        locale: pick(locale),
        includeSeconds: true,
    });
// calendar needs a customformatlike ``{ sameElse: 'll'}`` in moment.
const calendar = (date, locale) =>
    formatRelative(new Date(date), now, { locale: pick(locale) });

const getLocalHour = (date) =>
    `${getHours(new Date(date))}:${treatZero(getMinutes(new Date(date)))}`;

// targetDate is inclusive. it will only be expired after the targetDate has passed.
const isScheduledDate = (targetDate, options = {}) => {
    const { isDashed = false } = options; // dashed Date = 2020-12-30 format
    if (!targetDate) return;

    const today = getPureParsedDate(new Date(), { minHour: true });
    const scheduled = getPureParsedDate(targetDate, { isDashed });
    if (today < scheduled) {
        return true;
    }

    return false;
};

const checkToday = (date) => isToday(new Date(date));
const endWeek = endOfWeek(new Date(), { weekStartsOn: 1 });
const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

const formatSlashDMY = (newDate = new Date()) => format(newDate, "dd/MM/yyyy");
const formatFree = (newDate = new Date(), pattern) =>
    format(parseISO(newDate), pattern, { locale: ptBR });

export {
    // dateFnsUtils,
    parseISO,
    ptBRLocale,
    formatDMY,
    formatSlashDMY,
    fromNow,
    calendar,
    addDays,
    subDays,
    getLocalHour,
    checkToday,
    isScheduledDate,
    endWeek,
    startWeek,
    formatFree,
};

// reference: https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time
// function convertUTCToLocale(date) {
//     if(typeof date === "string") {
//         date = new Date(date);
//     }

//     var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

//     var offset = date.getTimezoneOffset() / 60;
//     var hours = date.getHours();

//     newDate.setHours(hours - offset);

//     return newDate;
// }
