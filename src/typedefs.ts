import React from 'react'

export interface CulqiStyleV4 {
  bannerColor: string,
  logo: string,
  buttonBackground: string,
  buttontext: string,
  linksColor: string,
  menuColor: string,
  priceColor: string,
}

export interface CulqiStyleV3 {
  maincolor: string;
  buttontext: string;
  maintext: string;
  desctext: string;
  logo: string
}

export interface CulqiPaymentMethods {
  tarjeta: boolean,
  yape: boolean
}

export interface CulqiSettingsV3 {
    amount?: number;
    currency?: 'PEN' | 'USD';
    description?: string;
    title?: string;
}

export interface CulqiOptionsV3 {
  style?: CulqiStyleV3
}

export interface CulqiOptionsV4 {
  amount: number;
  currency?: string;
  description?: string;
  title?: string;
  style?: CulqiStyleV4
  paymentMethods?: CulqiPaymentMethods
}

export interface CulqiToken {
    object: 'token';
    id: string;
    type: string;
    creation_date: number;
    email: string;
    card_number: string;
    last_four: string;
    active: boolean;
    iin: string;
    client: string;
  }

export interface CulqiError {
    object: 'error';
    type: string;
    merchant_message: string;
    user_message: string;
  }

export interface CulqiContextType {
    openCulqi: () => void;
    setAmount: (amount: number) => void;
    amount: number;
    token: CulqiToken | null;
    error: CulqiError | null;
}

export interface CulqiProviderV4Props {
    publicKey: string;
    options: CulqiOptionsV4;
    onClose?: () => void;
    onError?: (error: CulqiError) => void;
    onToken?: (token: CulqiToken) => void;
    children: React.ReactNode;
}

export interface CulqiProviderV3Props {
    amount: number;
    currency?: 'PEN' | 'USD';
    description: string;
    title: string;
    publicKey: string;
    options: CulqiOptionsV3;
    onClose?: () => void;
    onError?: (error: CulqiError) => void;
    onToken?: (token: CulqiToken) => void;
    children: React.ReactNode;
}
