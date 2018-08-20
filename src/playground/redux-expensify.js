import { createStore, combineReducers } from 'redux'
import uuid from 'uuid/v1'

const addExpense = (
    { 
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    
    switch(action.type) {
        case('ADD_EXPENSE'):
        return [
            ...state,
            action.expense
        ]
        case('REMOVE_EXPENSE'):
        return state.filter((expense) => {
            return expense.id != action.id
        })
        case('EDIT_EXPENSE'):
        return state.map((expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
            default:
            return state;
        }
}
    
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

const filterReducerDefaultState = {
    text: '',
    sortBy: 'date', //date or amount
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type) {
        case('SET_TEXT_FILTER'):
        return {
            ...state,
            text: action.text
        }
        case('SORT_BY_DATE'):
            return {
                ...state,
                sortBy: 'date'
            }
        case('SORT_BY_AMOUNT'):
            return {
                ...state,
                sortBy: 'amount'
            }
        case('SET_START_DATE'):
            return {
                ...state,
                startDate: action.startDate
            }
        case('SET_END_DATE'):
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

const getVisibleExpenses = (expenses, filters) => {
    const { text, sortBy, startDate, endDate } = filters
    return expenses.filter((expense) => {

        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {

        if (sortBy === 'date'){
            return a.createdAt > b.createdAt ? -1 : 1
        } else if (sortBy === 'amount') {
            return a.amount > b.amount ? -1 : 1
        }

    })
}

store.subscribe(() => {
    const { expenses, filters } = store.getState()
    const visibleExpenses = getVisibleExpenses(expenses, filters)
    console.log(visibleExpenses)
})

const expense_one = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 1001 }))
const expense_two = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: 1002 }))

// store.dispatch(removeExpense({id: expense_one.expense.id}))
// store.dispatch(editExpense( expense_two.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('1'))
// store.dispatch(setTextFilter())

// store.dispatch(sortByAmount())
store.dispatch(sortByDate())

// store.dispatch(setStartDate(0))
// store.dispatch(setEndDate(5000))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate())

const demoState = {
    expenses: [{
        id: 'sfq42',
        description: 'January Rent',
        note: 'This was the final payment',
        amount: 57500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
}
