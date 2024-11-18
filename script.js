export class ColorWheel
{
  constructor( containerId = 'color-wheel', rotationSpeed = 0.5 )
  {
    this.containerId = containerId;
    this.rotationSpeed = rotationSpeed;
    this.isSpinning = true;
    this.rotationAngle = 0;
    this.spinInterval = null;

    this.init()
  }

  init()
  {
    this.createSvg();
    this.createInfoBox();
    this.attachEventListeners();
    this.startSpinning();
  }

  // Create SVG wheel
  createSvg()
  {
    this.container = document.getElementById( this.containerId );
    this.container.innerHTML =
    `
    <svg id="color-wheel-svg" width="500" height="500" viewBox="0 0 500 500">
      <g id="color-wheel-svg-inner" transform="rotate(0, 250, 250)">
        <path data-info="Green shade 1" d="M250,250 L250,90 A160,160 0 0 1 330,111.4 Z" fill="#b3cfa7" />
        <path data-info="Green shade 2" d="M250,250 L330,111.4 A160,160 0 0 1 388.6,170 Z" fill="#6faa68" />
        <path data-info="Green shade 3" d="M250,250 L388.6,170 A160,160 0 0 1 410,250 Z" fill="#35802b" />
        <path data-info="Brown shade 1" d="M250,250 L388.6,330 A160,160 0 0 0 410,250 Z" fill="#debeb3" />
        <path data-info="Brown shade 2" d="M250,250 L330,388.6 A160,160 0 0 0 388.6,330 Z" fill="#c58b73" />
        <path data-info="Brown shade 3" d="M250,250 L250,410 A160,160 0 0 0 330,388.6 Z" fill="#aa5833" />
        <path data-info="Violet shade 1" d="M250,250 L170,388.6 A160,160 0 0 0 250,410 Z" fill="#cfb8e4" />
        <path data-info="Violet shade 2" d="M250,250 L111.4,330 A160,160 0 0 0 170,388.6 Z" fill="#a781ce" />
        <path data-info="Violet shade 3" d="M250,250 L90,250 A160,160 0 0 0 111.4,330 Z" fill="#7e48b8" />
        <path data-info="Orange shade 1" d="M250,250 L90,250 A 160,160 0 0 1 111.4,170 Z" fill="#ffcfab" />
        <path data-info="Orange shade 2" d="M250,250 L111.4,170 A 160,160 0 0 1 170,111.4 Z" fill="#fea969" />
        <path data-info="Orange shade 3" d="M250,250 L170,111.4 A 160,160 0 0 1 250,90 Z" fill="#fc8423" />
        <path data-info="Green" d="M250,250 L250,190 A60,60 0 0 1 310,250 Z" fill="#116c05" />
        <path data-info="Brown" d="M250,250 L310,250 A60,60 0 0 1 250,310 Z" fill="#923514" />
        <path data-info="Violet" d="M250,250 L250,310 A60,60 0 0 1 190,250 Z" fill="#6523a1" />
        <path data-info="Orange" d="M250,250 L190,250 A60,60 0 0 1 250,190 Z" fill="#ff6d00" />
        <circle cx="250" cy="250" r="15" fill="#000000" />
      </g>
    </svg>
    `;
    this.wheel = this.container.querySelector( '#color-wheel-svg-inner' );
  }

  // Crate info box
  createInfoBox()
  {
    // Setup info box of wheel part
    this.infoBox = document.createElement( 'div' );
    this.infoBox.id = 'color-wheel-info-box';
    this.infoBox.style.display = 'none';

    // Create div for data-info
    this.infoContent = document.createElement( 'div' );
    this.infoContent.id = 'color-wheel-info-box-content';
    // Create 'Close' button
    const button = document.createElement( 'button' );
    // Bind resume func on click
    button.onclick = () => this.resumeSpinning();
    // Set 'Close' text to button
    button.innerText = 'Close';

    // Add info content and button to info-box
    this.infoBox.appendChild( this.infoContent );
    this.infoBox.appendChild( button );
    // Add info-box to color-wheel div
    this.container.appendChild( this.infoBox );
  }

  // Makes the SVG wheel to spinning
  startSpinning() {
    this.spinInterval = setInterval
    (
      () =>
      {
        if ( this.isSpinning )
        {
          this.rotationAngle = ( this.rotationAngle + this.rotationSpeed ) % 360;
          // Change transform for spinning
          this.wheel.setAttribute( 'transform', `rotate(${this.rotationAngle}, 250, 250)` );
        }
      },
      20
    );
  }

  // Attach all parts of wheel event listener on click
  attachEventListeners() {
    const segments = this.wheel.querySelectorAll( 'path' );
    segments.forEach
    (
      segment =>
      {
        segment.addEventListener( 'click', this.showInfo.bind( this ) );
      }
    );
  }

  // Show data-info of SVG wheel parts
  showInfo( event )
  {
    // Get data-info attribute from chosen wheel part
    const info = event.target.getAttribute( 'data-info' );
    if ( info )
    {
      // Stop spinning
      this.isSpinning = false;
      clearInterval( this.spinInterval );

      // Change text and make visible
      this.infoContent.textContent = `Selected: ${info}`;
      this.infoBox.style.display = 'block';
    }
  }

  // Hide info box and resume spinning
  resumeSpinning()
  {
    this.infoBox.style.display = 'none';
    this.isSpinning = true;
    this.startSpinning();
  }
}
