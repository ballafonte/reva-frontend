import { render, screen } from '@tests/utils/test-utils';
import { SignInForm } from '@/components/common/SignInForm/SignInForm';

describe('SignInForm', () => {
  it('should render form fields', () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should render sign in button', () => {
    render(<SignInForm />);

    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });
});
