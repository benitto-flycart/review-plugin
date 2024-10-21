export const REVIEW_SHADOWS: { [index: string]: any } = {
  classic: {
    boxShadow: "0 0 8px {{color}}",
  },
  dark: {
    boxShadow: "0 6px 14px {{color}}",
  },
  light: {
    boxShadow: "0 6px 14px -4px {{color}}",
  },
  none: {
    boxShadow: "0 0 0 0 {{color}}",
  },
};

export const REVIEW_OPENERS: { [index: string]: any } = {
  sharp: {
    borderRadius: "2px",
  },
  slightly_rounded: {
    borderRadius: "4px",
  },
  rounded: {
    borderRadius: "8px",
  },
  extra_rounded: {
    borderRadius: "16px",
  },
  none: {
    borderRadius: "0px",
  },
};

export const getReviewShadow = (index: any, color: any) => {
  let style = REVIEW_SHADOWS[index];

  return style.boxShadow.replace("{{color}}", color);
};
export const getReviewBorderRadius = (index: any) => {
  return REVIEW_OPENERS[index].borderRadius;
};

