import { MemoryHistory, createMemoryHistory } from 'history';
import { render, screen} from '@testing-library/react';
import { AppRoutes, AuthorizationStatus} from '../../constants';
import { withHistory, withStore } from '../../util/mock-component';
import { makeFakeStore } from '../../util/mocks';
import App from './app';
import { makeMockOffer } from '../../util/util';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" with Paris when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
    ));
    mockHistory.push(AppRoutes.Main);

    render(withStoreComponent);

    expect(screen.getByText(/places to stay in Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoutes.Login);

    render(withStoreComponent);
    const texts = screen.getAllByText(/Sign in/i);
    for(const text of texts) {
      expect(text).toBeInTheDocument();
    }
    expect(screen.getByText(/Paris|Cologne|Dusseldorf|Amsterdam|Hamburg|Brussels/i)).toBeInTheDocument();
    const emailContainer = screen.getByTestId('email-container');
    expect(emailContainer).toBeInTheDocument();
    const passwordContainer = screen.getByTestId('password-container');
    expect(passwordContainer).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favorites and Authorized"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {auth: {user: null, authorizationStatus: AuthorizationStatus.Auth} }
    ));
    mockHistory.push(AppRoutes.Favorites);

    render(withStoreComponent);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });
  it('should render "Favorites" when user navigate to "/favorites and unauthorized"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {auth: {user: null, authorizationStatus: AuthorizationStatus.NoAuth} }
    ));
    mockHistory.push(AppRoutes.Favorites);

    render(withStoreComponent);

    const texts = screen.getAllByText(/Sign in/i);
    for(const text of texts) {
      expect(text).toBeInTheDocument();
    }
    expect(screen.getByText(/Paris|Cologne|Dusseldorf|Amsterdam|Hamburg|Brussels/i)).toBeInTheDocument();
    const emailContainer = screen.getByTestId('email-container');
    expect(emailContainer).toBeInTheDocument();
    const passwordContainer = screen.getByTestId('password-container');
    expect(passwordContainer).toBeInTheDocument();
  });
  it('should render "Offer" when user navigate to "/offer"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const mockOffer = makeMockOffer();
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {offer: {offer: mockOffer, isOfferDataLoading: false, isOfferNotFound: false}}
    ));
    mockHistory.push(AppRoutes.Offer);

    render(withStoreComponent);
    expect(screen.getByText('Whats inside')).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/)).toBeInTheDocument();

  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404 -- Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Извините, запрашиваемая страница не существует.')).toBeInTheDocument();
  });
});
