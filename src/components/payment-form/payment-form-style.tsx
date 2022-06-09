import styled from 'styled-components';
import Button from '../button/button';

export const PaymentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StripeError = styled.div`
  padding: 5px;
  width: fit-content;
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 30%;
  font-weight: bold;
  color: #DF1B41;
  background-color: #ffe6e6;
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
  @media screen and (max-width: 1400px) {
    margin-bottom: 30px;
  }
`;