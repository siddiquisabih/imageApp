
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AndroidOpenSettings from 'react-native-android-open-settings'

class App extends Component {

  constructor() {
    super()
    this.state = {

      imagePath: "",
      isImage: false,
      degree: '360deg',
      count: 0
    }
  }


  rotateImage() {
    if (!this.state.isImage) {
      return alert("Browse image first")
    }
    else {
      if (this.state.count == 0) {
        return this.setState({ degree: '90deg', count: 1 })
      }
      if (this.state.count == 1) {
        return this.setState({ degree: '180deg', count: 2 })
      }
      if (this.state.count == 2) {
        return this.setState({ degree: '270deg', count: 3 })
      }
      if (this.state.count == 3) {
        return this.setState({ degree: '360deg', count: 0 })
      }
    }
  }




  image() {
    ImagePicker.openPicker({
      multiple: false,
    }).then(images => {
      console.log(images);
      this.setState({ imagePath: images.path, isImage: true })
    })
      .catch((err) => {
        console.log(err)
      })
  }


  cropImage() {
    if (!this.state.isImage) {
      return alert("Browse image first")
    }
    else {
      ImagePicker.openCropper({
        path: this.state.imagePath,
        width: 300,
        height: 400,
      })
        .then(image => {
          this.setState({ imagePath: image.path, isImage: true })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }


  openBluetooth() {
    AndroidOpenSettings.bluetoothSettings()

  }

  printImage() {
    setTimeout(() => {
      alert("Printer not found")
    }, 1000)
  }
  render() {






    return (
      <View>
        <View style={[{ marginTop: '10%', flexDirection: 'row', height: '50%' }]}>

          <View style={{ borderColor: 'green', borderWidth: 2, height: '80%', width: '40%', marginRight: '5%', marginLeft: '10%', borderRadius: 33, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Image source={{ uri: `${this.state.imagePath}` }} style={{ height: '80%', width: '100%', resizeMode: 'cover', flex: 2, transform: [{ rotate: this.state.degree }] }} />
            <Text style={{ borderTopColor: 'green', borderTopWidth: 2, marginTop: 10 }}>Image</Text>
            {/* <Image source={{ src: require('./asdf.jpg') }} style={{ height: '30%', width: '30%', resizeMode:'cover' }} /> */}
          </View>

          <View style={{ borderColor: 'green', borderWidth: 2, height: '80%', width: '40%', borderRadius: 33, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ borderTopColor: 'green', borderTopWidth: 2 }}>Bluetooth</Text>
          </View>




        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 }}>
          <Button onPress={this.image.bind(this)} title="Browse Image" style={{ height: '20%' }} color="green" />
          <Button onPress={this.rotateImage.bind(this)} title="Rotate Image" style={{ height: '20%' }} color="green" />
          <Button onPress={this.cropImage.bind(this)} title="Crop Image" style={{ height: '20%' }} color="green" />

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 20 }}>
          <Button onPress={this.openBluetooth.bind(this)} title="Open Blutooth" style={{ height: '20%' }} color="green" />
          <Button onPress={this.printImage.bind(this)} title="Print Image" style={{ height: '20%' }} color="green" />

        </View>

      </View>

    )

  }

}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
