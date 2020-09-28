// @flow
import React from "react";
import { DraggableCore } from "react-draggable";

import type { Element as ReactElement } from "react";

/**
 * Mix a Draggable instance into a child.
 * @param  {Element} child    Child element.
 * @return {Element}          Child wrapped in Draggable.
 */
function mixinDraggable(
  child: ReactElement<any>,
  isDraggable: boolean
): ReactElement<any> {
  return (
    <DraggableCore
      disabled={!isDraggable}
      onStart={this.onDragStart}
      onDrag={this.onDrag}
      onStop={this.onDragStop}
      handle={this.props.handle}
      cancel={
        ".react-resizable-handle" +
        (this.props.cancel ? "," + this.props.cancel : "")
      }
      scale={this.props.transformScale}
    >
      {child}
    </DraggableCore>
  );
}

export default mixinDraggable;
