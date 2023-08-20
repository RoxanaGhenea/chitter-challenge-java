import { render, fireEvent } from '@testing-library/vitest';
import App from './App';
import NavBar from './Components/NavBar';
import ChitterBox from './Components/ChitterBox';
import SignUpInPage from './Components/SignUpInPage';

describe('App and Component Tests', () => {
    test('renders App component', () => {
        render(<App />);
    });

    test('renders NavBar component', () => {
        render(<NavBar />);
    });

    test('renders ChitterBox component', () => {
        render(<ChitterBox />);
    });

    test('renders SignUpInPage component', () => {
        render(<SignUpInPage />);
    });

    test('clicking "Create Account" button in SignUpInPage navigates to SignUp', async () => {
        // Arrange
        const { getByText } = render(<App />);
        // Act
        await fireEvent.click(getByText('Create Account'));
        // Assert
        expect(await getByText('Please choose your username:')).toBeInTheDocument(); 
    });
});
