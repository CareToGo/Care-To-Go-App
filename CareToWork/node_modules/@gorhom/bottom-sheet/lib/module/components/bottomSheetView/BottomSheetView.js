function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { SCROLLABLE_TYPE } from '../../constants';
import { useBottomSheetInternal } from '../../hooks';

function BottomSheetViewComponent({
  focusHook: useFocusHook = useEffect,
  enableFooterMarginAdjustment = false,
  style,
  children,
  ...rest
}) {
  // hooks
  const {
    animatedScrollableContentOffsetY,
    animatedScrollableType,
    animatedFooterHeight
  } = useBottomSheetInternal(); // styles

  const containerStylePaddingBottom = useMemo(() => {
    const flattenStyle = StyleSheet.flatten(style);
    const paddingBottom = flattenStyle && 'paddingBottom' in flattenStyle ? flattenStyle.paddingBottom : 0;
    return typeof paddingBottom === 'number' ? paddingBottom : 0;
  }, [style]);
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    paddingBottom: enableFooterMarginAdjustment ? animatedFooterHeight.value + containerStylePaddingBottom : containerStylePaddingBottom
  }), [containerStylePaddingBottom, enableFooterMarginAdjustment]);
  const containerStyle = useMemo(() => [style, containerAnimatedStyle], [style, containerAnimatedStyle]); // callback

  const handleSettingScrollable = useCallback(() => {
    animatedScrollableContentOffsetY.value = 0;
    animatedScrollableType.value = SCROLLABLE_TYPE.VIEW;
  }, [animatedScrollableContentOffsetY, animatedScrollableType]); // effects

  useFocusHook(handleSettingScrollable); //render

  return /*#__PURE__*/React.createElement(Animated.View, _extends({
    style: containerStyle
  }, rest), children);
}

const BottomSheetView = /*#__PURE__*/memo(BottomSheetViewComponent);
BottomSheetView.displayName = 'BottomSheetView';
export default BottomSheetView;
//# sourceMappingURL=BottomSheetView.js.map