export default function formatDate(dateString: string | undefined | null): string {
    if (!dateString || typeof dateString !== 'string') {
        return "-";
    }

    const [year, month, day] = dateString.split('-');
    
    if (!year || !month || !day) {
        return "-";
    }

    const date = new Date(`${year}-${month}-${day}`);
    if (isNaN(date.getTime())) {
        return "-";
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
