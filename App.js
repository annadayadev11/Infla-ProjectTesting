
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

//packages for crashes from appcenter crashes
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';

export default class App extends Component {
  constructor() {
    super();

    this.checkPreviousSession();
  }


  async checkPreviousSession() {
    //appcenter is using this method -> hasCrashedInLastSession
    const didCrash = await Crashes.hasCrashedInLastSession();
    if (didCrash) {
      //this is also from appcenter method -> will be uploaded to appcenter
      const report = await Crashes.hasCrashedInLastSession();
      alert("Sorry about that crash, we're working on a solution");
    }
  }

  render() {
    return (
      <View style={{ marginTop: 50 }}>
        <Button title="Calculate Inflation"
          //with trackEvent -> you will know how your user interact with your app, location, do they reach this button that leads to the new feature you just implemented,  are they signing up, even the session of how long the user is in the app, logging in , anything you want to track can be track by just calling this method.
          onPress={() => Analytics.trackEvent('calculate_inflation', { Internet: 'Cellular', GPS: 'On' })} />
        {/* onPress={() => Crashes.generateTestCrash()} /> */}
        {/* //onPress={() => { throw new Error("some text") }} /> */}

      </View>
    )
  }
}
