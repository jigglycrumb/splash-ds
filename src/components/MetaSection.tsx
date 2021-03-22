import React, { useEffect, useRef, useState } from "react";
import { SMDH, VALID_LANGUAGES } from '../utils/SMDH'
import { loadImage } from '../utils/loadImage';

type MetaSectionProps = {

}

const clickImportBigCanvas = () => {
  console.log('clickImportBigCanvas')
}

const clickImportSmallCanvas = () => {
  console.log('clickImportSmallCanvas')
}

const clickLoadSMDH = () => {
  console.log('clickLoadSMDH')
}

const MetaSection = () => {

  const [currentLanguage, setCurrentLanguage] = useState<number | null>(null);
  const [iconFile, setIconFile] = useState<File | undefined>();

  const smdh = new SMDH();

  const bigIconRef = useRef<HTMLCanvasElement>(null);
  const smallIconRef = useRef<HTMLCanvasElement>(null);

  const clickSaveSMDH = () => {
    console.log('clickSaveSMDH');
    smdh.save();
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
        <input id="file-load" type="file" onChange={event => {
          setIconFile(event?.target?.files?.[0]);
        }} />
      </form>
      <div className="row">
        <label htmlFor="big-icon" className="label">Icons:</label>
        <canvas id="big-icon" ref={bigIconRef} width={48} height={48} className="button" onClick={clickImportBigCanvas}></canvas>
        <canvas id="small-icon" ref={smallIconRef} width={24} height={24} className="button" onClick={clickImportSmallCanvas}></canvas><br/>
        <input type="checkbox" defaultChecked id="both-icons" />
        <label htmlFor="both-icons"> Update both when importing</label>
      </div>

      <div id="langs">
        <div style={{ display: currentLanguage === null ? 'block' : 'none' }}>
          <div className="row" id="row-short-description">
            <label htmlFor="short-description" className="label">Short description:</label>
            <input id="short-description" type="text" maxLength={64} className="input" defaultValue="Hidori" />
          </div>

          <div className="row" id="row-long-description">
            <label htmlFor="long-description" className="label">Long description:</label>
            <input id="long-description" type="text" maxLength={128} className="input" defaultValue="Butt" />
          </div>

          <div className="row" id="row-publisher">
            <label htmlFor="publisher" className="label">Publisher:</label>
            <input id="publisher" type="text" maxLength={64} className="input" defaultValue="splash-ds" />
          </div>
        </div>

        {VALID_LANGUAGES.map(language => {
          return (
            <div key={language} style={{ display: language === currentLanguage ? 'block' : 'none' }}>
              <div className="row" id={`row-short-description${language}`}>
                <label htmlFor={`short-description${language}`} className="label">Short description:</label>
                <input id={`short-description${language}`} type="text" maxLength={64} className="input"/>
              </div>

              <div className="row" id={`row-long-description${language}`}>
                <label htmlFor={`long-description${language}`} className="label">Long description:</label>
                <input id={`long-description${language}`} type="text" maxLength={128} className="input"/>
              </div>

              <div className="row" id={`row-publisher${language}`}>
                <label htmlFor={`publisher${language}`} className="label">Publisher:</label>
                <input id={`publisher${language}`} type="text" maxLength={64} className="input"/>
              </div>
            </div>
          )
        })}
      </div>

      <div className="row" id="lang-selector">
        <span className="label">Language:</span>
        <label style={{ backgroundColor: '#eef', borderRadius: '3px', padding: '2px 4px' }}>
          <input type="radio" name="lang" onChange={() => setCurrentLanguage(null)} checked={currentLanguage === null} />
          All
        </label>
        {VALID_LANGUAGES.map(language => {
          return (
            <label key={language}>
              <input type="radio" name="lang" onChange={() => setCurrentLanguage(language)} checked={language === currentLanguage} />
              <span className={`flag flag${language}`} />
            </label>
          )
        })}
      </div>

      <div className="row" id="lang-info" style={{ fontSize: '70%' }}>
        Leaving these fields empty will copy default values over when saving
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <input type="button" className="button" value="Load SMDH" onClick={clickLoadSMDH} />
        <input type="button" className="button blue-button" value="Save SMDH" onClick={clickSaveSMDH} />
      </div>
    </div>
  )
}

export { MetaSection }
