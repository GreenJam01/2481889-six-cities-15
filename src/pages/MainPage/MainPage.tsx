
import { Link } from 'react-router-dom';
import { OfferList } from '../../components/OfferList/OfferList';
import { offerType } from '../../types/offer';
import { routes } from '../../constants';
import { FC } from 'react';

export type MainPageProps = {offers:offerType[]}

const cities = ['Paris', 'Collogne', 'Brussels','Hamburg', 'Amsterdam', 'Dusseldorf'].map((city) => (
  <li className="locations__item" key={city}>
    <a className="locations__item-link tabs__item" href="#">
      <span>{city}</span>
    </a>
  </li>));

export const MainPage : FC<MainPageProps> = (props : MainPageProps) => (
  <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  <span className="header__favorite-count">3</span>
                </a>
              </li>
              <Link to={routes.Login}>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">{cities}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
            <div className="cities__places-list places__list tabs__content">
              <OfferList offers={props.offers}/>
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default MainPage;
