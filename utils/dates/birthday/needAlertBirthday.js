import getDayMonthBr from "../getDayMonthBr";
import getDateCode from "../getDateCode";

export default function needAlertBirthday(strBirthDate, options = {}) {
    let { daySpan, trigger } = options;
    if (!daySpan) daySpan = 7;

    const isBelated = false;
    let todayWithoutYear = getDayMonthBr(new Date());

    const negativeRes = { alert: false, isBelated: false };
    const okRes = { alert: true, isBelated: false };
    if (!trigger) return negativeRes;
    if (strBirthDate && strBirthDate.includes(todayWithoutYear)) return okRes;

    let today = getDayMonthBr(new Date(), { needYear: true });

    const { code: todayCode, monthCode: todayMonth } = getDateCode(today);
    const {
        code: birthdayCode,
        maxDayMonth: birthMaxDayMonth,
        monthCode: birthMonth,
    } = getDateCode(strBirthDate);
    const maxDayCodeToAlert = getMaxCodeDate(birthdayCode, {
        todayCode,
        daySpan,
        birthMonth,
        todayMonth,
        birthMaxDayMonth,
    });
    let isBirthdayBelated =
        todayCode > birthdayCode && todayCode <= maxDayCodeToAlert;
    if (maxDayCodeToAlert === false) isBirthdayBelated = null;

    const alert = Boolean(isBirthdayBelated);

    // isBelated status: null (no birthday timing span), false (birthday's date), true (belated)
    return {
        isBelated: isBirthdayBelated,
        alert,
    };
}

function getMaxCodeDate(birthdayCode, options = {}) {
    const {
        todayCode,
        daySpan,
        birthMonth,
        todayMonth,
        birthMaxDayMonth,
    } = options;
    const monthsDiff = todayMonth - birthMonth;
    const isSameMonth = monthsDiff === 0;

    const todayDate = new Date().getDate();
    const birthDate = Number(birthdayCode.toString().replace(birthMonth, ""));
    const datesDiff = isSameMonth ? birthDate - todayDate : false;
    if (monthsDiff >= 2 || datesDiff > 7 || todayCode < birthdayCode)
        return false;

    const diffOfDaysTilLastDayMonth = isSameMonth
        ? birthMaxDayMonth - todayDate
        : 0;

    if (diffOfDaysTilLastDayMonth >= daySpan) {
        return Number(birthdayCode + daySpan);
    } else {
        const nextMonth = birthMonth + 1;
        const nextMonthDaysDiff = daySpan - diffOfDaysTilLastDayMonth;
        return Number(`${nextMonth}0${nextMonthDaysDiff}`);
    }
}

function getMonthesDetails() {
    return {
        janeiro: {
            maxDay: 31,
            codeNum: 1,
        },
        fevereiro: {
            maxDay: 28,
            codeNum: 2,
        },
        março: {
            maxDay: 31,
            codeNum: 3,
        },
        abril: {
            maxDay: 30,
            codeNum: 4,
        },
        maio: {
            maxDay: 31,
            codeNum: 5,
        },
        junho: {
            maxDay: 30,
            codeNum: 6,
        },
        julho: {
            maxDay: 31,
            codeNum: 7,
        },
        agosto: {
            maxDay: 31,
            codeNum: 8,
        },
        setembro: {
            maxDay: 30,
            codeNum: 9,
        },
        outubro: {
            maxDay: 31,
            codeNum: 10,
        },
        novembro: {
            maxDay: 30,
            codeNum: 11,
        },
        dezembro: {
            maxDay: 31,
            codeNum: 12,
        },
    };
}

/* COMMENTS
strDate.lastIndexOf(" ", 8)
n1: the spacing between " de 2007"  is 8 explicited as the the second argument.
Then finding the first next spacing index backwardly.
Note that the index is counted from 0 in the normal way.
*/
