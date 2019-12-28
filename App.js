
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput
} from 'react-native';

//packages for crashes from appcenter crashes
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';

import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inflationRate: 0.0,
      riskFreeRate: 0.0,
      amount: 0.0,
      timeInYears: 1,
      afterInflation: 0.0,
      atRiskFree: 0.0,
      atRiskFreeAfterInflation: 0.0,
      difference: 0
    }

    this.checkPreviousSession();
  }

  calculateInflationImpact(value, inflationRate, time) {
    return value / Math.pow(1 + inflationRate, time);
  }

  calculate() {
    afterInflation = this.calculateInflationImpact(this.state.amount, this.state.inflationRate / 100, this.state.timeInYears);
    atRiskFree = this.state.amount * Math.pow(1 + this.state.riskFreeRate / 100, this.state.timeInYears);
    atRiskFreeAfterInflation = this.calculateInflationImpact(atRiskFree, this.state.inflationRate / 100, this.state.timeInYears);
    difference = atRiskFreeAfterInflation - afterInflation;

    this.setState({
      afterInflation,
      atRiskFree,
      atRiskFreeAfterInflation,
      difference
    });
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
      <View style={styles.container}>
        <View><Text style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 40, fontSize: 40 }}>Inflation Calculator</Text></View>
        {/* <Button title="Calculate Inflation"
          //with trackEvent -> you will know how your user interact with your app, location, do they reach this button that leads to the new feature you just implemented,  are they signing up, even the session of how long the user is in the app, logging in , anything you want to track can be track by just calling this method.
          onPress={() => Analytics.trackEvent('calculate_inflation', { Internet: 'Cellular', GPS: 'On' })} /> */}
        {/* onPress={() => Crashes.generateTestCrash()} /> */}
        {/* //onPress={() => { throw new Error("some text") }} /> */}

        {/* //feature 1 */}
        <TextInput placeholder="Current inflation rate"
          style={styles.textBox} keyboardType='decimal-pad'
          onChangeText={(inflationRate) => this.setState({ inflationRate })} />
        <TextInput placeholder="Current risk free rate"
          style={styles.textBox} keyboardType='decimal-pad'
          onChangeText={(riskFreeRate) => this.setState({ riskFreeRate })} />
        <TextInput placeholder="Amount you are saving"
          style={styles.textBox} keyboardType='decimal-pad'
          onChangeText={(amount) => this.setState({ amount })} />
        <TextInput placeholder="For how long (in years) will you save it?"
          style={styles.textBox} keyboardType='decimal-pad'
          onChangeText={(timeInYears) => this.setState({ timeInYears })} />
        <Button title="Calculate inflation"
          style={{ marginTop: 35, marginBottom: 45}}
          onPress={() => {
            this.calculate();
            Analytics.trackEvent('calculate_inflation', { Internet: 'WiFi', GPS: 'Off' });
          }} />
        <Text style={styles.label}>{this.state.timeInYears} years from now you will still have ${this.state.amount}, but it will only be worth ${this.state.afterInflation}.</Text>
        <Text style={styles.label}>But if you invest it at a risk free rate you will have ${this.state.atRiskFree}.</Text>
        <Text style={styles.label}>Which will be worth ${this.state.atRiskFreeAfterInflation} after inflation.</Text>
        <Text style={styles.label}>A difference of: ${this.state.difference}.</Text>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginHorizontal: 16
  },
  label: {
    marginTop: 10,
    fontSize: 18
  },
  textBox: {
    height: 40,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  },
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
