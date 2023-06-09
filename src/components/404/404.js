import { Link } from "react-router-dom"

const Page404 = () => {

    return (
        <div style={{
            fontSize: '20px', 
            background: '#ddd', 
            width: '100%', 
            margin: '0 auto', 
            textAlign: 'center', 
            padding: '100px',
            borderRadius: '10px'
        }}>
            <p>Oops, nothing here</p>
            <p style={{
                fontSize: '40px', 
                margin: '20px'
            }}>
                <b>(; - ;)</b>
            </p>
            <Link to='/' style={{
                fontFamily:'Roboto', 
                fontSize: '18px', 
                display: 'block', 
                textDecoration: 'underline'
            }}>Back to main page</Link>
        </div>
    )
}

export default Page404;