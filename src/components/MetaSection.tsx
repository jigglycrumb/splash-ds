import React, { useEffect, useRef, useState } from "react";
import { SMDH } from '../utils/SMDH'
import { loadImage } from '../utils/loadImage';

type MetaSectionProps = {
  smdh: SMDH
}

const MetaSection = ({ smdh }: MetaSectionProps) => {

  const [iconFile, setIconFile] = useState<File | undefined>();

  const bigIconRef = useRef<HTMLCanvasElement>(null);
  // const smallIconRef = useRef<HTMLCanvasElement>(null);
  const iconFileRef = useRef<HTMLInputElement>(null);

  const clickImportBigCanvas = () => {
    console.log('clickImportBigCanvas');
    iconFileRef.current?.click();
  }

  useEffect(() => {
    console.log('MetaSection useEffect');

    if(iconFile) {
      const reader = new window.FileReader();
      reader.onload = (() => {
        return function (event: any) {
          const dataUrl = event.target.result;
          loadImage(dataUrl).then((img: any) => {
            // setSplashImage(img);


            // console.log(img);

            bigIconRef?.current?.getContext("2d")?.drawImage(img, 0, 0, 48, 48);
            // smallIconRef?.current?.getContext("2d")?.drawImage(img, 0, 0, 24, 24);

            smdh.convertIcon(true, false);
            // smdh.convertIcon(false, false);
          });
        };
      })();

      reader.readAsDataURL(iconFile);
    }
  });

  return (
    <div className="home-block">
      <form id="file-form">
        <input id="file-load" type="file" ref={iconFileRef} onChange={event => {
          setIconFile(event?.target?.files?.[0]);
        }} />
      </form>
      <div className="row">
        <label htmlFor="big-icon" className="label">Icon:</label>
        <canvas id="big-icon" ref={bigIconRef} width={48} height={48} className="button" onClick={clickImportBigCanvas}></canvas>
        {/* <canvas id="small-icon" ref={smallIconRef} width={24} height={24} className="button" onClick={clickImportSmallCanvas}></canvas><br/> */}
        {/* <input type="checkbox" defaultChecked id="both-icons" /> */}
        {/* <label htmlFor="both-icons"> Update both when importing</label> */}
      </div>

      <div id="langs">
          <div className="row" id="row-short-description">
            <label htmlFor="short-description" className="label">Title:</label>
            <input id="short-description" type="text" maxLength={64} className="input" />
          </div>

          <div className="row" id="row-long-description">
            <label htmlFor="long-description" className="label">Description:</label>
            <input id="long-description" type="text" maxLength={128} className="input" />
          </div>

          <div className="row" id="row-publisher">
            <label htmlFor="publisher" className="label">Author:</label>
            <input id="publisher" type="text" maxLength={64} className="input" defaultValue="splash-ds" />
          </div>
      </div>
    </div>
  )
}

export { MetaSection }
