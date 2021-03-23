const styles = {
  activeLine: {
    bgColor: '#e2e2e2',
  },
  activeLineNumber: {
    bgColor: '#e2e2e2',
    color: '#262626',
  },
  blinkingCursorAnimation: {
    bgColor: '#333',
    color: '#fafafa',
  },
  lineSelection: {
    bgColor: '#cccccc',
    color: '#222',
  },
  bottomDialogInput: {
    bgColor: '#d6d6d6',
    color: '#333',
  },
};

export type ThemeType = typeof styles;

export default styles;
