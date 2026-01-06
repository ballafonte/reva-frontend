import { render, screen } from '@tests/utils/test-utils';
import { SignUpForm } from '@/components/common/SignUpForm/SignUpForm';

describe('SignUpForm', () => {
  it('should render form fields', () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // Password fields might appear multiple times (password and confirm password)
    const passwordFields = screen.getAllByLabelText(/password/i);
    expect(passwordFields.length).toBeGreaterThanOrEqual(2);
  });

  it('should render sign up button', () => {
    render(<SignUpForm />);

    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
  });
});
