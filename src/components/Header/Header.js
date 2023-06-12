import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = () => {
    
    return (
        <header> 
            <div className="header">
                <NavLink className="header__container" to='/'>
                    <div className="header__container">
                        <svg viewBox="0 0 24 24" className="header__logo">
                            <path d="M21.036 24H2.964A2.968 2.968 0 0 1 0 21.036V2.964A2.968 2.968 0 0 1 2.964 0h18.072A2.968 2.968 0 0 1 24 2.964v18.071A2.968 2.968 0 0 1 21.036 24zM2.964 1A1.966 1.966 0 0 0 1 2.964v18.071C1 22.119 1.881 23 2.964 23h18.072A1.966 1.966 0 0 0 23 21.036V2.964A1.966 1.966 0 0 0 21.036 1H2.964zm9.815 18.071h-1.611a.5.5 0 0 1-.5-.5v-5.15L6.627 5.66a.498.498 0 0 1 .443-.731h1.915a.5.5 0 0 1 .441.265c1.751 3.278 2.306 4.517 2.618 5.318.306-.775.802-1.897 2.656-5.321a.5.5 0 0 1 .439-.262h1.787a.5.5 0 0 1 .444.731l-4.092 7.852v5.06a.497.497 0 0 1-.499.499zm-1.111-1h.611v-4.68a.5.5 0 0 1 .057-.231l3.768-7.231h-.665c-1.947 3.606-2.28 4.473-2.576 5.24-.108.281-.21.546-.378.915-.082.181-.268.278-.464.292a.499.499 0 0 1-.453-.309c-.112-.27-.192-.49-.276-.718-.29-.792-.619-1.688-2.605-5.421h-.792l3.717 7.139a.5.5 0 0 1 .057.231v4.773z"></path>
                        </svg>
                        <h1 className="header__title">Hacker News Clone</h1>
                    </div>
                </NavLink>
                <div className="header__aside">
                    Powered by <a href="https://hackernews.api-docs.io/v0/overview/introduction">HackerNewsAPI</a>
                </div>
            </div>
        </header>
    )
}

export default Header;