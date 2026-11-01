import { Platform } from 'react-native';

export const Colors = {
  light: {
    primary: '#DFA0A8',
    secondary: '#A6B8A8',
    text: '#292B38',
    textSecondary: '#777783',
    background: '#F5EDE7',
    backgroundElement: '#FFFCF9',
    backgroundSelected: '#EADCD5',
    border: '#E8DDD7',
    white: '#FFFFFF',
    error: '#C75B62',
  },
  dark: {
    primary: '#DFA0A8',
    secondary: '#A6B8A8',
    text: '#F5EDE7',
    textSecondary: '#B9B5B7',
    background: '#20212A',
    backgroundElement: '#292B38',
    backgroundSelected: '#393B49',
    border: '#414250',
    white: '#FFFFFF',
    error: '#E58B91',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 48,
  seven: 64,
} as const;

export const Radius = {
  small: 8,
  medium: 16,
  large: 24,
  full: 999,
} as const;

export const MaxContentWidth = 800;

export const Typography = {
  heading: {
    fontSize: 30,
    fontWeight: '700' as const,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    letterSpacing: -0.3,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 21,
  },
  label: {
    fontSize: 13,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
} as const;