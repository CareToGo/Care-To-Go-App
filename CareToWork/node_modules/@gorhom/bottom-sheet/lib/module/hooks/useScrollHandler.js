import { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useScrollEventsHandlersDefault } from './useScrollEventsHandlersDefault';
import { workletNoop as noop } from '../utilities';
export const useScrollHandler = (useScrollEventsHandlers = useScrollEventsHandlersDefault) => {
  // refs
  const scrollableRef = useAnimatedRef(); // variables

  const scrollableContentOffsetY = useSharedValue(0); // hooks

  const {
    handleOnScroll = noop,
    handleOnBeginDrag = noop,
    handleOnEndDrag = noop,
    handleOnMomentumEnd = noop,
    handleOnMomentumBegin = noop
  } = useScrollEventsHandlers(scrollableRef, scrollableContentOffsetY); // callbacks

  const scrollHandler = useAnimatedScrollHandler({
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
//# sourceMappingURL=useScrollHandler.js.map