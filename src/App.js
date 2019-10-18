import React from 'react';

import './App.css';
import greyWhale from './images/grey_whale.jpg';
import humpbackWhaleBreaching from './images/humpback_whale_breaching.jpg';
import humpbackWhaleFluking from './images/humpback_whale_fluking.jpg';
import brydesWhale from './images/brydes_whale.jpg';
import spermWhaleFluking from './images/sperm_whale_fluking.jpg';
import {ReactComponent as Arrow} from './images/arrow.svg';
import { StyleSheet, css } from 'aphrodite';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images:[
        [greyWhale, 'Grey Whale', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'], 
        [humpbackWhaleBreaching, 'Humpback Whale Breaching', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'],[humpbackWhaleFluking, 'Humpback Whale Fluking', 'Nibh nisl condimentum id venenatis a condimentum. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus.'], 
        [brydesWhale, 'Bryde\'s Whale', 'In vitae turpis massa sed elementum tempus egestas. Nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Eget arcu dictum varius duis at consectetur.'], 
        [spermWhaleFluking, 'Sperm Whale Fluking', 'Scelerisque viverra mauris in aliquam sem. Neque volutpat ac tincidunt vitae semper quis lectus. Sit amet volutpat consequat mauris nunc congue. Libero enim sed faucibus turpis in eu mi bibendum.']
      ], 
      imageCalled:[0]
      };
    this.viewImage = this.viewImage.bind(this);
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
  }

  viewImage(img) {
    let imgIndex;
    this.state.images.forEach((element, index) => {
      if(element[0] === img) {
        return imgIndex = index;
      }
    })
    this.setState({imageCalled: [imgIndex]});
  }

  goLeft(imgIndex) {
    if (this.state.imageCalled[0] !== 0) {
      this.setState({imageCalled: [imgIndex[0]-1]});
    }
  }

  goRight(imgIndex) {
    if (this.state.imageCalled[0] !== (this.state.images.length-1)) {
      this.setState({imageCalled: [imgIndex[0]+1]});
    }
  }

  render() {
    const styles = StyleSheet.create({
      gallery: {
        height: '100%',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    });
    return (
      <div className={css(styles.gallery)}>
        <ImageViewr
          images = {this.state.images}
          imageCalled = {this.state.imageCalled}
          goLeft = {this.goLeft}
          goRight = {this.goRight}
        />
        <nav>
          <Thumbnails 
            images = {this.state.images}
            viewImage = {this.viewImage}
          />
        </nav>
      </div>
    );

  }
}

function ImageViewr(props) {
  // console.log(props.imageCalled[0])
  const styles = StyleSheet.create({
    imageViewContainerStyle: {
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '2px 4px 8px #2d2d2d'
    },
    imageContainerStyle: {
      height: '100%',
      width: '124.44vh',
      position: 'relative'
    },
    imageViewStyle: {
      height: '100%',
      width: '100%'
    },
    imageDescriptionStyle: {
      position: 'absolute',
      bottom: '0px',
      color: '#ffffff',
      backgroundColor: 'rgba(66,62,60,0.7)'
    },
    imageDescriptionTitleStyle: {
      padding: '0 2rem 0 2rem'
    },
    imageDescriptionContentStyle: {
      padding: '0 2rem 0 2rem'
    },

    arrowContainer: {
      height: '100%',
      width: '4rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(#ffffff, #B5B5B5)'
    },

    arrowLeftDefaultStyle: {
      cursor: 'pointer'
    },
    arrowLeftDisableStyle: {
      opacity: '0.2'
    },

    arrowRightDefaultStyle: {
      transform: 'rotate(180deg)',
      cursor: 'pointer'
    },
    arrowRightDisableStyle: {
      transform: 'rotate(180deg)',
      opacity: '0.2'
    }
  });

  const arrowLeftStyle = css(
    (props.imageCalled[0] !== 0) ? styles.arrowLeftDefaultStyle : styles.arrowLeftDisableStyle
  )
  const arrowRightStyle = css(
    (props.imageCalled[0] !== props.images.length-1) ? styles.arrowRightDefaultStyle : styles.arrowRightDisableStyle
  )
  return (
    <div className={css(styles.imageViewContainerStyle)}>
      <div className={css(styles.arrowContainer)}>
        <Arrow 
          className={arrowLeftStyle} 
          onClick={() => {props.goLeft(props.imageCalled)}}
        />
      </div>
      <div className={css(styles.imageContainerStyle)} id="imageContainer">
        <img 
          className={css(styles.imageViewStyle)} 
          src={props.images[props.imageCalled][0]} 
          alt=""
        />
        <div className={css(styles.imageDescriptionStyle)} id="imageDescription">
          <h3 className={css(styles.imageDescriptionTitleStyle)}>{props.images[props.imageCalled][1]}</h3>
          <p className={css(styles.imageDescriptionContentStyle)}>{props.images[props.imageCalled][2]}</p>
        </div>
      </div>
      <div className={css(styles.arrowContainer)}>
        <Arrow 
          className={arrowRightStyle} 
          onClick={() => {props.goRight(props.imageCalled)}}
        />
      </div>
    </div>
  )
}

function Thumbnails(props) {
  const styles = StyleSheet.create({
    thumbnailStyle: {
      width: '4rem',
      height: '4rem',
      margin: '2rem 1rem 0 1rem',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: '0.5s',
      transitionTimingFunction: 'ease-in-out',
      ':hover': {
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        borderRadius: '0%'
      }
    }
  })

  return (
    <>
      {props.images.map((element, index) => {
        return <img src={element[0]} key={index} className={css(styles.thumbnailStyle)} onClick={() => props.viewImage(element[0])} alt=""/>
      })}
    </>
  )
}

export default App;
