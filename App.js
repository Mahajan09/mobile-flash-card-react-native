import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import reducer from './reducers/index'
import Constants from 'expo-constants'
import { setLocalNotification } from './utils/helper'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
)

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DeckList />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dde'
  }
})