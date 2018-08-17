class ProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      total: data.length,
      completed: 1,
    };
  }

  componentDidMount () {
    this.canvas = document.getElementById('progressCanvas'); 
    this.setCanvasSize(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.drawCanvas();
  }

  render() {
    return (
      <canvas id="progressCanvas" className="progress" />
    );
  }

  getCanvasCenter(canvas) {
    const c = canvas.getBoundingClientRect();
    return {
      centerX: c.width / 2,
      centerY: c.height / 2,
    }
  }

  setCanvasSize(canvas){
    const c = canvas.getBoundingClientRect();
    canvas.height = c.height;
    canvas.width = c.width;
  }

  drawCanvas() {
    const Angle = Math.PI*2;
    const text = "100%";
    const centerCanvas = this.getCanvasCenter(this.canvas);
    this.ctx.lineWidth = 7;
    this.ctx.beginPath();  
    this.ctx.arc(centerCanvas.centerX, centerCanvas.centerY, 45, 0, Math.PI*2, false);  
    //this.ctx.closePath();
    this.ctx.strokeStyle = '#4ca89a';  
    this.ctx.stroke();

    this.ctx.beginPath();  
    this.ctx.arc(centerCanvas.centerX, centerCanvas.centerY, 38, 0, Angle, false);  
    //this.ctx.closePath();
    this.ctx.strokeStyle = '#96d6f4';  
    this.ctx.stroke();

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font="bold 18px sans-serif";
    this.ctx.fillText(text, centerCanvas.centerX, centerCanvas.centerY)


    //this.ctx.fill();
  }
  
}

