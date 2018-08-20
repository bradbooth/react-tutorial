import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
    <div>
        <Link to={`edit/${id}`}>
            <h3>{description}</h3> 
        </Link>
        <p>Amount: {amount} / Date: {createdAt}</p>
    </div>
)

export default connect()(ExpenseListItem)