# splash-ds

<br/>

## A boot splash creator for Nintendo 3DS systems

<br/>

### Prerequisites

You will need a Nintendo 3DS with Luma CFW installed.
### Installation

None! It runs in your browser. Click -> [here](http://hpcodecraft.github.io/splash-ds/) <- to get started. (Chrome recommended)

### Features

- Instant preview of your splash screen
- Freely scale and rotate your image
- Customizable background color (for PNGs files with transparent backgrounds)

### How to use

Open the website and drag & drop an image from your computer onto the 3DS on the website. You can now scale and rotate your image using the little boxes around the image.

To use another image, just drag & drop again or hit the reset button to start completely fresh.

Options:
- Want to stretch your image? Uncheck the "keep image ratio" option.
- Resize helpers hiding behind the 3DS? Increase the "3DS transparency" slider to find them again.
- Using a PNG image with a transparent background? Change the background color on top of the page.

When you're done, hit the "download splash screen" button. You'll get a zip file including three files:
- splash.bin
- splashbottom.bin
- preview.png

To use the splash screen, copy *splash.bin* and *splashbottom.bin* to the `/luma` folder on your SD card. Power off your 3DS. Power it on again holding `SELECT` to enter Luma settings. Set `Splash` to `Before`, choose your `Splash duration` and you're good to go.

### Planned features

- [Anemone](https://github.com/astronautlevel2/Anemone3DS/) compatibility

  I'm working on this and am halfway there. Still missing is the icon and the info.smdh file used to display splash infos.
  Already working:
    - Zip files appear in the splash list
    - Installation works
    - Preview works (press `Y`)

  To use a splash screen with Anemone, rename the `splash.zip` to something more accurate and copy it to the `/Splashes` folder on your SD card.
- Editor for START/SELECT info text.

  Adding markers for START/SELECT options to the splash screen to show how to get to Luma settings and Godmode9.
- *Maybe* compatibility with DS and DSi systems (I don't own these and don't know if custom splashes even exist, but open an issue if interested)
- *Maybe* compatibility with older/other CFWs (open an issue if interested, I only have Luma and I don't know if anyone still uses something else)
### Questions?

If you want to report bugs or request features please open an issue in this repository.
