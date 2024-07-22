export type SliderModel = {
  _id?: string;
  mainSlider: string[];
  secondSlider: string[];
};

export type SliderInputModel = {
  _id?: string;
  mainSlider?: string[];
  secondSlider?: string[];
  removeMainSliderImages: string[];
  removeSecondSliderImages: string[];
};
