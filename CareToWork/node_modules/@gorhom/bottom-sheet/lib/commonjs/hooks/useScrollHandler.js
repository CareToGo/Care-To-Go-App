"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScrollHandler = void 0;

var _reactNativeReanimated = require("react-native-reanimated");

var _useScrollEventsHandlersDefault = require("./useScrollEventsHandlersDefault");

var _utilities = require("../utilities");

const useScrollHandler = (useScrollEventsHandlers = _useScrollEventsHandlersDefault.useScrollEventsHandlersDefault) => {
  // refs
  const scrollableRef = (0, _reactNativeReanimated.useAnimatedRef)(); // variables

  const scrollableContentOffsetY = (0, _reactNativeReanimated.useSharedValue)(0); // hooks

  const {
    handleOnScroll = _utilities.workletNoop,
    handleOnBeginDrag = _utilities.workletNoop,
    handleOnEndDrag = _utilities.workletNoop,
    handleOnMomentumEnd = _utilities.workletNoop,
    handleOnMomentumBegin = _utilities.workletNoop
  } = useScrollEventsHandlers(scrollableRef, scrollableContentOffsetY); // callbacks

  const scrollHandler = (0, _reactNativeReanimated.useAnimatedScrollHandler)({
    onScroll: handleOnScroll,
    onBeginDrag: handleOnBeginDrag,
    onEndDrag: handleOnEndDrag,
    onMomentumBegin: handleOnMomentumBegin,
    onMomentumEnd: handleOnMomentumEnd
  }, [handleOnScroll, handleOnBeginDrag, handleOnEndDrag, handleOnMomentumBegin, handleOnMomentumEnd]);
  return {
    scrollHandler,
    scrollableRef,
    scrollableContentOffsetY
  };
};

exports.useScrollHandler = useScrollHandler;
//# sourceMappingURL=useScrollHandler.js.map