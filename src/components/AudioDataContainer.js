import React from 'react';
import VisualDemo from './VisualDemo';
import soundFile from '../audio/GummyBearz.mp3'

class AudioDataContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.frequencyBandArray = [...Array(25).keys()]
  }

  initializeAudioAnalyser = () => {
    const audioFile = new Audio();
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audioFile);
    const analyser = audioContext.createAnalyser();
    audioFile.src = soundFile;
    analyser.fftSize = 64
    source.connect(audioContext.destination);
    source.connect(analyser);
    audioFile.play()
      this.setState({
        audioData: analyser
      })
  }

  getFrequencyData = (num, callback) => {
    const bufferLength = this.state.audioData.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.state.audioData.getByteFrequencyData(dataArray)
    callback(dataArray)
  }

  render(){

    return (
      <div>
        <VisualDemo
          initializeAudioAnalyser={this.initializeAudioAnalyser}
          frequencyBandArray={this.frequencyBandArray}
          getFrequencyData={this.getFrequencyData}
          audioData={this.state.audioData}
        />
      </div>
    );
  }
}

export default AudioDataContainer;
