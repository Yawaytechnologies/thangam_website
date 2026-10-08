import logo from '../../assets/logo.png';
import { Link } from 'react-router';

export function Brand() {
  return <Link to="/#home" state={{ restartHero: true }} className="brand" aria-label="Sri Thangam Housing home">
    <img src={logo} alt="Sri Thangam Housing logo"/>
    <span>SRI THANGAM<span className="brand-sub">H O U S I N G</span></span>
  </Link>;
}
