import moment from 'moment'

//Get all expenses which should be visible based on the applied filters
export const getVisibleExpenses = (expenses, filters) => {
    const { text, sortBy, startDate, endDate } = filters
    return expenses.filter((expense) => {

        const createdAtDate = moment(expense.createdAt)
        console.log(createdAtDate)
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
        const startDateMatch =  startDate ? startDate.isSameOrAfter(createdAtDate) : true;
        const endDateMatch = endDate ? endDate.isSameOrBefore(createdAtDate) : true;

        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {

        if (sortBy === 'date'){
            return a.createdAt > b.createdAt ? -1 : 1
        } else if (sortBy === 'amount') {
            return a.amount > b.amount ? -1 : 1
        }

    })
}