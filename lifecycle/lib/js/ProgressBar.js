class ProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      total: props.total,
      completed: props.completed,
    };
  }

  getCanvasCenter(canvas) {
    const c = canvas.getBoundingClientRect();
    return {
      centerX: c.width / 2,
      centerY: c.height / 2,
    }
  }

  setCanvasSize(canvas) {
    const c = canvas.getBoundingClientRect();
    canvas.height = c.height;
    canvas.width = c.width;
  }

  drawCanvas(total, completed) {
    const Angle = Math.PI*(completed / total)*2;
    const text = ((completed / total) * 100).toFixed(0) + "%";
    const centerCanvas = this.getCanvasCenter(this.canvas);
    this.ctx.lineWidth = 7;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();  
    this.ctx.arc(centerCanvas.centerX, centerCanvas.centerY, 45, 0, Math.PI*2, false);  
    this.ctx.strokeStyle = '#4ca89a';  
    this.ctx.stroke();
    this.ctx.beginPath();  
    this.ctx.arc(centerCanvas.centerX, centerCanvas.centerY, 38, 0, Angle, false);  
    this.ctx.strokeStyle = '#96d6f4';  
    this.ctx.stroke();
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font="bold 18px sans-serif";
    this.ctx.fillText(text, centerCanvas.centerX, centerCanvas.centerY)
  }
  
  handleResize() {
    this.setCanvasSize(this.canvas);
    this.drawCanvas(this.state.total, this.state.completed);
  }

  componentDidMount () {
    this.canvas = document.getElementById('progressCanvas'); 
    this.setCanvasSize(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.drawCanvas(this.state.total, this.state.completed);
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener("resize", 
      this.handleResize
    );
  }

  componentWillReceiveProps({total, completed}) {
    this.setState({
      total,
      completed
    })
  }

  componentDidUpdate() {
    this.drawCanvas(this.state.total, this.state.completed)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <canvas id="progressCanvas" className="progress" />
    );
  }

}

