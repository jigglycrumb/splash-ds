import React, { useRef } from "react";
import { Image, Transformer } from "react-konva";

type Props = {
  image: any
  keepRatio: boolean
  showTransformer: boolean
}

const SplashImage = (props: Props) => {

  const { image, keepRatio, showTransformer } = props

  const imgRef = useRef<any>()
  const trRef = useRef<any>()

  React.useEffect(() => {
      trRef?.current?.nodes([imgRef.current]);
      trRef?.current?.getLayer().batchDraw();
  });

  const anchors = keepRatio ? [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ] : [
    'top-left',
    'top-center',
    'top-right',
    'middle-right',
    'middle-left',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ]

  return (<>
    <Image image={image} ref={imgRef} draggable />
    {showTransformer &&
      <Transformer
        enabledAnchors={anchors}
        keepRatio={keepRatio}
        ref={trRef}
      />
    }
  </>)
}

export { SplashImage }
