import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Home.css';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            header: 'Neha',
            person: null ,
            loading: true,
            album: [],
            sound: ""
        };
        
        this.myRef = React.createRef();

      };

      
      componentDidMount() {
        this.result(this.state.header)
      }

      changedValue = (e) => {
        e.preventDefault();
        let newHeader = this.textInput.value;
        console.log('submitted');
        this.setState({header : newHeader});
        this.result(newHeader);

      }

      async result(a){
        const url = `https://itunes.apple.com/search?term=${a}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({person: data, loading: false});
        console.log({person: data});
        this.setState({album: data.results});      
      }
      music = (a) => {
        console.log(a);
        this.setState({sound: a})
      }

      render() {
        const results = this.state.album.map(result => 
          <div style={{width:100, height:100, margin:10, cursor: "pointer" , borderRadius: 50, backgroundImage: `url(${result.artworkUrl100})` }} onClick={this.music.bind(this, result.previewUrl)} ></div>
       
          );
        return (
          <div>
                <form onSubmit={this.changedValue} className="change-header-form">
                    <input id="field" ref={(input) => { this.textInput = input; }} type="text" placeholder="Enter Text Here"  onKeyUp={this.changedValue} />
                </form>
                <div>
                  {this.state.loading || !this.state.person ? (
                    <div>
                      <div ref={this.myRef} style={{ width: "75%" , margin: "50px auto 0", display: "flex" ,flexWrap: "wrap"  }}>
                        {results}
                      </div>
                    </div>   
                  ):(
                    <div>
                      <div ref={this.myRef} style={{ width: "75%" , margin: "50px auto 0", display: "flex" ,flexWrap: "wrap"  }}>
                      {results}
                      </div>
                    </div>    
                  )}
                </div>
                <div className="audio-style">
                    <AudioPlayer
                        
                        autoPlay
                        src = {this.state.sound}
                        onPlay={e => console.log("onPlay")}
                        // other props here
                    />
                </div>
        </div> )
      }
}

export default Home;
// 9873194946