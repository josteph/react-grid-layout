// @flow
import React from "react";
import { Resizable } from "react-resizable";

import { calcGridItemPosition } from "../calculateUtils";

import type { Element } from "react";

/**
 * Mix a Resizable instance into a child.
 * @param  {Element} child    Child element.
 * @param  {Object} position  Position object (pixel values)
 * @return {Element}          Child wrapped in Resizable.
 */
function mixinResizable(
  child: Element<any>,
  position: Position,
  isResizable: boolean
): Element<any> {
  const {
    cols,
    x,
    minW,
    minH,
    maxW,
    maxH,
    transformScale,
    resizeHandles
  } = this.props;
  const positionParams = this.getPositionParams();

  // This is the max possible width - doesn't go to infinity because of the width of the window
  const maxWidth = calcGridItemPosition(positionParams, 0, 0, cols - x, 0)
    .width;

  // Calculate min/max constraints using our min & maxes
  const mins = calcGridItemPosition(positionParams, 0, 0, minW, minH);
  const maxes = calcGridItemPosition(positionParams, 0, 0, maxW, maxH);
  const minConstraints = [mins.width, mins.height];
  const maxConstraints = [
    Math.min(maxes.width, maxWidth),
    Math.min(maxes.height, Infinity)
  ];
  return (
    <Resizable
      draggableOpts={{
        disabled: !isResizable
      }}
      className={isResizable ? undefined : "react-resizable-hide"}
      width={position.width}
      height={position.height}
      minConstraints={minConstraints}
      maxConstraints={maxConstraints}
      onResizeStop={this.onResizeStop}
      onResizeStart={this.onResizeStart}
      onResize={this.onResize}
      transformScale={transformScale}
      resizeHandles={resizeHandles}
    >
      {child}
    </Resizable>
  );
}

export default mixinResizable;
