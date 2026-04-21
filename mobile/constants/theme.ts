/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const accent = '#f97316';

export const Colors = {
  light: {
    text: '#171717',
    background: '#faf7f2',
    tint: accent,
    icon: '#525252',
    tabIconDefault: '#8b8b8b',
    tabIconSelected: accent,
    surface: '#ffffff',
    surfaceElevated: '#fffaf5',
    surfaceMuted: '#f3ede5',
    border: '#e8ddd2',
    borderStrong: '#d7cabd',
    muted: '#6c645b',
    subtle: '#efe7de',
    accent,
    accentStrong: '#ea580c',
    accentSoft: '#ffedd5',
    success: '#15803d',
    warning: '#d97706',
    danger: '#dc2626',
  },
  dark: {
    text: '#ededed',
    background: '#0a0a0a',
    tint: accent,
    icon: '#9a9a9a',
    tabIconDefault: '#787878',
    tabIconSelected: accent,
    surface: '#121212',
    surfaceElevated: '#181818',
    surfaceMuted: '#1d1d1d',
    border: '#262626',
    borderStrong: '#333333',
    muted: '#a3a3a3',
    subtle: '#1b1b1b',
    accent,
    accentStrong: '#fb923c',
    accentSoft: '#2b1607',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
