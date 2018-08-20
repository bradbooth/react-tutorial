// Higher Order Component (HOC)
// Reuse Code
// Render Hijacking
// Prop Manipulation
// Abstract State

import React from 'react'
import ReactDom from 'react-dom'

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This is the info: {props.info}</p>
    </div>
)

const withAdminWarning = ( WrappedComponent ) => {
    return (props) => (
        <div>
            <p>This is priviliged information.</p>
            <WrappedComponent {...props}/>
        </div>
    )
}

const withAuth = ( WrappedComponent ) => {
    return (props) => (
        props.isAuthenticated ? (
            <WrappedComponent {...props} />
        ) : (
            <p>Please authenticate</p>
        )
    )
}

const AdminInfo = withAdminWarning(Info)
const AuthInfo = withAuth(Info)

ReactDom.render(<AuthInfo isAuthenticated={true}/>, document.getElementById('app'))