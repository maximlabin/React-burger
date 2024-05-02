import { isToday, isYesterday, format, differenceInDays } from 'date-fns';

export default function dataConverter(comparisonDate: string) {
    let result = '';
    const today = new Date();
    if (isToday(comparisonDate)) {
        result = 'Сегодня';
    } else if (isYesterday(comparisonDate)) {
        result = 'Вчера';
    } else if (differenceInDays(today, comparisonDate) <= 7) {
        const daysDiff = differenceInDays(today, comparisonDate);
        result = `${daysDiff} ${daysDiff <= 5 ? 'дня' : 'дней'} назад`;
    } else {
        result = format(comparisonDate, 'dd.MM.yyyy');
    }
    result += `, ${format(comparisonDate, 'HH:mm')}`;
    return result;
}